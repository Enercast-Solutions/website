import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Auth } from 'aws-amplify';
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useState } from "react";

const styles = theme => ({
  main: {
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  }
});

class Main extends PureComponent {

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <NavBar />

                <main className={classNames(classes.main)}>
                    <Routing />
                </main>
            </Fragment>
        );
    }
};

Main.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withAuthenticator(withStyles(styles, { withTheme: true })(Main));
