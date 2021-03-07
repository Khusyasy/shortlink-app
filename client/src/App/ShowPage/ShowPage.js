import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
    mainGrid: {
        width: "90vw",
        maxWidth: "90ch",
        height: "auto",
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
    },
    linkContainer: {
        borderBottom: "1px solid black",
    },
    textOverflow: {
        overflowX: "auto",
    },
}));

function ShowPage() {
    const classes = useStyles();

    const [link, setLink] = useState({});
    const [loading, setLoading] = useState(false);

    const hashParam = useParams().hash;
    useEffect(() => {
        setLoading(true);
        axios.post("/api/getLink", { shortUrl: hashParam })
                .then(res => {
                    var data = res.data;
                    if (data.status === "success") {
                        setLink(data.link);
                    }
                    setLoading(false);
                });
    }, [hashParam])

    function handleCopy() {
        navigator.clipboard.writeText(link?.shortUrl);
    }

    return (
        <Paper className={classes.root} elevation={3}>
            <Grid container className={classes.mainGrid} direction="row" alignContent="center" alignItems="center" justify="space-between" spacing={3}>
                <Typography variant="h5" align="center" className={classes.input}>Shorter Link</Typography>
                <Grid item xs={12} className={classes.input}>
                    <Grid container spacing={2} className={classes.linkContainer} alignItems="center" justify="center" alignContent="center" >
                        <Grid item md={2} className={classes.inputIcon}>
                            <LinkOffIcon />
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <Typography variant="caption" >Long Link</Typography>
                            <Typography variant="body1" className={classes.textOverflow}>{ loading ? "Loading..." : link?.longUrl || "Not Found"}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.input}>
                    <Grid container spacing={2} className={classes.linkContainer} alignItems="center" justify="center" alignContent="center" >
                        <Grid item md={2} className={classes.inputIcon}>
                            <LinkIcon />
                        </Grid>
                        <Grid item xs={12} md={10} className={classes.textOverflow}>
                            <Typography variant="caption" >Short Link</Typography>
                            <Typography variant="body1">{ loading ? "Loading..." : link?.shortUrl || "Not Found"}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.input}>
                    <Grid container spacing={2} className={classes.linkContainer} alignItems="center" justify="center" alignContent="center" >
                        <Grid item md={2} className={classes.inputIcon}>
                            <VisibilityIcon />
                        </Grid>
                        <Grid item xs={12} md={10} className={classes.textOverflow}>
                            <Typography variant="caption" >Views</Typography>
                            <Typography variant="body1">{ loading ? "Loading..." : link?.clicks || "Not Found"}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.input}>
                    <Grid container spacing={3} alignItems="center" justify="center" alignContent="center" >
                        <Grid item xs={12} md={6}>
                            <Button type="button" variant="contained" color="primary" className={classes.input} onClick={handleCopy}>
                                <FilterNoneIcon />&nbsp;Copy Link
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ShowPage;