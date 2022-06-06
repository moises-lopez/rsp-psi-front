import "./App.css";
import HomePage from "./pages/HomePage";

function App({ socket }) {
  return (
    <div className="App">
      <HomePage socket={socket} />
    </div>
  );
}

export default App;
