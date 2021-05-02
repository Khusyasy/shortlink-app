import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import SendIcon from '@material-ui/icons/Send';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "auto",
        height: "auto",
        maxWidth: "90vw",
        maxHeight: "90vh",
        backgroundColor: "white",
    },
    form: {
        width: "90vw",
        maxWidth: "60ch",
        height: "auto",
    },
    mainGrid: {
        padding: theme.spacing(5),
    },
    input: {
        width: "100%",
        padding: theme.spacing(1),
    },
    inputIcon: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    }
}));

function LoginPage() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    function handleSubmit(e) {
        e.preventDefault();
        if (email === "") {
            setEmailErr("Please input your email.");
            return;
        } else setEmailErr("");
        if (password === "") {
            setPasswordErr("Please input your password.");
            return;
        } else setPasswordErr("");

        setLoading(true);
        axios.post("/users/login", { email, password })
            .then(res => {
                var data = res.data;
                if (data.status === "success") {
                    setCookie("jwt", data.token);
                    setLogin(true);
                } else if (data.status === "failed") {

                }
                setLoading(false);
            });
        setEmail("");
        setPassword("");
        setEmailErr("");
        setPasswordErr("");
    }

    return (
        <Paper className={classes.root} elevation={3}>
            { login ? <Redirect push to={"/"} /> : null}
            <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container className={classes.mainGrid} direction="row" alignContent="center" alignItems="center" justify="space-between" spacing={3}>
                    <Typography variant="h5" align="center" className={classes.input}>Login</Typography>
                    <Grid item xs={12} className={classes.input}>
                        <Grid container spacing={2} alignItems="flex-end" alignContent="center">
                            <Grid item md={2} className={classes.inputIcon}>
                                <AccountCircleIcon />
                            </Grid>
                            <Grid item xs={12} md={10}>
                                <TextField type="text" id="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} error={emailErr !== "" ? true : false} helperText={emailErr} fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.input}>
                        <Grid container spacing={2} alignItems="flex-end" alignContent="center">
                            <Grid item md={2} className={classes.inputIcon}>
                                <LockIcon />
                            </Grid>
                            <Grid item xs={12} md={10}>
                                <TextField type="password" id="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} error={passwordErr !== "" ? true : false} helperText={passwordErr} fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.input}>
                        <Grid container justify="center">
                            <Button type="submit" variant="contained" color="primary" className={classes.input}>
                                {loading
                                    ?
                                    "Logging in..."
                                    :
                                    (<><SendIcon />&nbsp;Login</>)
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default LoginPage;