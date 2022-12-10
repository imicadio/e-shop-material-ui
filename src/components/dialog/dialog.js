import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ openAlert, handleOpenAlert, handleConfirm }) {
  return (
    <div>
      <Dialog
        open={openAlert}
        // onClose={() => handleConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            minWidth: {
              xs: "100%",
              md: "500px",
            },
          }}
        >
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirm(false)}>Disagree</Button>
          <Button onClick={() => handleConfirm(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
