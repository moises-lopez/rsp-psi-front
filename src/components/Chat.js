import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import AlertMessage from "./AlertMessage";

function Chat({ socket, rival }) {
  const [gameCode, setGameCode] = useState("");
  const [inputGameCode, setInputGameCode] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [messageFromRival, setMessageFromRival] = useState();
  const [messageToSend, setMessageToSend] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    socket
      .off("sendMessageToRival")
      .on("sendMessageToRival", handleReceiveMessageFromRival);
  }, []);

  function handleReceiveMessageFromRival(message) {
    setOpenAlert(false);
    console.log("receiving..........");
    setMessageFromRival(message);
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
    }, 2000);
  }
  const handleSetInputMessageToSend = (event) => {
    setMessageToSend(event.target.value);
  };
  const handleKeyDown = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      console.log("emiting");
      socket.emit("sendMessageToRival", {
        rival: rival,
        messageToSend: messageToSend,
      });
      setMessageToSend("");
    }
  };

  return (
    <div>
      <Box style={{ paddingTop: "10%" }} sx={{ width: "100%" }}>
        <AlertMessage
          message={messageFromRival}
          open={openAlert}
        ></AlertMessage>
        <TextField
          fullWidth={true}
          value={messageToSend}
          onKeyDown={handleKeyDown}
          onChange={handleSetInputMessageToSend}
        />
      </Box>
    </div>
  );
}

export default Chat;
