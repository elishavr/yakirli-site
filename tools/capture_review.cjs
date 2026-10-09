const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
(async()=>{
const site=process.env.REVIEW_URL||'http://127.0.0.1:8787';
const root=process.env.REVIEW_DIST||process.cwd()+'/dist';
const server=require('http').createServer((req,res)=>{const u=new URL(req.url,site);const p=path.join(root,decodeURIComponent(u.pathname),u.pathname.endsWith('/')?'index.html':'');try{res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.avif':'image/avif'})[path.extname(p)]||'application/octet-stream');res.end(fs.readFileSync(p));}catch{res.statusCode=404;res.end('Not found');}});
await new Promise(r=>server.listen(8787,'127.0.0.1',r));
const out=process.env.REVIEW_OUT||'/tmp/yakirli-review';
fs.mkdirSync(out,{recursive:true});
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):e.name==='index.html'?[path.join(d,e.name)]:[])}
const pages=walk(root).map(f=>'/'+path.relative(root,f).replace(/index.html$/,'').replaceAll('\\','/'));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined,args:['--no-sandbox','--disable-dev-shm-usage']});
let result=[];
for(const [label,width,height] of [['desktop',1440,1000],['mobile',360,800]]){
 const ctx=await browser.newContext({viewport:{width,height},reducedMotion:'reduce',isMobile:label==='mobile',hasTouch:label==='mobile'});
 const page=await ctx.newPage();
 for(const route of pages){
  let errors=[];const listener=e=>errors.push(e.message);page.on('pageerror',listener);
  await page.goto(site+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  // Full-page evidence must include images that normally load when scrolled into view.
  await page.evaluate(async()=>{await Promise.all([...document.images].map(async img=>{if(img.loading==='lazy')img.loading='eager';await img.decode().catch(()=>{});}));});
  const name=(route==='/'?'he-home':route==='/en/'?'en-home':route.slice(1,-1).replaceAll('/','-'));
  await page.screenshot({path:path.join(out,name+'-'+label+'.jpg'),fullPage:true,quality:78});
  const checks=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,overflowElements:[...document.querySelectorAll('main *,header *,footer *')].filter(e=>{let r=e.getBoundingClientRect();return r.width && (r.right>innerWidth+1||r.left< -1)&&!e.closest('.tbl-wrap,.subnav,.drop,.mainnav:not(.open)')}).slice(0,12).map(e=>e.tagName+'.'+e.className),h1:document.querySelectorAll('h1').length,lang:document.documentElement.lang,dir:document.documentElement.dir,unlabelled:[...document.querySelectorAll('input,select,textarea')].filter(e=>!e.labels?.length&&!e.getAttribute('aria-label')).map(e=>e.id),font:document.fonts.check('18px Assistant'),brokenImages:[...document.images].filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src)}));
  let violations=[];
  if(process.env.AXE_PATH){await page.addScriptTag({path:process.env.AXE_PATH});violations=(await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}))).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));}
  result.push({route,viewport:label,...checks,violations,errors});page.off('pageerror',listener);
 }
 await ctx.close();
}
fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({pages:pages.length,screenshots:result.length,issues:result.filter(r=>r.overflow||r.errors.length||r.violations.length||r.brokenImages.length||r.unlabelled.length)}));
await browser.close();server.close();
})();
