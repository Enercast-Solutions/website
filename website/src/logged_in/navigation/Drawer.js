import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const styles = theme => ({
    list: {
        width: 225,
    },
    fullList: {
        width: 'auto',
    },
    noDecoration: {
        textDecoration: "none !important",
        color: theme.palette.common.black
    },
});

function SwipeableTemporaryDrawer(props) {
    const [open, setOpen] = React.useState(false);

    const list = (anchor) => (
        <div
            role="presentation"
            onClick={() => {setOpen(!open)}}
            onKeyDown={() => {setOpen(!open)}}
        >
            <List className={props.classes.list}>
                <Link
                    key="dashboard_link"
                    to={"/c/dashboard"}
                    className={props.classes.noDecoration}
                >
                    <ListItem
                        button
                        key="dashboard"
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Dashboard"
                        />
                    </ListItem>
                </Link>

                <Link
                    key="create_prediction_link"
                    to={"/c/prediction_tool"}
                    className={props.classes.noDecoration}
                >
                    <ListItem
                        button
                        key="create_prediction"
                    >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Create Prediction"
                        />
                    </ListItem>
                </Link>

                <Link
                    key="logs_link"
                    to={"/c/logs"}
                    className={props.classes.noDecoration}
                >
                    <ListItem
                        button
                        key="logs"
                    >
                        <ListItemIcon>
                            <HistoryIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Past Predictions"
                        />
                    </ListItem>
                </Link>
            </List>

            <Divider />

            <List>
                <Link
                    key="profile_link"
                    to={"/c/profile"}
                    className={props.classes.noDecoration}
                >
                    <ListItem
                        button
                        key="profile"
                    >
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Profile"
                        />
                    </ListItem>
                </Link>
            </List>

            <Divider />

            <List>
                <Link
                    key="contact_us_link"
                    to={"/c/contact_us"}
                    className={props.classes.noDecoration}
                >
                    <ListItem
                        button
                        key="contact_us"
                    >
                        <ListItemIcon>
                            <ContactSupportIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Contact Us"
                        />
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key="drawer">
                <IconButton
                    variant="outlined"
                    onClick={() => {setOpen(!open)}}
                    color="secondary"
                >
                    <ArrowForwardIosIcon />
                </IconButton>

                <SwipeableDrawer
                    anchor="drawer"
                    open={open}
                    onClose={() => {setOpen(false)}}
                    onOpen={() => {setOpen(true)}}
                >
                    {list("drawer")}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(SwipeableTemporaryDrawer);
