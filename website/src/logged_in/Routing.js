import React from "react";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import PropsRoute from "../shared/PropsRoute";
import Dashboard from "./dashboard/Dashboard";
import Logs from "./logs/Logs";
import CreatePrediction from "./prediction_tool/CreatePrediction";
import Profile from "./profile/Profile";
import ContactUs from "./contact_us/ContactUs";

const styles = theme => ({
    wrapper: {
        margin: theme.spacing(1),
        width: "auto",
        [theme.breakpoints.up("xs")]: {
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4)
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto"
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "82.5%",
            marginLeft: "auto",
            marginRight: "auto"
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto"
        }
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
                    path="/c/dashboard"
                    component={Dashboard}
                />
                <PropsRoute
                    path="/c/logs"
                    component={Logs}
                />
                <PropsRoute
                    path="/c/prediction_tool"
                    component={CreatePrediction}
                />
                <PropsRoute
                    path="/c/profile"
                    component={Profile}
                />
                <PropsRoute
                    path="/c/contact_us"
                    component={ContactUs}
                />
            </Switch>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Routing);
