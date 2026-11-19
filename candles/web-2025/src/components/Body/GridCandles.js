import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import Candle from "./Candle.js";
import AddPersonDialog from "./AddPersonDialog.js";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import * as Style from "./BodyStyle";

const Candles = ({
  userId,
  isComputer,
  personList,
  clickCandle,
  addPersonToData,
  addPersonOpen,
  setAddPersonOpen,
  loadMoreDocuments,
  reachedEnd,
}) => {
  const [page, setPage] = useState(1);

  const gridStyle = {
    padding: isComputer ? "10px 90px" : "10px 19px",
  };

  // Calculate the starting and ending indices for the current page
  // const totalPersons = personList.length;
  // const itemsPerPage = 40;
  // const startIndex = (page - 1) * itemsPerPage;
  // const endIndex = Math.min(page * itemsPerPage, totalPersons);

  const handleNewPage = (newPage) => {
    // setPage(newPage);
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
    loadMoreDocuments()
  };

  return (
    <div>
      {!personList.length ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="start"
          height="100vh"
        >
          <Stack spacing={2} direction="row">
            <Skeleton variant="rounded" width={179} height={304} />
            <Skeleton variant="rounded" width={179} height={304} />
          </Stack>
        </Box>
      ) : (
        <Grid
          container
          alignItems="sterch"
          spacing={2}
          style={gridStyle}
          dir="rtl"
        >
          {personList.map((person) => (
            <Grid key={person.id} item xs={6} sm={6} md={4} lg={3}>
              <Candle
                userId={userId}
                person={person}
                handleClickCandle={clickCandle}
                isComputer={isComputer}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <AddPersonDialog
        addPersonOpen={addPersonOpen}
        setAddPersonOpen={setAddPersonOpen}
        addPersonToData={addPersonToData}
        setPage={setPage}
      />
      <div style={Style.pageNavigationButtons}>
        {/* {page > 1 && (
          <Button
            style={Style.button}
            startIcon={<ArrowBackIosNewIcon />}
            onClick={() => handleNewPage(page - 1)}
          >
            לעמוד הקודם
          </Button>
        )} */}
        {/* {page < Math.ceil(totalPersons / itemsPerPage) && (
          <Button
            style={Style.button}
            startIcon={<ArrowForwardIosIcon />}
            onClick={() => handleNewPage(page + 1)}
          >
            לעמוד הבא
          </Button>
        )} */}
        {!reachedEnd && (
          <Button
            style={Style.button}
            startIcon={<ArrowForwardIosIcon />}
            onClick={() => handleNewPage(page + 1)}
          >
            טען עוד
          </Button>
        )}
      </div>
    </div>
  );
};

export default Candles;
