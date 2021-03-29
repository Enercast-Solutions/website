import React from "react";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import PropsRoute from "../shared/PropsRoute";
import Home from './Home';

const styles = theme => ({
    wrapper: {
        width: "auto"
    }
});

function Routing(props) {
    const {
        classes
    } = props;

    return (
        <div className={classes.wrapper}>
            <Switch>
                <PropsRoute
                    path="/"
                    component={Home}
                />
            </Switch>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Routing);
