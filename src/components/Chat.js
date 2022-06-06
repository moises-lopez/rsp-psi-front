import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

function Chat({ socket }) {
  const [gameCode, setGameCode] = useState("");
  const [inputGameCode, setInputGameCode] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {}, []);

  const handleSetInputGameCode = (event) => {
    setInputGameCode(event.target.value);
  };

  return (
    <div>
      <div>{messageReceived}</div>
      <TextField value={inputGameCode} onChange={handleSetInputGameCode} />
    </div>
  );
}

export default Chat;
