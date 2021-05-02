import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import MainPage from "./MainPage/MainPage";
import ShowPage from "./ShowPage/ShowPage";
import LoginPage from "./LoginPage/LoginPage";
import LogoutPage from "./LogoutPage/LogoutPage";

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
                        <Route path="/users/login">
                            <LoginPage />
                        </Route>
                        <Route path="/users/logout">
                            <LogoutPage />
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
