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
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import EnercastSolutionsAPI from '../../shared/API';
import { loadUserFromCache } from '../../shared/auth';
import DateFnsUtils from '@date-io/date-fns';
import NumberFormat from 'react-number-format';
import format from 'date-fns/format';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Divider from '@material-ui/core/Divider';

<link ref="stylesheet" type="text/css" href="dist/snackbar.min.css" />;
<script src="dist/snackbar.min.js"></script>;

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
    },
    divider: {
        marginTop: theme.spacing(2)
    }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreatePrediction(props) {
    const [name, setName] = useState(null);
    const [forecastedAttendance, setForecastedAttendance] = useState(null);
    const [sqFt, setSqFt] = useState(null);
    const [specializedEquipment, setSpecializedEquipment] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [setupStartDate, setsetupStartDate] = useState(new Date());
    const [teardownEndDate, setteardownEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [predictedConsumption, setPredictedConsumption] = useState(null);
    const [predictedCostLowerBound, setPredictedCostLowerBound] = useState(null);
    const [predictedCostUpperBound, setPredictedCostUpperBound] = useState(null);
    const [baselineCost, setBaselineCost] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClick = () => {
        setSnackbarOpen(true);
    };

    function datesNotPassValidation() {
        return Math.floor(( Date.parse(`${startDate}`) - Date.parse(`${setupStartDate}`) ) / 86400000) < 0 || Math.floor(( Date.parse(`${endDate}`) - Date.parse(`${setupStartDate}`) ) / 86400000) < 0 || Math.floor(( Date.parse(`${teardownEndDate}`) - Date.parse(`${setupStartDate}`) ) / 86400000) < 0|| Math.floor(( Date.parse(`${endDate}`) - Date.parse(`${startDate}`) ) / 86400000) < 0|| Math.floor(( Date.parse(`${endDate}`) - Date.parse(`${setupStartDate}`) ) / 86400000) < 0||Math.floor(( Date.parse(`${teardownEndDate}`) - Date.parse(`${setupStartDate}`) ) / 86400000) < 0||Math.floor(( Date.parse(`${teardownEndDate}`) - Date.parse(`${startDate}`) ) / 86400000) < 0||Math.floor(( Date.parse(`${teardownEndDate}`) - Date.parse(`${endDate}`) ) / 86400000) < 0;
    }

    async function createNewPrediction() {
        if (datesNotPassValidation()) {
            console.log("ifuckinghatethis");
            setSnackbarOpen(true);
        } else {
            setLoading(true);

            const numSetupDays = Math.floor(( Date.parse(`${startDate}`) - Date.parse(`${setupStartDate}`) ) / 86400000) + 1;
            const numTeardownDays = Math.floor(( Date.parse(`${teardownEndDate}`) - Date.parse(`${endDate}`) ) / 86400000) + 1;

            const api = new EnercastSolutionsAPI(await loadUserFromCache());
            api.createPrediction(name, forecastedAttendance, sqFt, specializedEquipment, format(startDate, "yyyy-MM-dd"), format(endDate, "yyyy-MM-dd"), numSetupDays, numTeardownDays)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setPredictedConsumption(data["energy_consumption_kwh"]);
                    // NOTE: We manually hard code the MAPE here
                    setPredictedCostLowerBound(parseInt(data["energy_consumption_cost"]) * (1 - 0.2881));
                    setPredictedCostUpperBound(parseInt(data["energy_consumption_cost"]) * (1 + 0.2881));
                    setBaselineCost(data["energy_consumption_baseline_cost"]);

                    setLoading(false);
                })
                .catch((e) => {
                    console.log(e);

                    setLoading(false);
                });
        }
    }

    return (
        <div className={props.classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={props.classes.title}>
                        Energy Prediction Tool
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Card className={props.classes.card}>
                        <CardContent>
                            <form noValidate autoComplete="off">
                                <Grid container spacing={3}>
                                    <Grid item xs={5}>
                                        <Grid item xs={12} className={props.classes.inputPadTop}>
                                            <TextField
                                                id="event-name"
                                                variant="outlined"
                                                label="Event Name"

                                                fullWidth
                                                onChange={(event) => setName(event.target.value)}
                                                error={name === "" || name === null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} className={props.classes.inputPadTop}>
                                            <TextField
                                                id="sq-ft"
                                                variant="outlined"
                                                label="Square Footage Utilized"
                                                fullWidth
                                                onChange={(event) => setSqFt(event.target.value.replace(/,/g, ''))}
                                                error={!Number.isFinite(parseInt(sqFt))}
                                                helperText={!Number.isFinite(parseInt(sqFt)) ? 'Square footage must be a number' : ""}
                                            />
                                        </Grid>

                                        <Grid item xs={12} className={props.classes.inputPadTop}>
                                            <TextField
                                                id="forecasted-attendance"
                                                variant="outlined"
                                                label="Forecasted Attendance"
                                                fullWidth
                                                onChange={(event) => setForecastedAttendance(event.target.value.replace(/,/g, ''))}
                                                error={!Number.isFinite(parseInt(forecastedAttendance))}
                                                helperText={!Number.isFinite(parseInt(forecastedAttendance)) ? 'Forecasted attendance must be a number' : ""}
                                            />
                                        </Grid>

                                        <Grid item xs={12} className={props.classes.inputPadTop}>
                                            <FormControl fullWidth >
                                                <InputLabel id="specialized-equipment-label"
                                                >Does this event require additional audiovisual and/or telecom equipment?

                                                </InputLabel>
                                                <Select
                                                    labelId="specialized-equipment-label"
                                                id="specialized-equipment"
                                                value={specializedEquipment}
                                                onChange={(event) => {setSpecializedEquipment(event.target.value);}}
                                                >
                                                    <MenuItem value={1}>Yes</MenuItem>
                                                    <MenuItem value={0}>No</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={1}/>

                                    <Grid item xs={6}>
                                        <Grid item xs={12}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="setup-start-date"
                                                    label="Setup Start Date"
                                                    format="MM/dd/yyyy"
                                                    value={setupStartDate}
                                                    onChange={(date) => {setsetupStartDate(date);}}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    className={props.classes.datePicker}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="start-date"
                                                    label="Event Start Date"
                                                    format="MM/dd/yyyy"
                                                    value={startDate}
                                                    onChange={(date) => {setStartDate(date);}}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    className={props.classes.datePicker}
                                                />

                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="end-date"
                                                    label="Event End Date"
                                                    format="MM/dd/yyyy"
                                                    value={endDate}
                                                    onChange={(date) => {setEndDate(date);}}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="teardown-end-date"
                                                    label="Teardown End Date"
                                                    format="MM/dd/yyyy"
                                                    value={teardownEndDate}
                                                    onChange={(date) => {setteardownEndDate(date);}}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}

                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={createNewPrediction}
                                            className={props.classes.submitButton}
                                        >
                                            {loading && <CircularProgress color="white" />} Create Prediction
                                        </Button>

                                        <Snackbar
                                            open={snackbarOpen}
                                            autoHideDuration={50000}
                                            onClose={() => setSnackbarOpen(false)}
                                        >
                                            <Alert severity="error">
                                                You have form validation errors. Please ensure event start date occurs after setup start date, and teardown end date occurs after event end date.
                                            </Alert>
                                        </Snackbar>

                                        {predictedConsumption && (
                                            <>
                                                <Typography className={props.classes.inputPadTop}>
                                                    Predicted Consumption:
                                                </Typography>

                                                <Typography className={props.classes.predictedConsumptionText}>
                                                    <NumberFormat
                                                        value={predictedConsumption}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        decimalScale={0}
                                                        renderText={formattedValue => <>kWh: {formattedValue}</>}
                                                    />
                                                </Typography>
                                            </>
                                        )}

                                        {predictedCostUpperBound && (
                                            <>
                                                <Typography className={props.classes.inputPadTop}>
                                                    Predicted Cost:
                                                </Typography>

                                                <Typography className={props.classes.predictedConsumptionText}>
                                                    <NumberFormat
                                                        value={predictedCostUpperBound}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        decimalScale={0}
                                                        renderText={formattedValue => <>Upper-bound: ${formattedValue}</>}
                                                    />
                                                </Typography>
                                            </>
                                        )}

                                        {predictedCostLowerBound && (
                                            <>
                                                <Typography className={props.classes.predictedConsumptionText}>
                                                    <NumberFormat
                                                        value={predictedCostLowerBound}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        decimalScale={0}
                                                        renderText={formattedValue => <>Lower-bound: ${formattedValue}</>}
                                                    />
                                                </Typography>
                                            </>
                                        )}

                                        {baselineCost && (
                                            <>
                                                <Typography className={props.classes.inputPadTop}>
                                                    Baseline Cost:
                                                </Typography>

                                                <Typography className={props.classes.predictedConsumptionText}>
                                                    <NumberFormat
                                                        value={baselineCost}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        decimalScale={0}
                                                        renderText={formattedValue => <>Baseline: ${formattedValue}</>}
                                                    />
                                                </Typography>
                                            </>
                                        )}
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

export default withStyles(styles, { withTheme: true })(CreatePrediction);
