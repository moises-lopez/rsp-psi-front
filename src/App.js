import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayGamePage from "./pages/PlayGamePage";

function App({ socket }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage socket={socket} />}></Route>
        <Route
          path="/playGame"
          element={<PlayGamePage socket={socket} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
