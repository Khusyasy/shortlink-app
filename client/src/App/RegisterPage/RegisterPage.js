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

function RegisterPage() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [passwordConfErr, setPasswordConfErr] = useState("");
    const [register, setRegister] = useState(false);
    const [loading, setLoading] = useState(false);

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
        if (passwordConf === "") {
            setPasswordConfErr("Please input your password again.");
            return;
        } else setPasswordConfErr("");
        if (passwordConf !== password) {
            setPasswordConfErr("Please enter the same password again.");
            return;
        } else setPasswordConfErr("");

        setLoading(true);
        axios.post("/users/register", { email, password })
            .then(res => {
                var data = res.data;
                if (data.status === "success") {
                    setRegister(true);
                } else if (data.status === "failed") {
                    if (data.err.code = 11000) {
                        setEmailErr("Email is already registered, Login or use another email.")
                    }
                }
                setLoading(false);
            });
        setEmailErr("");
        setPasswordErr("");
        setPasswordConfErr("");
    }

    return (
        <Paper className={classes.root} elevation={3}>
            { register ? <Redirect push to={"/users/login"} /> : null}
            <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container className={classes.mainGrid} direction="row" alignContent="center" alignItems="center" justify="space-between" spacing={3}>
                    <Typography variant="h5" align="center" className={classes.input}>Register</Typography>
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
                        <Grid container spacing={2} alignItems="flex-end" alignContent="center">
                            <Grid item md={2} className={classes.inputIcon}>
                                <LockIcon />
                            </Grid>
                            <Grid item xs={12} md={10}>
                                <TextField type="password" id="passwordconf" label="Confirm Password" value={passwordConf} onChange={e => setPasswordConf(e.target.value)} error={passwordConfErr !== "" ? true : false} helperText={passwordConfErr} fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.input}>
                        <Grid container justify="center">
                            <Button type="submit" variant="contained" color="primary" className={classes.input}>
                                {loading
                                    ?
                                    "Registering..."
                                    :
                                    (<><SendIcon />&nbsp;Register</>)
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default RegisterPage;