import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import AlertPopUp from "../components/AlertPopUp";
import rockImage from "../images/rock.png";
import paperImage from "../images/paper.png";
import scissorsImage from "../images/scissors.png";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";

function PlayGamePage({ socket }) {
  const SERVER_URI = "http://localhost:3000";
  let navigate = useNavigate();

  const [gameCode, setGameCode] = useState("");
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [pastGames, setPastGames] = useState();
  const [playerNum, setPlayerNum] = useState();
  const [rival, setRival] = useState();
  const [winner, setWinner] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [winCounter, setWinCounter] = useState(0);

  useEffect(() => {
    socket.on("gameCode", handleGameCode);
    socket.off("gameFinished").on("gameFinished", handleGameFinished);
    socket.off("init").on("init", handleInit);
    socket.off("setWinner").on("setWinner", handleSetWinner);
    socket.off("setRival").on("setRival", handleSetRival);
  }, [socket]);

  function pickChoice(choice) {
    socket.emit("pickChoice", choice);
  }
  function handleSetRival(rival) {
    setRival(rival);
  }
  function handleCloseDialog() {
    setDialogOpen(false);
  }

  function resetGame() {
    console.log(winner);
    console.log(playerNum);
    const wins = winCounter;
    if (winner === playerNum) {
      console.log("updating");
      setWinCounter(wins + 1);
    }
    if (playerNum === 1) socket.emit("resetGame");
  }

  function handleGameCode(request) {
    setGameCode(request);
  }

  function handleGameFinished() {
    console.log("finishing game..");
    console.log(playerNum, winner);
    setDialogOpen(true);
  }
  function handleSetWinner(winner) {
    console.log("setting winner", winner);

    setWinner(winner);
  }

  function handleInit(value) {
    console.log("connected player", value);
    setPlayerNum(value);
  }

  return (
    <Grid alignItems="center" container direction="row" spacing={4}>
      <Grid direction="row" item xs={6}>
        <Typography variant="subtitle2">
          Room {gameCode} vs {rival}
        </Typography>
      </Grid>
      <Grid direction="row" item xs={6}>
        <Typography variant="h4">Wins {winCounter}</Typography>
      </Grid>
      <Grid direction="row" item xs={4}>
        <Button onClick={() => pickChoice("rock")}>
          <img
            width="70%"
            style={{ alignSelf: "center" }}
            height="auto"
            src={rockImage}
          />
        </Button>
      </Grid>
      <Grid direction="row" item xs={4}>
        <Button onClick={() => pickChoice("scissors")}>
          <img
            width="70%"
            style={{ alignSelf: "center" }}
            height="auto"
            src={scissorsImage}
          />
        </Button>
      </Grid>

      <Grid direction="row" item xs={4}>
        <Button onClick={() => pickChoice("paper")}>
          <img
            width="70%"
            style={{ alignSelf: "center" }}
            height="auto"
            src={paperImage}
          />
        </Button>
      </Grid>
      <Grid direction="row" item xs={12}>
        <Chat socket={socket} rival={rival} />
      </Grid>

      {dialogOpen && (
        <AlertPopUp
          open={dialogOpen}
          winner={winner}
          player={playerNum}
          handleClose={handleCloseDialog}
          resetGame={resetGame}
        ></AlertPopUp>
      )}
    </Grid>
  );
}

export default PlayGamePage;
