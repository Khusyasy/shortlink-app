import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

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
    }
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h5" className={classes.title}>
                News
            </Typography>
            <List className={classes.navFlex}>
                <ListItem>
                    <Link component={RouterLink} to="/" color="inherit">Home</Link>
                </ListItem>
                <ListItem>
                    <Link component={RouterLink} to="/links" color="inherit">Links</Link>
                </ListItem>
                <ListItem>
                    <Link component={RouterLink} to="/login" color="inherit">Login</Link>
                </ListItem>
            </List>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
