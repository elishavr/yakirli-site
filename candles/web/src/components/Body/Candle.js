import { Button, Card, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LitCandleDialog from "./LitCandleDialog.js";
import candleOn from "../../Images/candleOn.jpg";
import candleOff from "../../Images/candleOff.jpg";
import candleCardBackground from "../../Images/candleCardBackground.jpg";
import { yellow, grey } from "../../MyColors.js";
import * as Style from "./BodyStyle";

const Candle = ({ userId, person, handleClickCandle, isComputer }) => {
  const [litCandleOpen, setLitCandleOpen] = useState(false);
  const [userLitCandle, setUserLitCandle] = useState(
    person.users.includes(userId)
  );
  useEffect(() => {
    setUserLitCandle(person.users.includes(userId));
    // console.log(userLitCandle);
  }, [person]);

  const getPersonContent = () => {
    let line = "";
    if (person.age) {
      line += person.age;
      if (person.city) {
        line += ", ";
      }
    }
    line += person.city;
    return line;
  };

  const contentLine = getPersonContent();

  const handleClick = (event) => {
    if (!userLitCandle) {
      handleClickCandle(event);
    }
    setLitCandleOpen(true);
  };

  const handleClose = () => {
    setLitCandleOpen(false);
  };

  const fontNameSize = person.name.length > 16 ? 20 : 25;

  return (
    <div>
      <Card
        style={{
          ...Style.card,
          backgroundImage: `url(${candleCardBackground})`,
        }}
      >
        <div style={{ ...Style.cardTitle, zIndex: 1 }}>
          <Typography style={{ ...Style.cardName, fontSize: fontNameSize }}>
            {person.name}
          </Typography>
          <Typography style={Style.cradContent}>{contentLine}</Typography>
        </div>
        <CardMedia
          style={Style.cardImage}
          image={userLitCandle ? candleOn : candleOff}
          title={"Candle"}
        />
        <Button
          id={person.id}
          style={{
            ...Style.cardButton,
            backgroundColor: userLitCandle ? yellow : "white",
            // color: userLitCandle ? "black" : "white",
            color: "black",
          }}
          onClick={handleClick}
        >
          {userLitCandle ? "תודה!" : "הדלקת נר"}
        </Button>
      </Card>
      <LitCandleDialog
        cardOpen={litCandleOpen}
        setCardOpen={setLitCandleOpen}
        person={person}
        isComputer={isComputer}
      />
    </div>
  );
};

export default Candle;
