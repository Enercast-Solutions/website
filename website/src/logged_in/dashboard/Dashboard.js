import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Auth } from 'aws-amplify';
import EnercastSolutionsAPI from '../../shared/API';
import { loadUserFromCache } from '../../shared/auth';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.common.white
    },
    title: {
        fontSize: 56
    },
    card: {
        marginTop: theme.spacing(2),
        background: 'linear-gradient(to right top, #98C1D9, #E0FBFC)'
    },
    profile: {
        fontSize: 18
    },
    username: {
        marginTop: theme.spacing(3)
    },
    position: {
        marginTop: theme.spacing(1)
    },
    noDecoration: {
        textDecoration: "none !important",
        color: theme.palette.common.black
    },
});

function Dashboard(props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState(null);

    async function loadUserFromAmplify() {
        if (!profile) {
            const profileInfo = await Auth.currentUserInfo();
            setProfile(profileInfo);
        }
    }

    async function loadUserInfo() {
        const api = new EnercastSolutionsAPI(await loadUserFromCache());
        api.getUser()
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUser(data["user"]);

                setLoading(false);
            })
            .catch((e) => {
                console.log(e);

                setLoading(false);
            });
    }

    if (loading) {
        loadUserInfo();
        loadUserFromAmplify();
    }

    try {
        var renderedList = user["energy_consumption_predictions"].map((item) => {
            return (
                <TableRow key={item["prediction_parameters"]["event_name"]}>
                    <TableCell>
                        {item["prediction_parameters"]["event_name"]}
                    </TableCell>
                    <TableCell>
                        {item["prediction_results"]["energy_consumption_kwh"].split(".")[0]}
                    </TableCell>
                </TableRow>
            );
        });

        renderedList = renderedList.slice(0, 5);
    } catch {
    }

    return (
        <div className={props.classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={props.classes.title}>
                        Dashboard {loading && <CircularProgress color="white" />}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Link
                        key="profile_link"
                        to={"/c/profile"}
                        className={props.classes.noDecoration}
                    >
                        <Card className={props.classes.card}>
                            <CardContent>
                                <Typography className={props.classes.profile}>
                                    PROFILE
                                </Typography>

                                {profile && (
                                    <>
                                        <Typography className={props.classes.username}>
                                            Username: {profile.attributes.email}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Link>

                    <Link
                        key="logs_link"
                        to={"/c/logs"}
                        className={props.classes.noDecoration}
                    >
                        <Card className={props.classes.card}>
                            <CardContent>
                                <Typography className={props.classes.profile}>
                                    PAST PREDICTIONS
                                </Typography>

                                <TableContainer>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Event Name</TableCell>
                                                <TableCell>kWh</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {renderedList}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>

                <Grid item xs={6}>
                    <Link
                        key="eventspace_link"
                        to={"/c/profile"}
                        className={props.classes.noDecoration}
                    >
                        <Card className={props.classes.card}>
                            <CardContent>
                                <Typography className={props.classes.profile}>
                                    EVENT SPACE
                                </Typography>

                                {user && user["cc_info"] && (
                                    <>
                                        <Typography className={props.classes.username}>
                                            Name: {user["cc_info"]["name"]}
                                        </Typography>

                                        <Typography className={props.classes.username}>
                                            SQ Footage: {user["cc_info"]["sq_footage"]}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Dashboard);
