import { Button, Dialog, Typography } from "@mui/material";
import React from "react";
import { lightBrown } from "../../MyColors";
import candle_yakir from "../../Images/candle-yakir.jpeg";
import html2canvas from "html2canvas";
import * as Style from "./BodyStyle";

const LitCandleDialog = ({ cardOpen, setCardOpen, person, isComputer }) => {
  const handleClose = () => {
    setCardOpen(false);
  };

  const handleShareImage = () => {
    if (navigator.share) {
      shareImg();
    } else {
      downloadImg();
    }
  };

  const downloadImg = () => {
    // create a download img
    const cardElement = document.querySelector(".cardToShare");
    html2canvas(cardElement).then((canvas) => {
      const imageDataUrl = canvas.toDataURL();
      const downloadLink = document.createElement("a");
      downloadLink.href = imageDataUrl;
      downloadLink.download = "מדליקים נר בשבוע המודעות לשכול האזרחי.png";
      downloadLink.click();
    });
  };

  async function shareImg() {
    const element = document.querySelector(".cardToShare"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg");
    const response = await fetch(data);
    const blob = await response.blob();
    const filesArray = [
      new File([blob], "מדליקים נר בשבוע המודעות לשכול האזרחי.jpg", {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      }),
    ];
    const shareData = {
      files: filesArray,
    };
    navigator.share(shareData);
  }

  const imageStyle = {
    width: isComputer ? "345px" : "300px",
  };

  return (
    <Dialog open={cardOpen} onClose={handleClose}>
      <div className="cardBody" style={Style.litCandleContent}>
        <div className="cardToShare" style={{ backgroundColor: lightBrown }}>
          <img src={candle_yakir} alt="candle-yakir" style={imageStyle}></img>
          <Typography
            style={{
              ...Style.litCandleContent,
              fontSize: 25,
            }}
          >
            זוכרים באהבה את
          </Typography>
          <Typography
            style={{
              ...Style.litCandleContent,
              fontSize: 35,
              padding: "0px 0px 20px 0px",
              width: isComputer ? "345px" : "300px",
            }}
          >
            {person.name}
          </Typography>
        </div>
        <Button
          style={Style.litCandleButton}
          type="submit"
          onClick={handleShareImage}
        >
          שיתוף
        </Button>
      </div>
    </Dialog>
  );
};

export default LitCandleDialog;
