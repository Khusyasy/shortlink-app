import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import MainPage from "./MainPage/MainPage";
import ShowPage from "./ShowPage/ShowPage";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Container fixed>
                    <Switch>
                        <Route path="/show/:hash">
                            <ShowPage />
                        </Route>
                        <Route path="/users">
                            <h1>USERS</h1>
                        </Route>
                        <Route path="/">
                            <MainPage />
                        </Route>
                    </Switch>
                </Container>
            </div>
            <CssBaseline />
        </Router>
    );
}

export default App;
