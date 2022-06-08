import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayGamePage from "./pages/PlayGamePage";
import PastGamesPage from "./pages/PastGamesPage";
import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import SetPlayerNamePage from "./pages/SetPlayerNamePage";

function App({ socket }) {
  const [playerNameSetted, setPlayerNameSetted] = useState();

  useEffect(() => {
    const playerNameLocal = localStorage.getItem("playerName");
    console.log(playerNameLocal);
    setPlayerNameSetted(playerNameLocal);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage socket={socket} />}></Route>
        <Route
          path="/playGame"
          element={<PlayGamePage socket={socket} />}
        ></Route>
        <Route
          path="/pastGames"
          element={<PastGamesPage socket={socket} />}
        ></Route>
        <Route
          path="/setPlayerName"
          element={<SetPlayerNamePage socket={socket} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
