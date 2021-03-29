import React from 'react';
import { useState } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
import { loadUserFromCache, getUser } from '../../shared/auth';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.common.white
    },
    title: {
        fontSize: 56
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Profile(props) {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [originalEmail, setOriginalEmail] = useState(null);
    const [email, setEmail] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [verificationCode, setVerificationCode] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function loadUserFromAmplify() {
        if (!email) {
            const profileInfo = await Auth.currentUserInfo();
            setEmail(profileInfo.attributes.email);
            setOriginalEmail(profileInfo.attributes.email);

            setLoading(false);
        }
    }

    async function submitUserInfo() {
        // we don't want to call cognito if the email hasn't changed...
        if (email !== originalEmail) {
            const user = await getUser();

            console.log(user);
            let result = Auth.updateUserAttributes(user, {
                'email': email,
            }).then(data => {
                setDisplayDialog(true);
            }).catch(err => console.log(err));
        }
    }

    async function handleVerificationSubmit() {
        let result = Auth.verifyCurrentUserAttributeSubmit('email', verificationCode)
            .then(data => {
                setDisplayDialog(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    if (loading) {
        loadUserFromAmplify();
    }

    return (
        <div className={props.classes.root}>
            <Dialog
                open={displayDialog}
                onClose={() => setDisplayDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Please Verify Your New Email"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Enter the verification code sent your new email address.
                    </DialogContentText>

                    <TextField
                        id="verification-code"
                        variant="filled"
                        label="Verification Code"
                        value={verificationCode}
                        onChange={(event) => setVerificationCode(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDisplayDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleVerificationSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={props.classes.title}>
                        Profile {loading && <CircularProgress color="white" />}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Paper square>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            aria-label="disabled tabs example"
                        >
                            <Tab label="User Info" />
                            <Tab label="Convention Center Info" />
                        </Tabs>
                    </Paper>

                    <TabPanel value={value} index={0}>
                            <Card className={props.classes.card}>
                                <CardContent>
                                    <form noValidate autoComplete="off">
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="email-address"
                                                    variant="outlined"
                                                    label="Email Address"
                                                    fullWidth
                                                    onChange={(event) => setEmail(event.target.value)}
                                                    value={email}
                                                    InputLabelProps={{ shrink: true }}
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
                                                        onClick={submitUserInfo}
                                                        className={props.classes.submitButton}
                                                    >
                                                        {submitLoading && <CircularProgress color="white" />} Submit
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </CardContent>
                            </Card>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Profile);
