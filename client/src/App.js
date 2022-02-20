import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Header from "./components/header/Header";
import Body from "./components/body/Body";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Routes>
          <Route path="/" element={<Header />}>
          </Route>
        </Routes>
        <Body /> */}
        <Header />
        <Body/>
      </Router>
    </div>
  );
}

export default App;
