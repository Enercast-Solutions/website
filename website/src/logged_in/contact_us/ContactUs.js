import React from 'react';
import { useState } from 'react';
import { withStyles, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import EnercastSolutionsAPI from '../../shared/API';
import { loadUserFromCache } from '../../shared/auth';


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.common.white
    },
    title: {
        fontSize: 56
    },
    predictedConsumptionText: {
        fontSize: 28
    },
    card: {
        marginTop: theme.spacing(2),
        background: "#F2F2F2"
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
    inputPadTop: {
        marginTop: theme.spacing(3)
    },
    submitButton: {
        marginTop: theme.spacing(3),
        minWidth: 240,
    },
    datePicker: {
        marginRight: theme.spacing(3)
    }
});

function ContactUs(props) {
    const [subject, setSubject] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function submitContactUs() {
        setLoading(true);

        const api = new EnercastSolutionsAPI(await loadUserFromCache());
        api.submitContactUs(subject, message)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);

                setLoading(false);
            });
    }

    return (
        <div className={props.classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={props.classes.title}>
                        Contact Us
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Card className={props.classes.card}>
                        <CardContent>
                            <form noValidate autoComplete="off">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="subject"
                                            variant="outlined"
                                            label="Subject"
                                            fullWidth
                                            onChange={(event) => setSubject(event.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            id="message"
                                            variant="outlined"
                                            label="Message"
                                            multiline={true}
                                            fullWidth
                                            onChange={(event) => setMessage(event.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                            alignItems="center"
                                            width="100%"
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={submitContactUs}
                                                className={props.classes.submitButton}
                                            >
                                                {loading && <CircularProgress color="white" />} {submitted ? "Successfully Submitted" : "Submit"}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(ContactUs);
