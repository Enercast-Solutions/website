import React from 'react';
import { useState } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
    }
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

    async function loadProjectInformation(selectedProjectContext, forceReload) {
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
        loadProjectInformation();
        loadUserFromAmplify();
    }

    try {
        var renderedList = user["energy_consumption_predictions"].map((item) => {
            return (
                <ListItem>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            {item["prediction_parameters"]["event_name"]}
                        </Grid>

                        <Grid item xs={6}>
                            {item["prediction_results"]["energy_consumption_kwh"].split(".")[0]}
                        </Grid>
                    </Grid>
                </ListItem>
            );
        });
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

                    <Card className={props.classes.card}>
                        <CardContent>
                            <Typography className={props.classes.profile}>
                                PAST PREDICTIONS
                            </Typography>

                            <List>
                                {renderedList}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={6}>
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
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Dashboard);
