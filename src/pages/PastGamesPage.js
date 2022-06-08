import { useEffect, useState } from "react";
import axios from "axios";
import PastGamesTable from "../components/PastGamesTable";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PastGamesPage({ socket }) {
  let navigate = useNavigate();

  const SERVER_URI = "http://localhost:3000";

  const [pastGames, setPastGames] = useState();

  useEffect(() => {
    const load = async () => {
      const response = await axios.get(`${SERVER_URI}/pastGames`);
      setPastGames(response.data);
    };
    load();
  }, [socket]);
  if (!pastGames) return <div></div>;
  return (
    <div>
      <Grid direction="row" item xs={6}>
        <PastGamesTable data={pastGames} />
      </Grid>
    </div>
  );
}

export default PastGamesPage;
