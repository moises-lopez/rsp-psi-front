import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

export default function AlertMessage({ message, open }) {
  console.log(message);
  return (
    <Collapse in={open}>
      <Alert sx={{ mb: 2 }}>{message}</Alert>
    </Collapse>
  );
}
