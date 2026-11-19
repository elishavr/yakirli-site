import { yellow, lightBrown, blue, orange, grey } from "../../MyColors.js";

export const body = {
  // backgroundColor: lightBrown,

  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
export const AddCandleButton = {
  backgroundColor: "white",
  margin: "16px auto",
  font: "inherit",
  color: "black",

  /* size */
  padding: "22px 50px", // 👈 makes it BIG
  fontSize: "20px",
  minWidth: 200,
  minHeight: 56,

  /* rounded */
  borderRadius: "999px", // 👈 big pill radius
  border: "2px solid #1FA09D", // 👈 purple border

  /* smooth hover like Elementor */
  transition: "all 700ms ease-out",

  /* optional polish */
  textTransform: "none",
};
export const button = {
  // backgroundColor: yellow,
  // margin: "10px auto",
  // font: "inherit",
  // color: "black",
  // width: "fit-content",
  backgroundColor: "white",
  margin: "16px auto",
  font: "inherit",
  color: "black",

  /* size */
  padding: "16px 36px", // 👈 makes it BIG
  fontSize: "18px",
  minWidth: 200,
  minHeight: 56,

  /* rounded */
  borderRadius: "999px", // 👈 big pill radius
  border: "2px solid #1FA09D", // 👈 purple border

  /* smooth hover like Elementor */
  transition: "all 700ms ease-out",

  /* optional polish */
  textTransform: "none",
};
export const pageNavigationButtons = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "20px",
};
export const contentTitle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "6px 0 0 0",
};

export const contentSubTitle = {
  display: "block",
  font: "inherit",
  fontSize: 22,
  margin: "7px auto",
};

export const paragraphLine = {
  margin: "7px 20px",
  textAlign: "center",
  wordWrap: "break-word",
  font: "inherit",
  fontSize: 22,
  direction: "rtl",
  padding: "0px 0px",
};

export const line = {
  font: "inherit",
  fontSize: 22,
  direction: "rtl",
  margin: "4px 0 0 0",
};

export const litCandleContent = {
  font: "inherit",
  position: "flex",
  color: blue,
  backgroundColor: "#f7f6ee",
  fontWeight: "bold",
  textAlign: "center",
};

export const litCandleButton = {
  marginTop: "20px",
  backgroundColor: "",
  margin: "0px auto 10px auto",
  font: "inherit",
  color: "black",
  size: "large",
  padding: "10px 20px",
  margin: "15px",
  fontWeight: "normal",
};

export const card = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  color: "white",
  borderRadius: "20px",
  // padding: 20,
  padding: "2%", // proportional padding
  width: "100%", // make card take full width of Grid item
  boxSizing: "border-box",
};

export const cardTitle = {
  // height: "90px",
  height: "70px",
  paddingTop: "10px", // 👈 adds space from the top of the card
  paddingLeft: "10px", // optional: some horizontal padding
  paddingRight: "10px", // optional
  boxSizing: "border-box", // ensures padding doesn't overflow
  marginBottom: "10px", // 👈 adds space below the title
};

export const cardName = {
  font: "inherit",
  position: "flex",
  color: "#fdd34e",
  fontWeight: "bold",
  textAlign: "center",

  fontSize: "clamp(16px, 2vw, 25px)", // min 16px, max 25px
};

export const cardButton = {
  // width: 155,
  width: "80%", // relative to card
  fontSize: "clamp(14px, 1.5vw, 18px)",

  font: "inherit",
  padding: "8px 0px",
  marginTop: "20px",
  marginBottom: "10px", // 👈 adds space from the bottom of the card
  backgroundColor: "white",
  borderRadius: "20px",
};

export const cradContent = {
  padding: "10px",
  font: "inherit",
  position: "flex",
  // color: grey,
  fontWeight: "bold",
  fontSize: 17,
  textAlign: "center",
  direction: "rtl",
};

export const cardImage = {
  // width: 90,
  // height: 70,
  // paddingTop: 140,
  width: "60%", // relative to card width
  paddingTop: "60%", // keeps the aspect ratio square
  backgroundSize: "contain", // 👈 key line
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

export const addPersonDialogColors = {
  background: "#FFF7E6", // warm cream
  primary: "#1FA09D", // teal
  secondaryText: "#555", // soft gray
  border: "#E0D6C3", // light beige border
};

export const addPersonDialogTitle = {
  font: "inherit",
  fontSize: 18,
  padding: 7,
  fontWeight: "bold",
  // backgroundColor: yellow,
  color: addPersonDialogColors.primary,
  // display: "flex",
  // justifyContent: "center",
  marginBottom: "8px",
};

export const addPersonDialogContent = {
  // backgroundColor: lightBrown,
  // backgroundColor: "transparent",
  // paddingTop: 10,
  // backgroundColor: addPersonDialogColors.background,
  backgroundColor: "white",
  padding: "16px",
};

export const dialogButtonDiv = {
  // backgroundColor: lightBrown,
  // display: "flex",
  // backgroundColor: addPersonDialogColors.background,
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  padding: "12px 16px",
  font: "inherit",
};

export const dialogButtonPrimary = {
  // backgroundColor: orange,
  // margin: "0px auto 10px auto",
  // font: "inherit",
  // color: "black",
  // size: "large",
  // padding: "10px 20px",
  backgroundColor: addPersonDialogColors.primary,
  color: "white",
  font: "inherit",
  fontSize: "16px",
  padding: "10px 24px",
  borderRadius: "999px",
  boxShadow: "0 6px 16px rgba(31,160,157,0.25)",
  textTransform: "none",
  fontWeight: "bold"
};

export const dialogButtonSecondary = {
  backgroundColor: "transparent",
  color: addPersonDialogColors.secondaryText,
  font: "inherit",
  fontSize: "16px",
  padding: "10px 24px",
  borderRadius: "999px",
  border: `1px solid ${addPersonDialogColors.border}`,
  textTransform: "none",
  fontWeight: "bold"
};
