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


## עדכון נוסחים מאושר 26.10.2026

פיני אישר בשיחה את הנוסחים מתוך מסמך הנוסחים המוצעים, לאחר שהבהיר שהליווי תלוי בפניית המשפחה או בהעברת מידע לרשות או לעמותה. העדכון כולל את כל המופעים המקבילים ואת הגרסה האנגלית. לא שונו טפסים, שירותים, נתונים, מכתבי משפחות, מסמכים משפטיים או סימוני תוכן חסר.

| שפה ועמוד | לפני | אחרי | סיבה |
|---|---|---|---|
| he/home | אנחנו מגיעים אליכם כשהשבעה מסתיימת, ונשארים לצדכם לאורך השנים – כמה שתצטרכו. | מיזם "היום השמיני" נועד לקדם קשר וליווי למשפחות לאחר השבעה ובהמשך הדרך. הליווי מתואם לאחר פנייה לעמותה או לרשות המקומית, בהתאם לרצון המשפחה, לצרכיה ולמענה הזמין. | דיוק היקף המענה בהתאם לאישור פיני |
| he/home | מתנדבי היום השמיני מגיעים אל המשפחה כשהשבעה מסתיימת. | במסגרת מיזם "היום השמיני", מתנדבים שעברו הכשרה מלווים משפחות לאחר השבעה, בתיאום ובהתאם לפעילות המקומית ולזמינות המתנדבים. | דיוק היקף המענה בהתאם לאישור פיני |
| he/parents | מתנדבי היום השמיני מגיעים אליכם כשהשבעה מסתיימת. | במסגרת מיזם "היום השמיני", מתנדבים שעברו הכשרה מלווים משפחות לאחר השבעה, בתיאום ובהתאם לפעילות המקומית ולזמינות המתנדבים. | דיוק היקף המענה בהתאם לאישור פיני |
| he/volunteers | הצטרפו למיזם היום השמיני והיו שם בשביל משפחות שחוו שכול אזרחי, מיד כשהשבעה מסתיימת. | הצטרפו למיזם היום השמיני לליווי משפחות שחוו שכול אזרחי לאחר השבעה, בתיאום ובהתאם לפעילות המקומית. | דיוק היקף המענה בהתאם לאישור פיני |
| he/volunteers | רכזים ואנשי מקצוע לצדכם לאורך הדרך. | ההכשרה כוללת הכוונה למתנדבים בנוגע לליווי המשפחות ולפנייה לגורמי מקצוע בעת הצורך. | דיוק היקף המענה בהתאם לאישור פיני |
| he/grandparents | תמיכה אישית ומקצועית | אפשרויות תמיכה | דיוק היקף המענה בהתאם לאישור פיני |
| he/grandparents | מענה מותאם על ידי מומחים לאובדן. | אפשר לפנות אלינו לבירור אפשרויות התמיכה האישית והקבוצתית, בהתאם לצורך ולמסגרות הזמינות. | דיוק היקף המענה בהתאם לאישור פיני |
| he/donate | צמד מתנדבים שמגיע אל המשפחה כשהשבעה מסתיימת. | ליווי משפחות לאחר השבעה באמצעות מתנדבים שעברו הכשרה, בתיאום ובהתאם לפעילות המקומית ולזמינות המתנדבים. | דיוק היקף המענה בהתאם לאישור פיני |
| he/donate | <p class="flow-msg"><strong>וגם:</strong> טיפול רגשי מסובסד לבני משפחה שחוו אובדן.</p> | <p class="flow-msg">אפשר לפנות לעמותה לבירור אפשרויות לסיוע במימון טיפול רגשי. הסיוע כפוף לתנאי התוכניות ולמשאבים הזמינים.</p> | דיוק היקף המענה בהתאם לאישור פיני |
| he/eighth | כשהשבעה מסתיימת, מתחיל המענה של "היום השמיני" למשפחה, בשיתוף הקהילה, הרשות המקומית ואנשי המקצוע לפי הצורך. | מיזם "היום השמיני" נועד לקדם קשר וליווי למשפחות לאחר השבעה ובהמשך הדרך. הליווי מתואם לאחר פנייה לעמותה או לרשות המקומית, בהתאם לרצון המשפחה, לצרכיה ולמענה הזמין. | דיוק היקף המענה בהתאם לאישור פיני |
| he/eighth | <li>פשיעה בקרב נוער</li> |  | דיוק היקף המענה בהתאם לאישור פיני |
| he/eighth | בסדק שנשאר, האור מאפשר להזדקף. | קשר מתמשך עם המשפחה מאפשר להקשיב לצרכיה ולבחון יחד איזו עזרה מתאימה לה. | דיוק היקף המענה בהתאם לאישור פיני |
| he/eighth | ביום השמיני לא תהיה אף משפחה לבד | המטרה שלנו היא שיותר משפחות יקבלו קשר וליווי גם לאחר השבעה. | דיוק היקף המענה בהתאם לאישור פיני |
| he/eighth | הקהילה מחבקת אתכם ביום השמיני ולאחריו. | קהילה ששומרת על קשר עם משפחות שחוו אובדן, גם לאחר השבעה. | דיוק היקף המענה בהתאם לאישור פיני |
| en/home | Support begins when shiva ends and continues over the years, guided by each family’s needs. | The Day After Shiva aims to build contact and support for families after shiva and in the years that follow. Support is coordinated after the family contacts Yakir Li or the local authority, taking into account their wishes, needs and the support available. | דיוק היקף המענה בהתאם לאישור פיני |
| en/home | Day After Shiva volunteers reach the family when the shiva ends. | Trained volunteers support families after shiva through The Day After Shiva program. Arrangements depend on local activity and volunteer availability. | דיוק היקף המענה בהתאם לאישור פיני |
| en/parents | Day After Shiva volunteers accompany the family after the shiva. | Trained volunteers support families after shiva through The Day After Shiva program. Arrangements depend on local activity and volunteer availability. | דיוק היקף המענה בהתאם לאישור פיני |
| en/volunteers | Join the Day After Shiva program and accompany families facing civilian bereavement right after the shiva. | Join The Day After Shiva to support families facing civilian bereavement after shiva, in coordination with local activity. | דיוק היקף המענה בהתאם לאישור פיני |
| en/volunteers | Guidance from coordinators and professionals along the way. | Training includes guidance on supporting families and seeking professional advice when needed. | דיוק היקף המענה בהתאם לאישור פיני |
| en/grandparents | Personal and professional support | Support options | דיוק היקף המענה בהתאם לאישור פיני |
| en/grandparents | Tailored help from bereavement specialists. | Contact us to explore individual and group support options, depending on your needs and the services available. | דיוק היקף המענה בהתאם לאישור פיני |
| en/donate | A pair of volunteers accompanying a family after the shiva. | Support for families after shiva from trained volunteers, coordinated according to local activity and volunteer availability. | דיוק היקף המענה בהתאם לאישור פיני |
| en/donate | <p class="flow-msg"><strong>And also:</strong> subsidized emotional therapy for family members who have experienced loss.</p> | <p class="flow-msg">Contact Yakir Li to ask about possible financial assistance for emotional therapy. Assistance depends on program conditions and available resources.</p> | דיוק היקף המענה בהתאם לאישור פיני |
| en/eighth | When shiva ends, The Day After Shiva begins supporting the family, together with the community, the local authority and professionals as needed. | The Day After Shiva aims to build contact and support for families after shiva and in the years that follow. Support is coordinated after the family contacts Yakir Li or the local authority, taking into account their wishes, needs and the support available. | דיוק היקף המענה בהתאם לאישור פיני |
| en/eighth | <li>Youth delinquency</li> |  | דיוק היקף המענה בהתאם לאישור פיני |
| en/eighth | Through the crack that remains, the light lets us stand tall. | Staying in touch with a family helps us listen to their needs and explore together what help would suit them. | דיוק היקף המענה בהתאם לאישור פיני |
| en/eighth | After shiva, no family will be left alone | Our goal is for more families to have contact and support after shiva. | דיוק היקף המענה בהתאם לאישור פיני |
| en/eighth | the community embraces you on the day after shiva and beyond. | a community that stays in touch with families who have experienced loss, after shiva and beyond. | דיוק היקף המענה בהתאם לאישור פיני |
| he/parents | הסבר ליד הפנייה | כדי שנוכל להציע מענה, חשוב שתפנו אלינו. גם אם חלף זמן מהאובדן, אפשר ליצור קשר ולברר אילו אפשרויות ליווי ותמיכה זמינות עבורכם. | דיוק היקף המענה בהתאם לאישור פיני |
| he/contact | הסבר ליד הפנייה | כדי שנוכל להציע מענה, חשוב שתפנו אלינו. גם אם חלף זמן מהאובדן, אפשר ליצור קשר ולברר אילו אפשרויות ליווי ותמיכה זמינות עבורכם. | דיוק היקף המענה בהתאם לאישור פיני |
| en/parents | הסבר ליד הפנייה | Please contact us so that we can explore how to help. Even if time has passed since your loss, you can reach out to ask what support options are available to you. | דיוק היקף המענה בהתאם לאישור פיני |
| en/contact | הסבר ליד הפנייה | Please contact us so that we can explore how to help. Even if time has passed since your loss, you can reach out to ask what support options are available to you. | דיוק היקף המענה בהתאם לאישור פיני |


## עדכון לבקשת פיני, 27.10.2026

| עמוד | לפני | אחרי | למה |
|---|---|---|---|
| מכתבי משפחות | מכתבי משפחות שחוו אובדן; פתיח על היום השמיני | על הילדים שלנו ועל החיים בלעדיהם; פתיח על הבן או הבת, הבית אחרי השבעה והעזרה שניתנה או חסרה | כותרת אישית וניסוח ישיר לבקשת פיני. המכתבים עצמם לא נערכו |
| אודות, נתוני פטירה | פתיח ושלושה מספרים גדולים | פתיח על חיי המשפחה ופסקאות טקסט רגילות עם אותם סדרי גודל | הצגה חמה יותר ללא הבלטת מספרים |
| אודות, נתוני פטירה | כ-15,000 משפחות | כ-15,000 ילדים וצעירים שנפטרו בשבע השנים בטבלה | הנתונים סופרים נפטרים, ואינם מדידה של מספר משפחות שונות. צוין שהטבלה כוללת את כל סיבות הפטירה |
| אודות, טבלה | הדגשת סך הכול והשורה האחרונה | רק תאי השנים בכתום; נתוני הגילים והסכומים ללא הדגשה | בקשת פיני. המספרים המקוריים בטבלה נשמרו |
| פעילות ציבורית | מה אנחנו עושים בזירה הציבורית | פועלים להכרה במשפחות השכול האזרחי | עברית ישירה שמבהירה את מטרת הפעילות |

עמוד היום השמיני נבדק לצורך הצגתו לפיני. לא נערכו בו שינויים במסגרת בקשה זו.

בדיקות: בנייה עם קידומת GitHub Pages ובכתובת שורש עברו; בדיקת קישורים עם הקידומת עברה ללא שגיאות. אין Chromium מקומי זמין ולכן צילומי לפני ואחרי ובדיקת תצוגה ממתינים ל-Review screenshots ב-PR. אי ההתאמה הישנה למקור בנתוני 2024 נשארת לבירור כפי שתועד במסירת האתר; לא שונו ערכי הטבלה.


## תיקונים שאושרו בידי פיני ביום 2.11.2026

סעיפים 1, 3, 4, 5, 7 עד 23, 26, 28 עד 33 בקובץ הניסוחים הממוספר. השינויים בעברית בלבד; תרגום לאנגלית אינו חלק מהאישור הנוכחי. אין שינוי במספרים, בטפסי Google, במסמכים משפטיים או בהערות ההשלמה שלא נבחרו. סעיף 6 לא נבחר ולכן פתיחת אודות נשמרה.

| סעיף | עמוד | לפני | אחרי | למה |
|---|---|---|---|---|
| 1 | home | יקיר לי פועלת למען הורים שאיבדו בן או בת ממחלה או בנסיבות טרגיות, ולמען סבים וסבתות שחוו אובדן נכד או נכדה. אפשר לפנות אלינו לשיחה אישית, למפגשים ולקבוצות תמיכה, לפי הצורך ולפי הפעילות הקיימת באזורכם. | יקיר לי פועלת למען הורים שאיבדו בן או בת ממחלה או בנסיבות טרגיות, ולמען סבים וסבתות שחוו אובדן נכד או נכדה. אפשר לפנות אלינו לשיחה ולבירור מענה מתאים. | נוסח שאושר בידי פיני |
| 3 | home | בחודשים הראשונים קבוצות תמיכה ושיחות אישיות להורים. | גם בהמשך הדרך אפשר לפנות לבירור שיחות אישיות וקבוצות תמיכה, גם שנים לאחר האובדן ובהתאם לפעילות הקיימת. | נוסח שאושר בידי פיני |
| 4 | home | שכול אזרחי הוא מציאות רחבה בישראל. אלפי משפחות חיות עם אובדן של ילד, נער או צעיר ממחלה, מתאונה או מנסיבות טרגיות אחרות – אובדן שאינו תמיד נראה, ואינו תמיד זוכה למענה מתמשך. יקיר לי – יד ולב לשכול האזרחי פועלת מאז 2015 כדי להיות לצד המשפחות ביום השמיני ואחריו: בשיחות אישיות ובקבוצות תמיכה, בהנצחה, בהעלאת המודעות הציבורית ובקידום חקיקה. דסי, בתי, נפטרה בגיל 19 ממחלת הסרטן. היא הייתה אופטימית, ונתנה כוח לכל מי שהיה לידה. אחרי מותה הכרתי עשרות משפחות שאיבדו ילד, וראיתי כמה קשה להן לחזור לחיים, במיוחד ביום שאחרי השבעה. הבנתי שאני לא יכול לחזור לשגרה הקודמת שלי. כך נולדה יקיר לי. – פיני רבינוביץ, מייסד ויו&quot;ר יקיר לי | יקיר לי נוסדה בשנת 2015 על ידי פיני רבינוביץ, אביה של דסי רבינוביץ, שנפטרה ממחלת הסרטן. העמותה פועלת לליווי משפחות שחוו שכול אזרחי, להנצחה, להעלאת מודעות ולקידום הכרה וזכויות. על דסי ועל הדרך להקמת העמותה אפשר לקרוא בעמוד האודות. | נוסח שאושר בידי פיני |
| 5 | home | גשר בין רווחת העובד לעשייה ערכית. | כלים למעסיקים ולארגונים לסיוע לעובדים שחוו אובדן ושכול אזרחי. לבירור אפשרויות לשיתוף פעולה פנו אלינו. | נוסח שאושר בידי פיני |
| 5 | public |  | אחריות תאגידית כלים למעסיקים ולארגונים לסיוע לעובדים שחוו אובדן ושכול אזרחי. לבירור אפשרויות לשיתוף פעולה פנו אלינו. לבירור שיתוף פעולה | נוסח שאושר בידי פיני |
| 7 | about | שכול אזרחי הוא אובדן של ילד, נער או צעיר ממחלה, מתאונה, מאסון פתאומי או מנסיבות טרגיות אחרות. | יקיר לי מתמקדת בשכול של הורים שאיבדו בן או בת ממחלה, מתאונה או בנסיבות טרגיות אחרות, ובסבים ובסבתות שחוו אובדן נכד או נכדה. אובדן בן או בת אינו מוגבל לגיל צעיר. הנתונים המוצגים באתר על ילדים, בני נוער וצעירים מתייחסים לגילים עד 24 בלבד. | נוסח שאושר בידי פיני |
| 8 | about | למשפחות השכול האזרחי אין מסגרת ממלכתית של הכרה ותמיכה כמו לשכול הצבאי. אנחנו כאן כדי שאף משפחה שחוותה אובדן אזרחי לא תישאר לבד. | אין מסגרת ממלכתית אחידה המעניקה הכרה וליווי מתמשך לכלל משפחות השכול האזרחי. המענים הקיימים משתנים לפי נסיבות הפטירה ותנאי הזכאות. | נוסח שאושר בידי פיני |
| 8 | about | בניגוד לשכול הצבאי, אין לשכול האזרחי מסגרת ממלכתית קבועה של הכרה ותמיכה. כאב המשפחות אינו מקבל לעיתים קרובות את ההכרה והתמיכה הראויות, והן נותרות לבדן. | אין מסגרת ממלכתית אחידה המעניקה הכרה וליווי מתמשך לכלל משפחות השכול האזרחי. המענים הקיימים משתנים לפי נסיבות הפטירה ותנאי הזכאות. | נוסח שאושר בידי פיני |
| 9 | about | המונח &quot;שכול אזרחי&quot; נטבע בשיח הציבורי בישראל על ידי מייסד העמותה, פיני רבינוביץ. | יקיר לי פועלת להרחבת ההכרה בשכול האזרחי ולהבאת צורכי המשפחות לשיח הציבורי ולמקבלי ההחלטות. | נוסח שאושר בידי פיני |
| 10 | about | העמותה נוסדה לזכרה של דסי רבינוביץ ז&quot;ל (1977–1996). דסי חלתה בסרטן ונפטרה ביום הראשון של ראש השנה תשנ&quot;ז (14.9.1996), בגיל 19, לאחר התמודדות ממושכת עם המחלה. | דסי רבינוביץ נפטרה ממחלת הסרטן בשנת 1996, בגיל 19. בעקבות פטירתה וההיכרות עם משפחות נוספות שחוו אובדן, התפתחה אצל אביה פיני שליחות מתמשכת לסייע למשפחות השכול האזרחי. | נוסח שאושר בידי פיני |
| 11 | about | אחרי מותה של דסי, בתי, הכרתי עשרות משפחות שילדיהן נפטרו, וראיתי כמה מהן מתקשות לחזור לחיי היומיום. הקושי הגדול מתחיל לא פעם ביום שאחרי השבעה, כשהמנחמים חוזרים לביתם. הבנתי שאני לא יכול לחזור לשגרה הקודמת שלי. ב־2015 הקמנו את יקיר לי, כדי שאף משפחה שחוותה אובדן אזרחי לא תישאר לבד. המונח &quot;שכול אזרחי&quot; נולד מתוך הצורך הזה: לתת שם לכאב שלא היה לו שם. | אחרי שדסי, בתי, נפטרה, הבנתי שהשבעה מסתיימת אבל ההתמודדות המשפחתית, החברתית והכלכלית נמשכת. במשך השנים הכרתי משפחות נוספות שאיבדו בן או בת וראיתי את הצורך בקשר ובליווי מתמשך. מתוך הצורך הזה הקמתי בשנת 2015 את יקיר לי. הפעילות בעמותה היא חלק משליחות שמלווה אותי מאז פטירתה של דסי. | נוסח שאושר בידי פיני |
| 12 | about | alt="דסי רבינוביץ ז&quot;ל" | alt="דסי רבינוביץ" | נוסח שאושר בידי פיני |
| 13 | media | פיני, אביה של דסי רבינוביץ ז&quot;ל, מספר על הדרך להתמודד עם אובדן של ילד ללא תמיכה (ערוץ 14) | פיני רבינוביץ על אובדן בתו דסי ועל הצורך בליווי למשפחות \| ערוץ 14 | נוסח שאושר בידי פיני |
| 14 | parents | את גודל האובדן, הכאב והצער שאתם חווים אף אחד לא יכול להבין עד הסוף. אבל אתם לא צריכים לעבור את זה לבד. | אפשר לפנות אלינו לשיחה ולבירור אפשרויות ליווי ותמיכה, גם אם עברו שנים מאז פטירת הבן או הבת. נברר יחד מה עשוי להתאים לכם ומה זמין באזורכם. | נוסח שאושר בידי פיני |
| 15 | eighth |  | לבירור ליווי למשפחה | נוסח שאושר בידי פיני |
| 16 | eighth | ביום השמיני מה קורה למשפחה לאחר הקימה מהשבעה למחרת השבעה, הבית מתמלא שקט כבד. הסביבה חוזרת לשגרה, והמשפחה נשארת עם האובדן – ברובד הרגשי וברובד התפקודי. רובד רגשי בדידות, עייפות, בלבול והלם, חרדה וייאוש התפרצות רגשות מודחקים קשיים משפחתיים טראומה – &quot;פוסט־טראומה&quot; רובד תפקודי קושי בתפקוד היומיומי, דיכאון ירידה תעסוקתית עד אבטלה ירידה בלימודים עד נשירה | ביום השמיני מה קורה למשפחה לאחר הקימה מהשבעה לאחר השבעה יש משפחות שחוות בדידות, עייפות, קושי בתפקוד או עומס בענייני עבודה ובירוקרטיה. הצרכים משתנים ממשפחה למשפחה וגם לאורך הזמן. הליווי מתחיל בהקשבה ובבירור מה מתאים למשפחה. | נוסח שאושר בידי פיני |
| 17 | eighth | למחרת השבעה, הבית מתמלא שקט כבד. נוכחות אנושית יוצרת מרחב לעמוד ולא לשקוע. מתוך המרחב הזה נולדת היכולת לשאת את מה שאי אפשר לתקן. קשר מתמשך עם המשפחה מאפשר להקשיב לצרכיה ולבחון יחד איזו עזרה מתאימה לה. | במיזם היום השמיני מתנדבים שעברו הכשרה שומרים על קשר עם משפחות לאחר השבעה ובהמשך הדרך. המפגשים מתקיימים בהסכמת המשפחה ובקצב שמתאים לה. אפשר להיפגש בבית, לשוחח בטלפון או להיפגש במקום אחר, בהתאם לצורך ולפעילות המקומית. | נוסח שאושר בידי פיני |
| 18 | eighth | יצירת קשר ראשוני עם אגף מתנדבים / שירותים חברתיים / קהילה הצגת המיזם ובדיקת היתכנות | פנייה במייל לבעל התפקיד המתאים ברשות, בצירוף חומרי היכרות עם המיזם. לאחר מכן מוודאים שהמייל התקבל ומתאמים שיחת היכרות לבדיקת הצורך והאפשרות להקמה. | נוסח שאושר בידי פיני |
| 19 | eighth | פגישת הסבר עם בעלי התפקידים קבלת גיבוי ארגוני ולוגיסטי תקצוב הפעילות (בעיקר הכשרת מתנדבים) | לאחר שיחת ההיכרות מגישים הצעת עלות למנחה לחמישה מפגשי הכשרה. ההנחיה תיעשה בידי מנחה בעלת תואר שני בתחום האובדן והשכול. מתאמים עם הרשות את גיוס המתנדבים, המקום והאחריות להמשך הליווי. | נוסח שאושר בידי פיני |
| 19 | eighth | 3–5 מפגשים פרונטליים בהנחיית עו&quot;ס | חמישה מפגשי הכשרה בהנחיית מנחה בעלת תואר שני בתחום האובדן והשכול | נוסח שאושר בידי פיני |
| 20 | volunteers | למי מיועד המיזם | למי מתאימה ההתנדבות | נוסח שאושר בידי פיני |
| 20 | volunteers | המיזם מיועד להורים שחוו אובדן של ילד או צעיר, לסבים ולסבתות שחוו אובדן נכד או נכדה, ולקהילות המבקשות לתת למשפחות מקום ומענה. | ההתנדבות מתאימה למי שמוכנים להקשיב, לשמור על קשר ולכבד את רצון המשפחה ואת פרטיותה. ההצטרפות כוללת שיחת היכרות והכשרה, בהתאם לתפקיד ולפעילות המקומית. אפשר לפנות גם להתנדבות מקצועית או לסיוע בארגון הפעילות. | נוסח שאושר בידי פיני |
| 21 | grandparents | רשת תמיכה לסבים ולסבתות – מפגשים קבוצתיים, כלים ושיחות אישיות. | סבים וסבתות שחוו אובדן נכד או נכדה מוזמנים לסדנה בת 10 מפגשים, ללא עלות. במפגשים אפשר לשתף, להקשיב ולהיות עם אנשים שחוו אובדן דומה. השאירו פרטים וניצור קשר לבירור קבוצה מתאימה באזורכם. | נוסח שאושר בידי פיני |
| 22 | research | מחקרים | מחקרים, דוחות ונתונים | נוסח שאושר בידי פיני |
| 22 | research | \| title: מחקרים \| | \| title: מחקרים, דוחות ונתונים \| | נוסח שאושר בידי פיני |
| 23 | research | כשבן או בת נפטרים, הגעגוע נעשה חלק מהיומיום של המשפחה. הוא נוכח בארוחות, בחגים ובתוכניות שכבר לא יתגשמו. הנתונים שלפניכם מספרים כמה ילדים וצעירים נפטרו בישראל, וכמה בתים מתמודדים עם החסר הזה. | הטבלה מציגה פטירות של ילדים, בני נוער וצעירים עד גיל 24, לפי שנה וקבוצת גיל. היא כוללת את כל סיבות הפטירה ואינה מציגה בנפרד את מספר הפטירות בנסיבות של שכול אזרחי. מספר הנפטרים אינו מלמד כשלעצמו כמה משפחות נפרדות חוו אובדן. | נוסח שאושר בידי פיני |
| 23 | research | בשנים שבטבלה נפטרו בישראל בממוצע כ־1,200 ילדים, בני נוער וצעירים עד גיל 24 בכל שנה. כמחצית מהם היו תינוקות ופעוטות עד גיל 4. בשש השנים שיש לגביהן פירוט לפי גיל נפטרו כ־7,400 ילדים, בני נוער וצעירים. המשפחות שלהם ממשיכות לחיות עם האובדן גם שנים אחר כך, וזקוקות למקום שבו אפשר לדבר על מי שאיננו ולבקש עזרה כשצריך. הטבלה כוללת פטירות מכל הסיבות, ואינה מוגבלת לשכול אזרחי. |  | נוסח שאושר בידי פיני |
| 26 | legislation | יום חופש על חשבון המעסיק ביום הזיכרון הפרטי | קידום חופשה ביום האזכרה לבן או לבת שנפטרו | נוסח שאושר בידי פיני |
| 28 | public | &quot;האם המשפחה התמודדה בשנים האחרונות עם אובדן בן/בת משפחה בשכול?&quot; | האם יש אובדן במשפחה שחשוב לכם שהצוות יכיר כדי להתאים את המענה? | נוסח שאושר בידי פיני |
| 28 | public | ☐ שכול צבאי ☐ שכול אזרחי | אפשר לבחור שלא להשיב. מטרת השאלה היא לאפשר פנייה רגישה והתאמת סיוע, לפי רצונכם. על הגוף המפעיל את הטופס לציין מי רשאי לעיין בתשובה. המידע לא יועבר לעמותה באופן אוטומטי. | נוסח שאושר בידי פיני |
| 29 | lectures | פיני רבינוביץ, אביה של דסי ומייסד יקיר לי. דסי רבינוביץ, נערה אמיצה ומעוררת השראה, הלכה לעולמה בשנת 1996 והשאירה לנו צוואה: "עיגולי השמחה". היא נודעה במאבקה במחלת הסרטן ובמאבקה על הזכות לטיפול רפואי הוגן. מיום שקמתי מהשבעה יצאתי למסע ארוך – להעלות את המודעות לשכול האזרחי ולסייע למשפחות שאיבדו את יקיריהן במחלות ובאסונות טרגיים. מתוך כאב, אהבה וערבות הדדית הקמתי את עמותת "יקיר לי". בהרצאה, המשלבת רעיון ומעשה, רצוי ומצוי, אני מספר על דסי ועל התובנות שהשאירה – למען שיפור התודעה והעשייה החברתית לטובת משפחות השכול האזרחי. | פיני רבינוביץ, אביה של דסי ומייסד יקיר לי, מספר על דסי ועל השליחות שהתפתחה בעקבות פטירתה. ההרצאה עוסקת בצורכי משפחות השכול האזרחי, בהקמת העמותה ובפעילות לליווי משפחות ולקידום הכרה וזכויות. ההרצאה מיועדת לקהילות, לארגונים ולאנשי מקצוע. | נוסח שאושר בידי פיני |
| 30 | lectures | מסע עם דסי ובעקבותיה שיחה עם ברוריה רבינוביץ, אמה של דסי. התמודדות עם מצבים שונים בחיים – עם עיגולי השמחה של דסי. דסי הייתה נערה שזכתה לחיות חיי חסד, אהבת אדם, שמחה ואמונה. עוד בחייה נודעה בזכות אישיותה הכובשת, התמודדותה האמיצה עם מחלת הסרטן ומאבקה לצדק וליחס הוגן מצד הממסד הרפואי. גם בחלוף שנים מפטירתה, אישיותה ומעשיה של דסי חיים ופועמים בעולם, ובכוחם להעניק תקווה ואופטימיות ולהגדיל את עיגולי השמחה שבנו ובאחרים. | ברוריה רבינוביץ, אמה של דסי, מספרת על דסי ועל עיגולי השמחה שלה. השיחה עוסקת בזיכרונות, בקשר שנמשך לאחר הפטירה ובמקומם של עיגולי השמחה בחיי המשפחה. | נוסח שאושר בידי פיני |
| 31 | memorial | תמונות, סיפורים, מילים – וכל חומר דיגיטלי ייחודי של יקירכם, במקום אחד שלא הולך לאיבוד. | אתר ההנצחה מאפשר לרכז תמונות, סיפורים וזיכרונות ולשתף אותם עם בני המשפחה והחברים. | נוסח שאושר בידי פיני |
| 31 | memorial | מקום שמחבר בין העבר לעתיד, עם זיכרונות שנשמרים לדורות – בפלטפורמה מאובטחת ונגישה מכל מקום. | האתרים מוקמים בפלטפורמת ממוריז. מומלץ לשמור גם עותקים אישיים של החומרים. | נוסח שאושר בידי פיני |
| 32 | donate | למה לתמוך בפעילות בישראל, השכול האזרחי נוגע לכולנו. משפחות רבות איבדו את היקר להן ממחלה, בתאונה או באסון, והכאב מלווה אותן בכל יום מחדש. יקיר לי נמצאת לצד משפחות שחוו שכול אזרחי – בתמיכה רגשית, בייעוץ, בפעילויות קהילתיות ובהנצחה. התרומות מאפשרות את הפעילות הזאת. תרומות חד־פעמיות והוראות קבע חודשיות מאפשרות לנו להרחיב את הפעילות, להקים מיזמים חדשים ולהגיע לעוד משפחות. התרומה מבטאת גם את האחריות שלנו כחברה לזכור את המשפחות ולתמוך בהן. | למה לתמוך בפעילות תמכו בליווי למשפחות לאחר השבעה, בהכשרת מתנדבים ובקבוצות לסבים ולסבתות שחוו אובדן נכד או נכדה. התמיכה מאפשרת לקיים את הפעילות ולהרחיב אותה בהתאם לצורכי המשפחות ולמשאבים הזמינים. | נוסח שאושר בידי פיני |
| 33 | contact | כדי שנוכל להציע מענה, חשוב שתפנו אלינו. גם אם חלף זמן מהאובדן, אפשר ליצור קשר ולברר אילו אפשרויות ליווי ותמיכה זמינות עבורכם. | השאירו שם וטלפון וניצור קשר לבירור המענה המתאים. אפשר לפנות גם שנים לאחר האובדן, ולשתף רק במה שנוח לכם. | נוסח שאושר בידי פיני |
| 33 | parents | כדי שנוכל להציע מענה, חשוב שתפנו אלינו. גם אם חלף זמן מהאובדן, אפשר ליצור קשר ולברר אילו אפשרויות ליווי ותמיכה זמינות עבורכם. | השאירו שם וטלפון וניצור קשר לבירור המענה המתאים. אפשר לפנות גם שנים לאחר האובדן, ולשתף רק במה שנוח לכם. | נוסח שאושר בידי פיני |
| 22 | guide | href="/research/" data-page="research">מחקרים | href="/research/" data-page="research">מחקרים, דוחות ונתונים | נוסח שאושר בידי פיני |
| 22 | legislation | href="/research/" data-page="research">מחקרים | href="/research/" data-page="research">מחקרים, דוחות ונתונים | נוסח שאושר בידי פיני |
| 22 | research | href="/research/" data-page="research">מחקרים | href="/research/" data-page="research">מחקרים, דוחות ונתונים | נוסח שאושר בידי פיני |

כותרת המחקרים עודכנה גם במילון התפריט העברי ב־build.py. נתוני הטבלה, העמודים באנגלית ושאר סעיפי הבדיקה נשמרו. מצב החקיקה לא הוצג כזכות שהושלמה.

סעיף 8 יושם גם בהבהרה הצמודה לנתון שבדף הבית, ללא שינוי המספר או יתר הטקסט.
