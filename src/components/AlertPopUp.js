import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertPopUp({
  open,
  winner,
  player,
  handleClose,
  resetGame,
}) {
  const getTitleMessage = () => {
    console.log(open, player, winner);
    if (winner === player) return "YOU WON!";
    if (winner === 0) return "DRAW";
    return "YOU LOST!";
  };

  const handlePressOkay = () => {
    resetGame();
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handlePressOkay}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{getTitleMessage()}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Press OK to play again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePressOkay}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
