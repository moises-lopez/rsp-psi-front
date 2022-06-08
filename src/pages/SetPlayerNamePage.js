import { useEffect, useState } from "react";
import { Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";

function SetPlayerNamePage({ socket }) {
  const SERVER_URI = "http://localhost:3000";

  const [pastGames, setPastGames] = useState();
  const [playerNameSetted, setPlayerNameSetted] = useState();
  const [playerName, setPlayerName] = useState();

  useEffect(() => {
    const playerNameLocal = localStorage.getItem("playerName");
    console.log(playerNameLocal);
    setPlayerNameSetted(playerNameLocal);
  }, []);
  const handleSetPlayerName = (event) => {
    setPlayerName(event.target.value);
  };
  const handleSetPlayerNameButton = () => {
    setPlayerNameSetted(playerName);
    localStorage.setItem("playerName", playerName);
  };
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

  if (!pastGames) return <div></div>;
  return (
    <ThemeProvider theme={theme}>
      {playerNameSetted && (
        <Grid direction="row" item xs={12}>
          <Typography variant="h4">Welcome {playerNameSetted}</Typography>
        </Grid>
      )}
      <Grid alignItems="center" container direction="column" spacing={4}>
        <Grid item xs={3}>
          <TextField value={playerName} onChange={handleSetPlayerName} />
        </Grid>
        <Grid item xs={3}>
          <Button
            color="newColor"
            variant="contained"
            onClick={() => handleSetPlayerNameButton()}
          >
            Set Player Name
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SetPlayerNamePage;
