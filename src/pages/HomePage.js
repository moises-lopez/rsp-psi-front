import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import PastGamesTable from "../components/PastGamesTable";

function HomePage({ socket }) {
  const SERVER_URI = "http://localhost:3000";

  const [gameCode, setGameCode] = useState("");
  const [inputGameCode, setInputGameCode] = useState("");
  const [player1Choide, setPlayer1Choice] = useState("");
  const [player2Choide, setPlayer2Choice] = useState("");
  const [pastGames, setPastGames] = useState();

  useEffect(() => {
    socket.off("init").on("init", handleInit);
    socket.on("gameCode", handleGameCode);
    socket.off("gameFinished").on("gameFinished", handleGameFinished);
  }, []);

  const handleSetInputGameCode = (event) => {
    setInputGameCode(event.target.value);
  };

  function handleInit(value) {
    console.log("connected player", value);
  }

  function handleGameCode(request) {
    setGameCode(request);
  }

  function handleGameFinished(winner) {
    console.log("handled", winner);
    window.alert(`Player ${winner} won`);
  }

  function newGame() {
    console.log("emitting");
    socket.emit("newGame");
  }
  function joinGame(inputGameCode) {
    socket.emit("joinGame", inputGameCode);
  }
  function pickChoice(choice) {
    socket.emit("pickChoice", choice);
  }
  async function getSocketId() {
    console.log("holaaaaa");

    const response = await axios.get(`${SERVER_URI}/pastGames`);
    setPastGames(response.data);

    console.log(pastGames);
    socket.emit("getSocketId");
  }

  return (
    <div>
      <Button onClick={newGame}>Create New Game</Button>

      <TextField value={inputGameCode} onChange={handleSetInputGameCode} />

      <Button onClick={() => joinGame(inputGameCode)}>Join Game</Button>
      <Button onClick={() => pickChoice("rock")}>Rock</Button>
      <Button onClick={() => pickChoice("scissors")}>Scissors</Button>
      <Button onClick={() => pickChoice("paper")}>Paper</Button>
      <Button onClick={getSocketId}>Get Socket Id</Button>
      <div>You are on room {gameCode}</div>
      {pastGames && <PastGamesTable data={pastGames} />}
    </div>
  );
}

export default HomePage;
