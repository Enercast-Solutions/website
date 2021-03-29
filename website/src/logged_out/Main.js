import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Auth } from 'aws-amplify';
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useState } from "react";

const styles = theme => ({
  main: {
      background: 'linear-gradient(16.83deg, #0E68DE 5.48%, #DDB8C6 101.5%, #A01DE3 101.51%), rgba(236, 236, 236, 0.0001)',
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

export default withStyles(styles, { withTheme: true })(Main);
