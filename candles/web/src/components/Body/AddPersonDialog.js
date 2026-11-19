import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Radio,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import "../rightToLeftField.css";
import * as Style from "./BodyStyle";

const AddPersonDialog = ({
  addPersonOpen,
  setAddPersonOpen,
  addPersonToData,
  setPage,
}) => {
  // at the top of the file, before the component
  const personFields = [
    { label: "שם המונצח/ת", name: "name", type: "text", required: true },
    { label: "גיל פטירה", name: "age", type: "text" },
    { label: "מקום מגורים", name: "city", type: "text" },
  ];

  const creatorFields = [
    { label: "שם מלא", name: "nameCreator", type: "text" },
    { label: "טלפון", name: "phoneCreator", type: "text" },
    { label: "אימייל", name: "emailCreator", type: "text" },
  ];

  const [newPerson, setNewPerson] = useState({
    name: "",
    age: "",
    city: "",
    nameCreator: "",
    phoneCreator: "",
    emailCreator: "",
    personalConnectionCreator: "",
  });
  const [nameError, setNameError] = useState(false);
  // const [buildMemorySite, setBuildMemorySite] = React.useState("a");

  const handleAddPerson = () => {
    if (!newPerson.name) {
      setNameError(true);
      return;
    }
    setNewPerson({ name: "", age: "", city: "" });
    setAddPersonOpen(false);
    addPersonToData(newPerson);
    setPage(1);
  };

  const handleCloseWithoutAdding = () => {
    setAddPersonOpen(false);
  };

  // const onChangeBuildMemorySite = (event) => {
  //   setBuildMemorySite(event.target.value);
  // };

  return (
    <Dialog
      dir="rtl"
      open={addPersonOpen}
      onClose={handleCloseWithoutAdding}
      PaperProps={{
        sx: {
          borderRadius: 5,
          // padding: 2,
          // backgroundColor: "#FAFAFA",
          // backgroundColor: "#FFF7E6", // 👈 warm candle tone
          // backgroundColor: Style.addPersonDialogColors.background,
          backgroundColor: "white",
          border: `1px solid ${Style.addPersonDialogColors.border}`,
          fontFamily: "discovery",
        },
      }}
    >
      {/* <DialogTitle style={Style.addPersonDialogTitle}>להדלקת נר</DialogTitle> */}
      <DialogContent style={{ ...Style.addPersonDialogContent }}>
        <Typography style={Style.addPersonDialogTitle}>פרטי המונצח</Typography>

        {personFields.map((field) => (
          <Box
            key={field.name}
            sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}
          >
            <Typography
              sx={{
                font: "inherit",
                minWidth: 120,
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              {field.label}
            </Typography>

            <TextField
              sx={{
                flex: 1,
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: Style.addPersonDialogColors.primary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: Style.addPersonDialogColors.primary,
                  },
                },
              }}
              InputProps={{
                style: {
                  font: "inherit",
                  textAlign: field.name === "name" ? "right" : "left",
                },
              }}
              variant="outlined"
              margin="dense"
              id={field.name}
              name={field.name}
              type={field.type}
              fullWidth
              required={field.required}
              onChange={(event) => {
                if (field.name === "name") setNameError(false);
                setNewPerson((person) => ({
                  ...person,
                  [field.name]: event.target.value,
                }));
              }}
              value={newPerson[field.name] || ""}
              error={field.name === "name" ? nameError : false}
            />
          </Box>
        ))}

        {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
          <Typography
            sx={{
              font: "inherit",
              minWidth: 120,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            שם המונצח/ת
          </Typography>

          <TextField
            sx={{
              flex: 1,
              direction: "rtl",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // focused border
                },
              },
            }}
            InputProps={{ style: { font: "inherit", textAlign: "right" } }}
            InputLabelProps={{
              style: { font: "inherit", textAlign: "right" },
              dir: "rtl",
            }}
            dir="rtl"
            // label="שם המונצח/ת"
            variant="outlined"
            required
            id="standard-basic"
            name="name"
            type="text"
            fullWidth
            onChange={(event) => {
              setNameError(false);
              setNewPerson((person) => ({
                ...person,
                name: event.target.value,
              }));
            }}
            error={nameError}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
          <Typography
            sx={{
              font: "inherit",
              minWidth: 120,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            גיל פטירה
          </Typography>

          <TextField
            sx={{
              flex: 1,
              direction: "rtl",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // focused border
                },
              },
            }}
            InputProps={{
              style: { font: "inherit" },
            }}
            InputLabelProps={{
              style: {
                font: "inherit",
              },
            }}
            variant="outlined"
            margin="dense"
            id="age"
            name="age"
            // label="גיל פטירה"
            type="text"
            fullWidth
            onChange={(event) => {
              setNewPerson((person) => ({
                ...person,
                age: event.target.value,
              }));
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
          <Typography
            sx={{
              font: "inherit",
              minWidth: 120,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            מקום מגורים
          </Typography>

          <TextField
            sx={{
              flex: 1,
              direction: "rtl",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // focused border
                },
              },
            }}
            dir="rtl"
            InputProps={{
              style: { font: "inherit" },
            }}
            InputLabelProps={{
              style: {
                font: "inherit",
              },
            }}
            variant="outlined"
            margin="dense"
            id="city"
            name="city"
            // label="מקום מגורים"
            type="text"
            fullWidth
            onChange={(event) => {
              setNewPerson((person) => ({
                ...person,
                city: event.target.value,
              }));
            }}
          />
        </Box> */}

        {/* <DialogContent style={{ fontWeight: "bold" }}> */}
        {/* <Box sx={{ mt: 3 }}> */}

        <Typography style={Style.addPersonDialogTitle} mb={1}>
          פרטי מדליק הנר
        </Typography>

        {creatorFields.map((field) => (
          <Box
            key={field.name}
            sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}
          >
            <Typography
              sx={{
                font: "inherit",
                minWidth: 120,
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              {field.label}
            </Typography>

            <TextField
              sx={{
                flex: 1,
                direction: "rtl",
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: Style.addPersonDialogColors.primary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: Style.addPersonDialogColors.primary,
                  },
                },
              }}
              InputProps={{
                style: {
                  font: "inherit",
                  textAlign: field.name === "name" ? "right" : "left",
                },
              }}
              variant="outlined"
              margin="dense"
              id={field.name}
              name={field.name}
              type={field.type}
              fullWidth
              required={field.required}
              onChange={(event) => {
                if (field.name === "name") setNameError(false);
                setNewPerson((person) => ({
                  ...person,
                  [field.name]: event.target.value,
                }));
              }}
              value={newPerson[field.name] || ""}
              error={field.name === "name" ? nameError : false}
            />
          </Box>
        ))}

        {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
          <Typography
            sx={{
              font: "inherit",
              minWidth: 120,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            שם מלא
          </Typography>

          <TextField
            sx={{
              flex: 1,
              direction: "rtl",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // focused border
                },
              },
            }}
            style={{ marginTop: "0px", fontWeight: "normal" }}
            dir="rtl"
            InputProps={{
              style: { font: "inherit" },
            }}
            InputLabelProps={{
              style: {
                font: "inherit",
              },
            }}
            variant="outlined"
            margin="dense"
            id="nameCreator"
            name="nameCreator"
            // label="שם מלא"
            type="text"
            fullWidth
            onChange={(event) => {
              setNewPerson((person) => ({
                ...person,
                nameCreator: event.target.value,
              }));
            }}
          />
        </Box> */}

        {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
          <Typography
            sx={{
              font: "inherit",
              minWidth: 120,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            טלפון
          </Typography>
          <TextField
            sx={{
              flex: 1,
              direction: "rtl",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // focused border
                },
              },
            }}
            dir="rtl"
            style={{ fontWeight: "normal" }}
            InputProps={{
              style: { font: "inherit" },
            }}
            InputLabelProps={{
              style: {
                font: "inherit",
              },
            }}
            variant="outlined"
            margin="dense"
            id="phoneCreator"
            name="phoneCreator"
            // label="טלפון"
            type="text"
            fullWidth
            onChange={(event) => {
              setNewPerson((person) => ({
                ...person,
                phoneCreator: event.target.value,
              }));
            }}
          />
        </Box> */}

        {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
          <Typography
            sx={{
              font: "inherit",
              minWidth: 120,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            אימייל
          </Typography> */}
        {/* <TextField
            sx={{
              flex: 1,
              direction: "rtl",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // focused border
                },
              },
            }}
            dir="rtl"
            style={{ fontWeight: "normal" }}
            InputProps={{
              style: { font: "inherit" },
            }}
            InputLabelProps={{
              style: {
                font: "inherit",
              },
            }}
            variant="outlined"
            margin="dense"
            id="emailCreator"
            name="emailCreator"
            // label="אימייל"
            type="text"
            fullWidth
            onChange={(event) => {
              setNewPerson((person) => ({
                ...person,
                emailCreator: event.target.value,
              }));
            }}
          />
        </Box> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            gap: 1,
            font: "inherit",
          }}
        >
          <Typography
            sx={{
              font: "inherit",
              minWidth: 120,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            קשר למונצח
          </Typography>
          <FormControl
            fullWidth
            margin="dense"
            sx={{
              fontFamily: "inherit",
              flex: 1,
              direction: "rtl",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: Style.addPersonDialogColors.primary, // focused border
                },
              },
            }}
          >
            <Select
              dir="rtl"
              value={newPerson.personalConnectionCreator || ""}
              onChange={(e) =>
                setNewPerson((p) => ({
                  ...p,
                  personalConnectionCreator: e.target.value,
                }))
              }
              sx={{
                textAlign: "right",
              }}
            >
              <MenuItem value="בן/בת משפחה - קרבה ראשונה" dir="rtl">
              בן/בת משפחה - קרבה ראשונה
              </MenuItem>
              <MenuItem value="בן/בת משפחה" dir="rtl">
              בן/בת משפחה
              </MenuItem>
              <MenuItem value="חבר/ה" dir="rtl">
                חבר/ה
              </MenuItem>
              <MenuItem value="אחר" dir="rtl">
                אחר
              </MenuItem>
            </Select>
          </FormControl>

          {/* </DialogContent> */}
        </Box>
      </DialogContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          backgroundColor: "transparent",
          pb: 1,
        }}
      >
        <div style={Style.dialogButtonDiv}>
          <Button style={Style.dialogButtonPrimary} onClick={handleAddPerson}>
            הוספה
          </Button>

          <Button
            style={Style.dialogButtonSecondary}
            onClick={handleCloseWithoutAdding}
          >
            סגירה
          </Button>
        </div>
      </Box>
    </Dialog>
  );
};

export default AddPersonDialog;
