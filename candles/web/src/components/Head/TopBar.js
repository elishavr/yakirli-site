import React, { useState } from "react";
import SignIn from "./SignIn";
import { AppBar, Toolbar, Button, ButtonGroup } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ShareIcon from "@mui/icons-material/Share";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { blue } from "../../MyColors";

const topBarStyle = {
  // backgroundColor: blue,
  background:
    "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.6))",
  backdropFilter: "blur(6px)", // ✨ modern glass effect (optional)
};

const toolBar = {
  justifyContent: "center",
};

const button = {
  // marginRight: "2px",
  // marginLeft: "2px",
  // padding: "4px 12px",
  // backgroundColor: "#ACC6C3",
  // color: "black",
  // textAlign: "center",
  // font: "inherit",

  margin: "0 4px",
  padding: "10px 18px",

  backgroundColor: "transparent", // 👈 important
  color: "black",

  font: "inherit",
  textAlign: "center",

  boxShadow: "none", // 👈 remove MUI shadow
  border: "none", // 👈 remove borders
};

const yakir_li_web_link = "https://yakirli.org";
const sign_in_link = "https://yakir-li.ravpage.co.il/active_week";
const memory_website_link = "https://forms.gle/4DhccsmAcEgEZRaR8";

// cancelled
const handleShareClick = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      alert("לחצן השיתוף אינו נתמך בדפדפן זה");
    }
  } catch (error) {
    console.error("Error sharing:", error);
  }
};

const TopBar = () => {
  const [signInOpen, setSignInOpen] = useState(false);

  // cancelled
  const handleSignInClick = () => {
    setSignInOpen(true);
  };

  return (
    <>
      <AppBar position="sticky" style={topBarStyle}>
        <Toolbar style={toolBar}>
          <ButtonGroup
            variant="contained"
            // remove borders between the buttons
            sx={{
              boxShadow: "none",
              "& .MuiButton-root": {
                border: "none",
              },
            }}
          >
            <Button
              style={button}
              size="small"
              href={memory_website_link}
              component="a"
              target="_blank"
              startIcon={<Diversity1Icon />}
            >
              להקמת אתר הנצחה
            </Button>
            <Button
              style={button}
              size="small"
              // onClick={handleSignInClick}
              href={sign_in_link}
              component="a"
              target="_blank"
              startIcon={<Diversity3Icon />}
            >
              להרשמה לפעילויות בשבוע המודעות
            </Button>
            <Button
              style={button}
              size="small"
              href={yakir_li_web_link}
              startIcon={<ArrowOutwardIcon />}
              component="a"
              target="_blank"
            >
              עוד אודותינו
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <SignIn signInOpen={signInOpen} setSignInOpen={setSignInOpen} />
    </>
  );
};
export default TopBar;
