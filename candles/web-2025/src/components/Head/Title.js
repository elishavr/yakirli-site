import React from "react";
import { Typography, Container } from "@mui/material";
import yakir_li_logo from "../../Images/yakir_li_logo.png";
import { yellow, blue } from "../../MyColors.js";

const lightCandle = "מדליקים נר";

const containerStyle = {
  backgroundColor: yellow,
  margin: 0,
  padding: 20,
};
const imgStyle = {
  height: 120,
  marginBottom: 10,
};
const titleStyle = {
  font: "inherit",
  color: blue,
  fontWeight: "bold",
};

const Title = ({ counter, isComputer }) => {
  const fontSize = isComputer ? 90 : 65;
  const counterMessage = "עד כה הדלקנו יחד " + counter + " נרות";

  return (
    <Container align="center" maxWidth="false" style={containerStyle}>
      <img src={yakir_li_logo} alt="Logo" style={imgStyle} />
      <Typography style={{ ...titleStyle, fontSize }}>{lightCandle}</Typography>
      <Typography
        style={{ font: "inherit", fontSize: 20, margin: "20px 0px 0px 0px" }}
      >
        {counterMessage}
      </Typography>
    </Container>
  );
};

export default Title;
