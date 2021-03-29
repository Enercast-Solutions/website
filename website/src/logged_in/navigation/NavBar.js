import React, { Fragment, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from 'aws-amplify';
import classNames from "classnames";
import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Hidden,
    Tooltip,
    Box,
    withStyles
} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableTemporaryDrawer from './Drawer';
import Image from "../../assets/logo_navbar_middle.png";

const styles = theme => ({
    appBar: {
        boxShadow: theme.shadows[6],
        backgroundColor: "#ffffff",
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            marginLeft: 0
        }
    },
    appBarToolbar: {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },
        [theme.breakpoints.up("md")]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3)
        },
        [theme.breakpoints.up("lg")]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4)
        }
    },
    drawerPaper: {
        height: "100%vh",
        whiteSpace: "nowrap",
        border: 0,
        width: theme.spacing(7),
        overflowX: "hidden",
        marginTop: theme.spacing(8),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        },
        backgroundColor: theme.palette.common.black
    },
    smBordered: {
        [theme.breakpoints.down("xs")]: {
            borderRadius: "50% !important"
        }
    },
    iconListItem: {
        width: "auto",
        borderRadius: theme.shape.borderRadius,
        paddingTop: 11,
        paddingBottom: 11,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    mobileItemSelected: {
        backgroundColor: `${theme.palette.primary.main} !important`
    },
    username: {
      paddingLeft: 0,
      paddingRight: theme.spacing(2),
      color: theme.palette.common.white
    },
    justifyCenter: {
        justifyContent: "center"
    },
    permanentDrawerListItem: {
        justifyContent: "center",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    cover: {
        width: "25%",
        height: "25%"
    },
    menu: {
        color: theme.palette.common.white
    },
    noDecoration: {
        textDecoration: "none !important",
        color: theme.palette.common.black
    },
    primaryColorDecoration: {
        textDecoration: "none !important",
        color: theme.palette.primary
    }
});

function NavBar(props) {
    async function signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <Fragment>
            <AppBar position="sticky" className={props.classes.appBar}>
                <Toolbar className={props.classes.appBarToolbar}>
                    <SwipeableTemporaryDrawer />

                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        width="100%"
                    >
                        <CardMedia
                            component="img"
                            className={props.classes.cover}
                            src={Image}
                        />
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        width="100%"
                    >
                        <ListItem
                            disableGutters
                            className={classNames(props.classes.iconListItem, props.classes.smBordered)}
                        >
                            <Link
                                key={"home"}
                                to={"/"}
                                className={props.classes.noDecoration}
                                onClick={signOut}
                            >
                                <MenuItem>Log Out</MenuItem>
                            </Link>
                        </ListItem>
                    </Box>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

export default withStyles(styles, { withTheme: true })(NavBar);
