import React from "react";
import { Typography, Box, Link } from "@mui/material";
import * as Style from "./BodyStyle";

const p1 =
  "מדי שנה נפטרים בישראל כ- 1300 פעוטות, ילדים, נוער וצעירים (ממחלות או אסונות טרגיים)";
const p2 =
  "משפחות אלו הן 'משפחות השכול האזרחי': משפחות שעולמן חרב עליהן, הן מתקשות לחזור למעגלי החיים, ואינן מקבלות תמיכה או ליווי.";
const p3 =
  "אנחנו, בעמותת יקיר לי תומכים במשפחות הללו. דואגים להם לאוזן קשבת, לקבוצות תמיכה ולסיוע החל מהיום השמיני (שאחרי השבעה) ולאורך כל מעגלי החיים.";
const p4 = "בעזרתכם נאמר למשפחות השכולות: אכפת לנו! אתן לא לבד בסיפור הזה.";
const p5 =
  "במידה וברצונכם להקים אתר הנצחה עבור יקירכם, מוזמנים למלא את הפרטים בשאלון הבא";
  
const memory_website_link = "https://forms.gle/4DhccsmAcEgEZRaR8";

const Content = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#8ecccc",
        padding: 4,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        maxWidth: 800,
        margin: "20px auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // ⬅ centers the block
          mb: 1,
        }}
      >
        <Typography
          sx={{
            ...Style.line,
            textAlign: "center", // ⬅ force center
            fontWeight: "bold",
            mb: 2,
          }}
        >
          בואו להשתתף איתנו בהדלקת נר!
        </Typography>

        {/* 
        <Box
        sx={{
          textAlign: "right", // ⬅ RTL alignment
          width: "fit-content", // ⬅ keeps it tight & centered
        }}
      >
        <Typography style={Style.line}>♡ לזכור את אלה שאינם</Typography>
        <Typography style={Style.line}>
          ♡ לומר למשפחות השכולות: אנחנו אתכם!
        </Typography>
        <Typography style={Style.line}>
          ♡ לצרף יחד נר ועוד נר לחיבור גדול שכולו אור
        </Typography>
      </Box>*/}
      </Box>

      <Box>
        {/* <Typography style={Style.paragraphLine}>{p1}</Typography>
        <Typography style={Style.paragraphLine}>{p2}</Typography>
        <Typography style={Style.paragraphLine}>{p3}</Typography> */}
        <Typography style={Style.paragraphLine}>{p4}</Typography>
        <Typography style={Style.paragraphLine}>
          במידה וברצונכם להקים אתר הנצחה עבור יקירכם, מוזמנים למלא את הפרטים{" "}
          <Link
            href={memory_website_link}
            underline="hover"
            sx={{
              fontWeight: "bold",
              color: "#0b4f6c",
              cursor: "pointer",
            }}
          >
            בשאלון הבא
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
export default Content;
