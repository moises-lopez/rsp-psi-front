import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import rpsImage from "../images/rps.png";
import { createTheme } from "@mui/material/styles";

function HomePage({ socket }) {
  let navigate = useNavigate();
  const [inputGameCode, setInputGameCode] = useState("");

  const handleSetInputGameCode = (event) => {
    setInputGameCode(event.target.value);
  };

  function newGame() {
    console.log("emitting");
    socket.emit("newGame");
    navigate("/playGame");
  }

  function joinGame(inputGameCode) {
    socket.emit("joinGame", inputGameCode);
    navigate("/playGame");
  }
  function joinRandomGame() {
    socket.emit("joinRandomGame");
    navigate("/playGame");
  }
  function handlePastGames() {
    navigate("/pastGames");
  }
  function handleSetPlayerName() {
    navigate("/setPlayerName");
  }
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      newColor: {
        main: "#000000",
        contrastText: "#ffffff",
      },
    },
  });
  return (
    <div width="100%">
      <ThemeProvider theme={theme}>
        <Grid alignItems="center" container direction="column" spacing={4}>
          <img
            width="70%"
            style={{ alignSelf: "center" }}
            height="auto"
            src={rpsImage}
          />
        </Grid>

        <Grid alignItems="center" container direction="column" spacing={4}>
          <Grid item xs={8}>
            <Button color="newColor" variant="contained" onClick={newGame}>
              Create New Game
            </Button>
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={inputGameCode}
              onChange={handleSetInputGameCode}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              color="newColor"
              variant="contained"
              onClick={() => joinGame(inputGameCode)}
            >
              Join Game
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Button
              color="newColor"
              variant="contained"
              onClick={joinRandomGame}
            >
              Join Random Game
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Button
              color="newColor"
              variant="contained"
              onClick={handlePastGames}
            >
              See All Games
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Button
              color="newColor"
              variant="contained"
              onClick={handleSetPlayerName}
            >
              Set Player Name
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default HomePage;
