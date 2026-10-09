/* Run against a built site; Playwright is a development-only dependency. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const root = path.resolve('dist');
const server = require('node:http').createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  const f = path.join(root, u.pathname, u.pathname.endsWith('/') ? 'index.html' : '');
  try { res.setHeader('Content-Type', ({'.html':'text/html','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml'})[path.extname(f)] || 'application/octet-stream'); res.end(fs.readFileSync(f)); }
  catch { res.statusCode=404; res.end(); }
});
(async () => {
  await new Promise(r => server.listen(8787, '127.0.0.1', r));
  const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || undefined, args:['--no-sandbox']});
  let checked = [];
  try {
    for (const lang of ['', 'en/']) {
      for (const width of [1440, 360]) {
        const context = await browser.newContext({viewport:{width,height:800},hasTouch:width===360});
        const page = await context.newPage();
        // Navigation tests do not require external font services.
        await page.route('https://fonts.**/*', r=>r.abort());
        await page.goto('http://127.0.0.1:8787/'+lang);
        if (width===360) {
          await page.locator('.menu-btn').tap();
          assert.equal(await page.locator('.menu-btn').getAttribute('aria-expanded'),'true');
          assert.equal(await page.locator('main').evaluate(e=>e.inert),true);
          await page.locator('.sub-toggle').first().tap();
        } else {
          await page.locator('.sub-toggle').first().focus();
          await page.keyboard.press('Enter');
        }
        assert.equal(await page.locator('.sub-toggle').first().getAttribute('aria-expanded'),'true');
        assert.equal(await page.locator('.drop').first().isVisible(),true);
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(()=>document.activeElement.closest('.drop')!==null),true);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.drop').first().isVisible(),false);
        assert.equal(await page.locator('.sub-toggle').first().evaluate(e=>e===document.activeElement),true);
        if(width===360){
          await page.keyboard.press('Escape');
          assert.equal(await page.locator('.mainnav').isVisible(),false);
          assert.equal(await page.locator('main').evaluate(e=>e.inert),false);
          await page.locator('.menu-btn').tap();
          for(let i=0;i<24;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>!!document.activeElement.closest('.site-head')),true);}
          await page.setViewportSize({width:1440,height:900});
          assert.equal(await page.locator('.menu-btn').getAttribute('aria-expanded'),'false');
          assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('nav-open')),false);
        }
        await context.close();checked.push(lang+':menu:'+width);
      }
      const page = await browser.newPage({viewport:{width:360,height:800}, reducedMotion:'reduce'});
      await page.route('https://fonts.**/*',r=>r.abort());
      for (const route of ['contact/','bereaved-parents/','volunteers/','lectures/','remembrance/']) {
        await page.goto('http://127.0.0.1:8787/'+lang+route);
        const forms=page.locator('form');
        for(let i=0;i<await forms.count();i++) {
          const form=forms.nth(i);let sentRequests=0;
          const onRequest=r=>{if(r.method()==='POST')sentRequests++;};page.on('request',onRequest);
          await form.locator('[type=submit]').click();
          assert.equal(await form.locator('.sent').isVisible(),true);
          assert.equal(await form.locator('.sent').getAttribute('role'),'status');
          assert.equal(sentRequests,0);page.off('request',onRequest);
        }
        checked.push(lang+route+':preview-forms');
      }
      await page.goto('http://127.0.0.1:8787/'+lang+'mortality-data/');
      const table=page.locator('.tbl-wrap');
      assert.equal(await table.evaluate(e=>e.scrollWidth>e.clientWidth),true);
      await table.focus();
      await page.keyboard.press(lang?'ArrowRight':'ArrowLeft');
      await page.waitForFunction(()=>Math.abs(document.querySelector('.tbl-wrap').scrollLeft)>0);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
      await page.emulateMedia({media:'print'});
      assert.equal(await page.locator('.site-head').isVisible(),false);
      assert.equal(await page.locator('.hero p').evaluate(e=>getComputedStyle(e).color),'rgb(35, 43, 58)');
      checked.push(lang+':table-keyboard,reduced-motion,print');
      await page.close();
    }
    console.log(JSON.stringify({passed:checked},null,2));
  } finally { await browser.close();server.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
