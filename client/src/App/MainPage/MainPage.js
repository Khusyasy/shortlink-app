import { useState } from "react";
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
    },
    paper: {
        padding: theme.spacing(5),
        backgroundColor: theme.palette.secondary,
    },
    input: {
        width: "100%",
        padding: theme.spacing(2),
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

    function handleSubmit(e) {
        e.preventDefault();
        if (input !== "") {
            console.log(input);
            setInput("");
        }
    }

    return (
        <Grid container className={classes.root} direction="column" alignContent="center" alignItems="center" justify="space-evenly">
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h5" align="center">Link to Shorten</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid item xs={12} className={classes.input}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item md={2} className={classes.inputIcon}>
                                <LinkIcon />
                            </Grid>
                            <Grid item xs={12} md={10}>
                                <TextField type="text" id="link" label="Link" value={input} onChange={e => setInput(e.target.value)} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.input}>
                        <Grid container justify="center">
                            <Button type="submit" variant="contained" color="primary">
                                <SendIcon />&nbsp;Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
}

export default MainPage;