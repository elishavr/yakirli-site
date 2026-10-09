# ביקורת עיצוב וקופי · 9.10.2026

משימה 3, אחרי בדיקת האתר והגרפיקות. ענף `codex/copy` עצמאי מול main בקומיט `757119f`; אינו כולל את שינויי PR #1 או PR #2. כל 18 העמודים בעברית נקראו לפני 18 העמודים באנגלית, בשלוש נקודות מבט: משפחה שמחפשת עזרה, עובדת רווחה ותורם.

## ממצאים והחלטות

- למשפחה: כותרות מתארות את הסיוע ואת דרך הפנייה, בלי לקבוע שהבדידות מתחילה או להבטיח שכל משפחה תקבל כל מענה. הוסרו מטפורות חוזרות של מסע, חיבוק, אור ותקווה.
- לעובדת רווחה: נשמרו פירוט השירותים, אוכלוסיות היעד, החקיקה והקישורים. הכותרת בעמוד ההתנדבות מבהירה מיהן המשפחות שמלוות, כדי שלא להתבלבל עם תנאי קבלה למתנדבים.
- לתורם: הטקסט מתאר מה התרומות מאפשרות. הוסרו לחץ זמן והבטחות השפעה גורפות; אפשרויות התרומה, מספר העמותה ופרטי התשלום נשמרו.
- באנגלית: הוחלפו צירופים מילוליים כמו personal accompaniment ו־in the sign of. The Day After Shiva ו־Civilian Bereavement נשמרו. שמות אישיים, עובדות, מספרים ותאריכים לא שונו.

נבדקו חזותית דף הבית של [מש״ה](https://moshe.org.il/) בדסקטופ 1440px ובמובייל 360px, לרבות ההירו, כרטיסי המספרים והמקטעים בהמשך. ההשראה: כותרת דביקה לבנה, מסר מרכזי קצר, מרחק נדיב בין מקטעים וכפתורי גלולה ברורים. באתר יקיר לי נשמר הרצף המאושר; השינוי מתמקד באורך שורה, ריווח בתוך כרטיסים וקריאות במובייל. לא הועתקו טקסטים, תמונות או צבעים ממש״ה. ההשוואה היא חזותית, לא בדיקת נגישות או ביצועים של מש״ה.

## שינויי עיצוב ב־site.css

| רכיב | לפני | אחרי | למה |
|---|---|---|---|
| כותרת ההירו | ללא הגבלת אורך שורה | עד 22ch | קיבוץ המסר לשורות קריאות גם בעמודי אנגלית |
| טקסט ההירו | עד 640px | עד 58ch | מידה התלויה בגודל הגופן |
| טקסט רציף | רוחב המכולה, ריווח שורה כללי | עד 68ch, ריווח 1.75 | קריאה נוחה בפסקאות ארוכות |
| כותרות משנה בטקסט | ללא הפרדה נוספת | 36px מעל כותרות שאינן הראשונות | הפרדה ברורה בין נושאים ללא שינוי סדר |
| כרטיסים בדסקטופ | padding של 30×28px, gap של 10px | padding של 32px, gap של 12px, ריווח שורה 1.7 | פחות צפיפות סביב הטקסט |
| כרטיס מידע בלי קישור | קפיצה וצל בריחוף כמו כרטיס פעולה | אין קפיצה או צל בריחוף | לא להציג מידע כפעולה שניתן ללחוץ עליה |
| כפתור משני בפס CTA | לבן | טורקיז בהיר עם נייבי; לבן בריחוף | חיבור לשפת פעולות האתר; קורל נשאר לתרומה |
| פתיח מקטע | רוחב כותרת המקטע | עד 58ch | שורות קצרות יותר |
| כיתוב מקום תמונה | 12.5px, ריווח 1.35, padding אנכי 5px | 13px, ריווח 1.5, padding אנכי 8px | לשמור את הנחיית הצילום קריאה בלי להבליט אותה |
| כותרת הירו במובייל | clamp של 34–58px, ריווח 1.15 | clamp של 32–42px, ריווח 1.2 | פחות שבירות מילים ושורות צפופות ב־360px |
| כרטיסים במובייל | padding של 30×28px | 26×24px וטקסט 17px | יותר שטח לטקסט בתוך כרטיס צר |
| קצב מקטעים במובייל | 56px לכל צד ו־40px מתחת לכותרת | 52px ו־28px בהתאמה | נשימה מספקת בלי רווחים ארוכים מדי בין יחידות תוכן |

לא נוספו צבעים או גופנים. ניגודיות ההירו נשענת על משתני main שנבדקו ב־axe. האיורים החדשים נמצאים ב־PR #2; כאן נשמרו האיורים הקיימים ולא נערכו תמונות.

## כל שינויי הקופי שבוצעו

79 החלפות ניסוח מתועדות להלן. החלפות חוזרות באותו עמוד נספרות כשורה אחת בטבלה.

| עמוד | לפני | אחרי | למה |
|---|---|---|---|
| he/home | לצד המשפחות מהיום השמיני והלאה – כדי שאף משפחה לא תישאר לבד | לצד המשפחות, מהיום השמיני והלאה | קיצור הכותרת; רעיון הליווי והקשר נשאר במקטעי התמיכה |
| he/home | ליווי שמתחיל כשהשבעה מסתיימת וממשיך לאורך הדרך. בכל שלב יש לנו מענה, ובמרכז תמיד נמצאת המשפחה. | הליווי מתחיל בסיום השבעה ונמשך לאורך השנים, לפי צורכי המשפחה. | תיאור רצף הליווי במקום הבטחה כללית; השלבים המפורטים נשמרו |
| he/home | איך מצטרפים למעגל? | תמיכה, התנדבות ותרומה | כותרת המתארת את אפשרויות הפעולה שבמקטע |
| he/home | אנחנו כאן כדי שאף אחד לא יישאר לבד במסע ההתמודדות עם האובדן. | כאן אפשר למצוא תמיכה למשפחה, להצטרף כמתנדבים או לתמוך בפעילות. | החלפת מטפורת המסע בהכוונה לכרטיסים הקיימים |
| he/home | הכשרה מקצועית שתאפשר לכם ללוות משפחות ולתמוך בהן בדרך מעצימה. | הכשרה מקצועית לליווי משפחות ולתמיכה בהן. | ניסוח ישיר וקצר, ללא שינוי בשירות או בעובדות |
| he/home | התרומה שלכם מאפשרת לנו להמשיך ללוות משפחות. כל תרומה היא מעגל נוסף של תקווה. | התרומה שלכם מאפשרת לנו להמשיך ללוות משפחות. | הסרת מטפורה כפולה בלי להסיר מידע |
| he/home | בואו להיות חלק מהמעגל – כי אף אחד לא צריך להתמודד לבד. | הצטרפו לפעילות של יקיר לי | הנעה ברורה במקום חזרה על סיסמת הבדידות |
| he/about | חברה ישראלית רגישה, תומכת ומכילה, שבה אף משפחה שחוותה אובדן אינה נשארת לבד. | חברה שמכירה באובדן ותומכת במשפחות, כדי שאף משפחה לא תישאר לבד. | שמירת החזון בשפה פחות מופשטת |
| he/contact | היו הראשונים להתעדכן בפעילויות, ביוזמות ובקמפיינים של יקיר לי. | לקבלת עדכונים על הפעילויות, היוזמות והקמפיינים של יקיר לי. | הסרת דחיפות שיווקית מהרשמה לעדכונים |
| he/eighth | היום השמיני הוא הרגע שבו השבעה מסתיימת והבדידות מתחילה. שם אנחנו נכנסים לתמונה. | כשהשבעה מסתיימת, מתנדבי היום השמיני מתחילים ללוות את המשפחה. | תיאור השירות הקיים במקום לקבוע איך המשפחה מרגישה |
| he/eighth | היום השמיני הוא מיזם שמלווה משפחות שחוו אובדן אזרחי בדרך מכילה ומקצועית: ליווי אישי וקבוצתי, סיוע במיצוי זכויות, תמיכה רגשית לאורך זמן, ולפי הצורך – חיבור לייעוץ כלכלי ומשפטי. | מיזם היום השמיני מציע למשפחות שחוו אובדן אזרחי ליווי אישי וקבוצתי, סיוע במיצוי זכויות ותמיכה רגשית לאורך זמן. לפי הצורך, הוא מחבר גם לייעוץ כלכלי ומשפטי. | פיצול משפט ארוך; כל סוגי הסיוע נשמרו |
| he/eighth | להיות לצד המשפחה ברגעים שבהם כולם כבר חזרו לשגרה. | להיות לצד המשפחה גם אחרי שהסביבה חוזרת לשגרה. | ניסוח ישיר וקצר, ללא שינוי בשירות או בעובדות |
| he/eighth | שיחה, קפה, יציאה משותפת – מה שעוזר. | שיחה, קפה או יציאה משותפת, לפי מה שמתאים למשפחה. | ניסוח ישיר וקצר, ללא שינוי בשירות או בעובדות |
| he/grandparents | אנחנו כאן כדי שאף אחד לא יהיה לבד – במיוחד לא אלה ששמרו על המשפחה לאורך השנים. | גם מי שתמכו במשפחה לאורך השנים זקוקים לתמיכה. | שמירת ההכרה בצורכי הסבים, בלי הבטחה גורפת |
| he/grandparents | מסגרת ייחודית שבה אפשר לשתף בחופשיות. | מסגרת שבה אפשר לשתף בחופשיות. | הסרת תואר שאינו מוסיף מידע |
| he/grandparents | הם מתמודדים עם כאבם שלהם ונושאים גם את תמיכת המשפחה כולה. | הם מתמודדים עם האובדן שלהם ובו בזמן תומכים במשפחה. | תיקון צירוף מסורבל |
| he/parents | אנחנו כאן בשבילכם | ליווי ותמיכה למשפחה | כותרת קונקרטית במקום משפט החוזר בעמודים רבים |
| he/parents | אנחנו פועלים להעניק ליווי אישי וסיוע במישורים שונים – רגשי, משפטי ובירוקרטי. | אנחנו מציעים ליווי אישי וסיוע רגשי, משפטי ובירוקרטי. | ניסוח ישיר וקצר, ללא שינוי בשירות או בעובדות |
| he/parents | הפנייה אלינו אינה מחייבת דבר. אפשר לפנות בכל שלב – בשבועות הראשונים, אחרי שנה או אחרי שנים. | אפשר לפנות בלי התחייבות, בשבועות הראשונים, אחרי שנה או אחרי שנים. | ניסוח ישיר וקצר, ללא שינוי בשירות או בעובדות |
| he/volunteers | למי מיועד המיזם? | את מי מלווים | מבחינה בין קהל השירות לבין מי שרוצה להתנדב |
| he/volunteers | יצירת רשת תמיכה וקשרים משמעותיים בקהילה. | בניית קשרים ורשת תמיכה בקהילה. | ניסוח ישיר וקצר, ללא שינוי בשירות או בעובדות |
| he/public | השינוי שאנחנו מבקשים לא קורה רק בבית המשפחה. הוא קורה גם בחקיקה, במדיניות ובשיח הציבורי. | לצד התמיכה במשפחות, אנחנו פועלים לשינוי בחקיקה, במדיניות ובשיח הציבורי. | ניסוח ישיר וקצר, ללא שינוי בשירות או בעובדות |
| he/public | פעילויות, יוזמות וצעדים אחרונים בזירה הציבורית. | עדכונים על פעילות העמותה בזירה הציבורית. | ניסוח ישיר וקצר, ללא שינוי בשירות או בעובדות |
| he/media | לראיונות, לנתונים ולפרטים נוספים – צרו קשר. | לראיונות, לנתונים ולפרטים נוספים אפשר לפנות אלינו. | ניסוח ישיר וקצר, ללא שינוי בשירות או בעובדות |
| he/memorial | הפכו את הזיכרון למורשת חיה | להקמת אתר זיכרון אישי | הנעה קונקרטית במקום דרישה רגשית |
| he/memorial | הצטרפו היום – ללא עלות. | הקמת האתר ללא עלות. | הסרת לחץ זמן; התנאי נשמר |
| he/memorial | מוזמנים להדליק נר וירטואלי. השמות והאורות מצטרפים יחד לקיר זיכרון משותף – נושאים את הזיכרון, מוקירים את החיים. | מוזמנים להדליק נר וירטואלי לזכר יקיריכם. השמות והנרות מופיעים יחד בקיר הזיכרון המשותף. | תיאור הפעולה במקום סיום מליצי |
| he/donate | כל תרומה – גדולה כקטנה – היא אור קטן בתוך החשכה, וחיבוק שמראה למשפחות שהן לא לבד במסע הכואב הזה. | כל תרומה עוזרת לנו להמשיך ללוות משפחות שחוו אובדן. | אותה מטרת תרומה, ללא אור/חשכה/חיבוק/מסע |
| he/donate | יקיר לי מלווה משפחות שחוו שכול אזרחי ומעניקה להן תמיכה רגשית, ייעוץ, פעילויות קהילתיות ומסגרות זיכרון מכבדות. מי שתורם ליקיר לי משפיע ישירות על חייהן של משפחות שמתמודדות עם אובדן קשה מנשוא. | יקיר לי מלווה משפחות שחוו שכול אזרחי בתמיכה רגשית, בייעוץ, בפעילויות קהילתיות ובהנצחה. התרומות מאפשרות את הפעילות הזאת. | כל תחומי הפעילות נשמרו, ללא הבטחת השפעה גורפת |
| he/donate | אין סכום קטן מדי. תרומה חד־פעמית או הוראת קבע חודשית מצטברות לכוח שמאפשר לנו להרחיב את הפעילות, להקים מיזמים חדשים ולהיות זמינים לעוד משפחות. | תרומות חד־פעמיות והוראות קבע חודשיות מאפשרות לנו להרחיב את הפעילות, להקים מיזמים חדשים וללוות עוד משפחות. | ניסוח ישיר וקצר, ללא שינוי בשירות או בעובדות |
| he/donate | הבחירה לתרום היא גם מסר: אנחנו, כחברה, לא שוכחים את המשפחות. אנחנו רואים אותן, מחבקים אותן ורוצים לעזור להן להמשיך קדימה. | התרומה מבטאת גם את האחריות שלנו כחברה לזכור את המשפחות ולתמוך בהן. | שמירת מסר האחריות החברתית בלי חיבוק ובלי להכתיב התקדמות |
| he/donate | רק יחד נוכל להבטיח שכל משפחה תדע שיש לה גב. | התרומה שלכם עוזרת לנו להיות לצד המשפחות. | הנעה צנועה ללא הבטחת כיסוי של כל משפחה |
| he/week | שבוע המודעות תשפ"ו מאחורינו, אך הזיכרון, ההקשבה והאחריות האנושית אינם מסתיימים. | שבוע המודעות תשפ"ו הסתיים. הקשר עם המשפחות והעיסוק בזיכרון נמשכים. | שמירת רצף הפעילות, ללא שלשה מופשטת |
| en/home | Beside families from the day the shiva ends – so that no family is left alone | Supporting families after shiva and beyond | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/home | Support that begins when the shiva ends and continues along the way. There is help at every stage, and the family is always at the center. | Support begins when shiva ends and continues over the years, guided by each family’s needs. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/home | How to join the circle | Support, volunteering and donations | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/home | We are here so that no one is left alone with their loss. | Find support for your family, volunteer with us or help fund our work. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/home | Tailored emotional support: individual therapy, support groups and personal accompaniment. | Emotional support tailored to you: individual therapy, support groups and one-to-one support. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/home | A unique program of support meetings and tailored emotional accompaniment. | Group meetings and emotional support for grandparents who lost a grandchild. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/home | Your gift lets us keep accompanying families. Every donation adds another circle of hope. | Your donation helps us continue supporting families. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/home | Become part of the circle – because no one should face loss alone. | Get involved with Yakir Li | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/about | Yakir Li was founded in 2015 in memory of Dasi Rabinowitz, who died of cancer at 19, by her father, Pini Rabinovich. | Pini Rabinovich founded Yakir Li in 2015 in memory of his daughter, Dasi Rabinowitz, who died of cancer at 19. | תיקון סדר המשפט; השמות, השנה והגיל נשמרו |
| en/about | A sensitive, supportive and inclusive Israeli society, where no family that has suffered a loss is left alone. | A society that recognizes loss and supports families, so that no family is left alone. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/contact | Be the first to hear about Yakir Li's activities, initiatives and campaigns. | Receive updates on Yakir Li's activities, initiatives and campaigns. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/eighth | When the shiva ends, the loneliness begins. That is where we step in. | When shiva ends, volunteers from The Day After Shiva begin supporting the family. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/eighth | The Day After Shiva accompanies families after a civilian loss with warmth and professionalism: personal and group support, help with rights and benefits, long-term emotional support and, when needed, referrals for financial and legal advice. | The Day After Shiva offers one-to-one and group support, help with rights and benefits, and ongoing emotional support after a civilian loss. When needed, it also connects families with financial and legal advice. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/eighth | Being there for the family when everyone else has gone back to routine. | Staying alongside the family as those around them return to everyday life. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/eighth | What accompaniment looks like | How we support families | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/eighth | A talk, a coffee, an outing – whatever helps. | A conversation, coffee or an outing, depending on what suits the family. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/eighth | Professional training in accompanying families. | Professional training in supporting families. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/grandparents | A support network for grandparents – group meetings, tools and tailored emotional accompaniment. | A support network for grandparents: group meetings, practical tools and emotional support tailored to their needs. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/grandparents | We are here so that no one is alone – especially not those who have held the family together for years. | Those who have supported their family for years need support too. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/grandparents | A unique setting where you can share freely. | A place where you can share freely. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/grandparents | They cope with their own grief while carrying the whole family's need for support. | They are grieving their own loss while also supporting their family. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/parents | We are here for you | Support for your family | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/parents | We offer personal accompaniment and help on several levels – emotional, legal and bureaucratic. | We offer one-to-one support and help with emotional, legal and administrative matters. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/parents | Reaching out commits you to nothing. You can contact us at any stage – in the first weeks, after a year, or years later. | You can contact us without committing to anything, whether in the first weeks, a year later or years after your loss. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/parents | Personal accompaniment | One-to-one support | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/volunteers | Who is the program for? | The families we support | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/volunteers | Family companions | Family support volunteers | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/volunteers | Professional experts | Professional volunteers | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/volunteers | Learning the principles of accompaniment and tools for working with families. | Learning how to support families and the tools used in this work. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/public | What we do in the public arena | Our public advocacy | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/public | The change we seek doesn't happen only in the family's home. It happens in legislation, in policy and in public conversation. | Alongside our support for families, we work for change in legislation, policy and public understanding. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/public | Recent activities, initiatives and steps in the public arena. | Updates on our public advocacy work. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/media | For interviews, data and more information – get in touch. | Contact us for interviews, data or more information. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/memorial | Turn memory into a living legacy | Create a personal memorial website | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/memorial | Join today – free of charge. | Creating a website is free of charge. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/memorial | Light a virtual candle. The names and lights join together on a shared memorial wall – carrying the memory, honoring the life. | Light a virtual candle in memory of your loved one. The names and candles appear together on the shared memorial wall. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/donate | Every gift, large or small, is a small light in the darkness and a hug that shows families they are not alone on this painful journey. | Every donation helps us continue supporting families after a loss. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/donate | By credit card on a secure JGive page. One-time or monthly standing donations. | Donate by credit card through JGive, as a one-time or monthly donation. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/donate | Yakir Li accompanies these families with emotional support, guidance, community activities and dignified ways to remember. A gift to Yakir Li directly changes the lives of families facing an unbearable loss. | Yakir Li supports families through emotional support, guidance, community activities and remembrance. Donations make this work possible. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/donate | No amount is too small. One-time and monthly gifts add up to the strength that lets us expand our work, start new programs and be there for more families. | One-time and monthly donations help us expand our work, start new programs and support more families. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/donate | Day After Shiva accompaniment | Support from The Day After Shiva | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/donate | Professional training for new companions. | Professional training for new family support volunteers. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/donate | Only together can we make sure every family knows it has someone behind it. | Your donation helps us stay alongside families. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/research | 18 humane and sensitive principles – in the sign of "Chai" | 18 principles inspired by "Chai" | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/research | 18 principles – in the sign of "Chai" | 18 principles inspired by "Chai" | אנגלית טבעית וקונקרטית, בהתאמה לעברית |
| en/week | The 5786 Awareness Week is behind us, but remembrance, listening and human responsibility do not end. | The 5786 Awareness Week has ended. Our connection with families and our work of remembrance continue. | אנגלית טבעית וקונקרטית, בהתאמה לעברית |

## עמודים שנקראו ונשארו ללא שינוי קופי

| שפה | עמודים | סיבה |
|---|---|---|
| עברית | נתוני פטירה, מחקרים, חקיקה, הרצאות, פרטיות, נגישות | מידע מובנה/מאושר, תוכן חסר או משפטי; סוגיות משמעות מופיעות בהצעות למטה |
| אנגלית | נתוני פטירה, חקיקה, הרצאות, פרטיות, נגישות | אותם שיקולים; לא שונו טקסטים משפטיים או תכנים חסרים |

## הצעות לשינוי משמעות — לא יושמו; לאישור פיני רבינוביץ

| עמוד / נושא | הקיים | הצעה להחלטה | למה לא יושם |
|---|---|---|---|
| מחקרים, בשתי השפות | ״תמיכה באחים השכולים״ / Support bereaved siblings בתוך 18 העקרונות | לאשר עיקרון חלופי או החרגה מפורשת לתוכן המחקרי | סותר את הנחיית הסרת האחים; הסרה אוטומטית משנה את הרשימה ואת מניין 18 |
| נתוני פטירה, בשתי השפות | 10,000+ משפחות לצד סכום נתוני פטירה | לאשר מקור שסופר משפחות נפרדות, או ניסוח שמתייחס לנפטרים | סכום פטירות כשלעצמו אינו מאמת מניין משפחות; הנתון לא הוחלף |
| נתוני פטירה, אנגלית | under 4 מול קבוצת גיל 0–4 בטבלה | לאשר את גילי הקבוצה ואת התרגום המדויק | שינוי גבול גיל הוא שינוי נתון, גם אם נראה כתיקון תרגום |
| חקיקה ונתונים | טענות על המענה וההכרה מצד המדינה | לאמת מול מקור מוסמך את התוקף, הסייגים ותאריך העדכון לפני פרסום | לא בוצע מחקר משפטי ואסור להרחיב או לצמצם זכויות באמצעות עריכת קופי |
| תרומה, בשתי השפות | סעיף 46א ו־tax-deductible | לאמת את נוסח ההטבה מול אישור העמותה ורואה החשבון, לרבות ההבחנה בין ישראל לחו״ל | לא נבדקו אישורי מס ולא הושלם ה־TODO באנגלית |
| דרכי תרומה | JGive וכן פרטי העברה בנקאית והמחאה | להכריע אם ״JGive בלבד״ מתייחס לסליקה באתר או לכל דרכי התרומה | מחיקת אמצעי תשלום קיימים משנה תוכן שאושר |
| פנייה לעזרה | כפתור הסיוע המרכזי מוביל להורים | לשקול כניסה שמכוונת גם סבים וסבתות שחוו אובדן נכד/ה | שינוי יעד/מבנה ניווט חורג מעריכת ניסוח |
| טפסים | הודעת תצוגה מקדימה רק אחרי השליחה | לפני השקה, לחבר את הטפסים או לאשר הודעה מוקדמת ברורה | לא שונו מבנה הטפסים או ההבטחות התפעוליות; החיבור מתוכנן בוורדפרס |

## מה נבדק בפועל

- בניית GitHub Pages עם `--base /yakirli-site` ולאחריה בנייה לכתובת שורש: 36 עמודים, ללא שגיאות.
- השוואת כל 36 קטעי המקור מול main: רצף התגיות והמאפיינים זהה, לרבות כל הקישורים והמזהים. קבוצת המספרים בטקסט זהה; כל קטעי TODO והציטוטים זהים. עמודי פרטיות ונגישות זהים במלואם.
- Playwright ב־Chromium: כל 36 העמודים בדסקטופ 1440×1000 ובמובייל 360×800, עם Assistant. צילומי לפני/אחרי מצורפים דרך הרצת Review screenshots, בארטיפקט before-after-desktop-mobile (144 צילומים; זמינות 90 יום; אינם נשמרים בריפו).
- בכל 72 מצבי העמוד: אין גלישה אופקית של העמוד, תמונות שבורות, שגיאות JS או שדות בלי תווית. axe מצא רק את בעיית מיקוד אזור גלילת הטבלה במובייל בשתי השפות, הזהה ל־main ומטופלת ב־PR #1.
- css-tree: ללא שגיאות תחביר ב־CSS.
- html-validate: אותן שגיאות HTML קיימות בשמונה קובצי בסיס. הן מטופלות ב־PR #1; עריכת הקופי אינה משנה מאפיינים או מתקנת אותם מחדש.
- ההשוואה החזותית כוללת בית, היום השמיני, תרומה, הורים וכרטיסי התנדבות בשתי השפות. צילומי העמודים הארוכים מאפשרים לבדוק את הקצב ואת סוף הטפסים.

## מה לא נבדק

אין אישור עריכה מטעם פיני, בדיקת קורא מסך אנושי, מכשיר פיזי, Safari/Firefox, תשלומים, שליחת פניות חיה או מחקר משפטי/סטטיסטי. לא הורץ Lighthouse מחדש בענף הקופי. אין טענה שענף זה לבדו מתקן את ליקויי QA; יש לשלב גם את PR #1.

בצילומים המקומיים הוגשו קובצי Assistant ממטמון של הורדה מ־Google; ב־CI נטען מקור הגופן הרגיל. כלי הצילום טוען תמונות עצלות לפני צילום עמוד מלא בלבד, בלי לשנות את טעינת האתר. לא נערכו `reference/` ולא הופעל `tools/extract.py`.

## סקירת גולש והסרת הוראות צילום · 9.10.2026

לבקשת אלישב הוסרו כיתובי ההנחיות מהתמונות. אין שינוי בקופי האחר או בתיאורים הנגישים.

| עמוד | לפני | אחרי | למה |
|---|---|---|---|
| `src/en/donate.html` | [Photo: volunteers / hands] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/en/eighth.html` | [Photo: volunteer pair / hands – no faces of families] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/en/grandparents.html` | [Photo: a grandparent's hands – no faces] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/en/home.html` | [Photo: hands / volunteers / shot from behind – no faces of families] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/en/home.html` | [Photo: volunteer gathering / event – wide shot or from behind] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/en/memorial.html` | [Photo: candle / garden – no faces] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/en/volunteers.html` | [Photo: volunteer training session] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/he/donate.html` | [תמונה: מתנדבים / ידיים] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/he/eighth.html` | [תמונה: צמד מתנדבים / ידיים – ללא פנים של משפחות] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/he/grandparents.html` | [תמונה: ידיים של סבא/סבתא – ללא פנים] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/he/home.html` | [תמונה: ידיים / מתנדבים / צילום מאחור – ללא פנים של משפחות] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/he/home.html` | [תמונה: מפגש מתנדבים / אירוע – צילום רחב או מאחור] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/he/memorial.html` | [תמונה: נר / גן – ללא פנים] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |
| `src/he/volunteers.html` | [תמונה: מפגש הכשרת מתנדבים] | תמונה ללא הוראות צילום גלויות | בקשת המשתמש; ההנחיה נשמרה בדוח הפנימי |

בעמוד הקשר בשתי השפות נוסף קישור חיוג סביב מספר הטלפון הקיים; הטקסט ומספר הטלפון לא השתנו. יתר שינויי הסקירה והבדיקות מתועדים ב־[visitor-review.md](visitor-review.md).
