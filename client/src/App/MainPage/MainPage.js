import { useState } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
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
        maxheight: "90vh",
        backgroundColor: theme.palette.secondary,
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

function MainPage() {
    const classes = useStyles();

    const [input, setInput] = useState("");
    const [inserted, setInserted] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (input !== "") {
            axios.post("/api/insertLink", { link: input })
                .then(res => {
                    var data = res.data;
                    if (data.status === "success") {
                        setInserted(data.link.shortUrl);
                    } else if (data.status === "failed") {
                        setError(data.err);
                    }
                });
            setInput("");
        }
    }

    return (
        <Paper className={classes.root} elevation={3}>
            { inserted !== "" ? <Redirect to={"/show/" + inserted} /> : ""}
            <form onSubmit={handleSubmit}>
                <Grid container className={classes.mainGrid} direction="column" alignContent="row" alignItems="center" justify="space-between" spacing={3}>
                    <Typography variant="h5" align="center" className={classes.input}>Link to Shorten</Typography>
                    <Grid item xs={12} className={classes.input}>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item md={2} className={classes.inputIcon}>
                                <LinkIcon />
                            </Grid>
                            <Grid item xs={12} md={10}>
                                <TextField type="text" id="link" label="Link" value={input} onChange={e => setInput(e.target.value)} error={error !== "" ? true : false} helperText={error} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.input}>
                        <Grid container justify="center">
                            <Button type="submit" variant="contained" color="primary" className={classes.input}>
                                <SendIcon />&nbsp;Create
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default MainPage;