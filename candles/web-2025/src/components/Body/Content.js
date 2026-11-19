import React from "react";
import { Typography } from "@mui/material";
import * as Style from "./BodyStyle";

const p1 =
  "מדי שנה נפטרים בישראל כ-1,000 ילדים וילדות (מלידה ועד גיל 24), ממחלה או אסון טרגי.";
const p2 =
  "משפחות אלו הן 'משפחות השכול האזרחי': משפחות שעולמן חרב עליהן, הן מתקשות לחזור למעגלי החיים, ואינן מקבלות תמיכה או ליווי.";
const p3 =
  "אנחנו, בעמותת יקיר לי תומכים במשפחות הללו. דואגים להם לאוזן קשבת, לקבוצות תמיכה ולסיוע החל מהיום השמיני (שאחרי השבעה) ולאורך כל מעגלי החיים.";
const p4 = "בעזרתכם נאמר למשפחות השכולות: אכפת לנו! אתן לא לבד בסיפור הזה.";

const Content = () => {
  return (
    <>
      <div style={{ ...Style.contentTitle, fontWeight: "bold" }}>
        <Typography style={Style.line}>מצטרפים למיזם ומדליקים נר!</Typography>
      </div>
      <div style={Style.contentSubTitle}>
        <Typography style={Style.line}>♡ לזכור את אלה שאינם</Typography>
        <Typography style={Style.line}>
          ♡ לומר למשפחות השכולות: אנחנו אתכם!
        </Typography>
        <Typography style={Style.line}>
          ♡ לצרף יחד נר ועוד נר לחיבור גדול שכולו אור
        </Typography>
      </div>
      <div>
        <Typography style={Style.paragraphLine}>{p1}</Typography>
        <Typography style={Style.paragraphLine}>{p2}</Typography>
        <Typography style={Style.paragraphLine}>{p3}</Typography>
        <Typography style={Style.paragraphLine}>{p4}</Typography>
      </div>
    </>
  );
};
export default Content;
