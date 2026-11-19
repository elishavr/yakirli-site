import { Button } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Content from "./Content.js";
import GridCandles from "./GridCandles.js";
import * as Style from "./BodyStyle";

const Body = ({
  userId,
  isComputer,
  personList,
  clickCandle,
  addPersonToData,
  loadMoreDocuments,
  reachedEnd,
}) => {
  const [addPersonOpen, setAddPersonOpen] = useState(false);

  const handleAddPersonClick = () => {
    setAddPersonOpen(true);
  };

  return (
    <div style={Style.body}>
      <Content />
      <Button
        size={"large"}
        startIcon={<AddIcon />}
        onClick={handleAddPersonClick}
        style={Style.AddCandleButton}
      >
        להוספת נר
      </Button>
      <GridCandles
        userId={userId}
        isComputer={isComputer}
        personList={personList}
        clickCandle={clickCandle}
        addPersonToData={addPersonToData}
        addPersonOpen={addPersonOpen}
        setAddPersonOpen={setAddPersonOpen}
        loadMoreDocuments={loadMoreDocuments}
        reachedEnd={reachedEnd}
      />
      <h6 style={{ ...Style.contentTitle, margin: "15px", fontSize: "10px" }}>
        פיתוח האתר - שיר שבח
      </h6>
    </div>
  );
};

export default Body;
