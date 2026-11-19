import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
} from "@mui/material";
import "../rightToLeftField.css";

import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { yellow, lightBrown, orange } from "../../MyColors.js";

const DialogTitleStyle = {
  font: "inherit",
  fontSize: 18,
  padding: 7,
  fontWeight: "bold",
  backgroundColor: yellow,
  display: "flex",
  justifyContent: "center",
};

const SignIn = ({ signInOpen, setSignInOpen }) => {
  const handleSignInClose = () => {
    setSignInOpen(false);
  };

  return (
    <Dialog dir="rtl" open={signInOpen} onClose={handleSignInClose}>
      <DialogTitle style={DialogTitleStyle}>הירשם לקבל עדכונים</DialogTitle>
      <DialogContent style={{ backgroundColor: lightBrown, paddingTop: 10 }}>
        <TextField
          label="שם ושם משפחה"
          required
          margin="dense"
          id="standard-basic"
          name="name"
          type="text"
          fullWidth
          variant="standard"
          InputProps={{
            style: { font: "inherit" },
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: {
              font: "inherit",
            },
          }}
        />
        <TextField
          required
          margin="dense"
          id="phone"
          name="phone"
          label="טלפון"
          type="number"
          fullWidth
          variant="standard"
          InputProps={{
            style: { font: "inherit" },
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: {
              font: "inherit",
            },
          }}
        />
        <TextField
          id="input-with-icon-textfield"
          label="אימייל"
          required
          margin="dense"
          name="email"
          type="email"
          fullWidth
          variant="standard"
          InputProps={{
            style: { font: "inherit" },
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: {
              font: "inherit",
            },
          }}
        />
      </DialogContent>
      <div
        style={{
          backgroundColor: lightBrown,
          display: "flex",
        }}
      >
        <Button
          style={{
            backgroundColor: orange,
            margin: "0px auto 10px auto",
            font: "inherit",
            color: "black",
            size: "large",
            padding: "10px 20px",
          }}
          type="submit"
          onClick={handleSignInClose}
        >
          הרשמה
        </Button>
      </div>
    </Dialog>
  );
};

export default SignIn;
