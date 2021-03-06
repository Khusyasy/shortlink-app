import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    navFlex: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    },
    drawerButton: {
        [theme.breakpoints.up("md")]: {
            display: "none",
        }
    },
    navDrawer: {
        display: 'flex',
        flexDirection: 'column',
        width: '40vw',
        maxWidth: '400px',
        padding: 0,
    }
}));

function ListMenus({ handleCloseDrawer }) {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    return (
        <>
            <ListItem onClick={handleCloseDrawer}>
                <Link component={RouterLink} to="/" color="inherit">Home</Link>
            </ListItem>
            {!cookies.jwt && <>
                <ListItem onClick={handleCloseDrawer}>
                    <Link component={RouterLink} to="/users/login" color="inherit">Login</Link>
                </ListItem>
                <ListItem onClick={handleCloseDrawer}>
                    <Link component={RouterLink} to="/users/register" color="inherit">Register</Link>
                </ListItem>
            </>}
            {cookies.jwt && <>
                <ListItem onClick={handleCloseDrawer}>
                    <Link component={RouterLink} to="/users/logout" color="inherit">Logout</Link>
                </ListItem>
                <ListItem onClick={handleCloseDrawer}>
                    <Link component={RouterLink} to="/users/links" color="inherit">Links</Link>
                </ListItem>
            </>}
        </>
    );
}

function Navbar() {
    const classes = useStyles();

    const [openDrawer, setOpenDrawer] = useState(false);

    const handleOpenDrawer = () => setOpenDrawer(true);
    const handleCloseDrawer = () => setOpenDrawer(false);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Short Link App
                    </Typography>
                    <List className={classes.navFlex}>
                        <ListMenus></ListMenus>
                    </List>
                    <Button className={classes.drawerButton} variant="outlined" color="inherit" onClick={() => setOpenDrawer(true)}>MENU</Button>
                </Toolbar>
                <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
                    <List className={classes.navDrawer}>
                        <ListMenus handleCloseDrawer={handleCloseDrawer}></ListMenus>
                    </List>
                </Drawer>
            </AppBar>
        </div>
    );
}

export default Navbar;
