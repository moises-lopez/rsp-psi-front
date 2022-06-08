import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import PastGamesTable from "../components/PastGamesTable";

var game_on = false;

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
    game_on = true;
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
    game_on = true;
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
      <div class="break-div"></div>
      {false ? <p>Hello World</p> : null}
      { !game_on ?
      <div class="single-bar">
        <Button onClick={newGame} class="single-bar-inside">Create New Game</Button>
      </div> : null }

      { !game_on ?
      <div class="single-bar">
        <div class="single-bar-inside">
          <TextField id="textFieldJoin" value={inputGameCode} onChange={handleSetInputGameCode} />
          <Button id="joinGameBtn" onClick={() => joinGame(inputGameCode)}>Join Game</Button>
        </div>
      </div> : null }

      { game_on ?
      <div class="single-bar2">
        <div class="single-bar-inside">
          <span onClick={() => pickChoice("rock")} class="icon solid major style1 fa-hand-rock game-icon"></span>
          <span onClick={() => pickChoice("scissors")} class="icon solid major style1 fa-hand-scissors game-icon"></span>
          <span onClick={() => pickChoice("paper")} class="icon solid major style1 fa-hand-paper game-icon"></span>
        </div>
      </div> : null }

      <div>Your room: {gameCode}</div>
      {pastGames && <PastGamesTable data={pastGames} />}
    </div>
  );
}

export default HomePage;
