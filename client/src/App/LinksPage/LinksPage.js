import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';

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
    input: {
        width: "100%",
        padding: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}));

function LinksPage() {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.post("/api/getLinks")
            .then(res => {
                var data = res.data;
                if (data.status === "success") {
                    console.log(data);
                    setLinks(data.links);
                }
                setLoading(false);
            });
    }, [])

    return (
        <Paper className={classes.root} elevation={3}>
            <TableContainer>
                {loading ? "Loading..." :
                    <Table className={classes.table} aria-label="Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Long Url</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {links.map(link => (
                                <TableRow key={link._id}>
                                    <TableCell component="th" scope="row">
                                        {link.longUrl}
                                    </TableCell>
                                    <TableCell>
                                        <Link component={RouterLink} to={"/show/" + link.shortUrl} color="inherit">View</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </TableContainer>
        </Paper >
    );
}

export default LinksPage;