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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

function CreatePrediction(props) {
    const [name, setName] = useState(null);
    const [forecastedAttendance, setForecastedAttendance] = useState(null);
    const [sqFt, setSqFt] = useState(null);
    const [specializedEquipment, setSpecializedEquipment] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numSetupDays, setNumSetupDays] = useState(null);
    const [numTeardownDays, setNumTeardownDays] = useState(null);
    const [loading, setLoading] = useState(false);

    const [predictedConsumption, setPredictedConsumption] = useState(null);
    const [predictedCost, setPredictedCost] = useState(null);

    async function createNewPrediction() {
        setLoading(true);

        const api = new EnercastSolutionsAPI(await loadUserFromCache());
        api.createPrediction(name, forecastedAttendance, sqFt, specializedEquipment, format(startDate, "yyyy-MM-dd"), format(endDate, "yyyy-MM-dd"), numSetupDays, numTeardownDays)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPredictedConsumption(data["energy_consumption_kwh"]);
                // TODO: Integration predictedCost once we update the model

                setLoading(false);
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
                        Energy Prediction Tool
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Card className={props.classes.card}>
                        <CardContent>
                            <form noValidate autoComplete="off">
                                <Grid container spacing={3}>
                                    <Grid item xs={5}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="event-name"
                                                variant="outlined"
                                                label="Event Name"
                                                fullWidth
                                                onChange={(event) => setName(event.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12} className={props.classes.inputPadTop}>
                                            <TextField
                                                id="sq-ft"
                                                variant="outlined"
                                                label="Sqare Footage Utilized"
                                                fullWidth
                                                onChange={(event) => setSqFt(event.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12} className={props.classes.inputPadTop}>
                                            <TextField
                                                id="forecasted-attendance"
                                                variant="outlined"
                                                label="Forecasted Attendance"
                                                fullWidth
                                                onChange={(event) => setForecastedAttendance(event.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12} className={props.classes.inputPadTop}>
                                            <TextField
                                                id="num-setup-days"
                                                variant="outlined"
                                                label="Number of Setup days"
                                                fullWidth
                                                onChange={(event) => setNumSetupDays(event.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12} className={props.classes.inputPadTop}>
                                            <TextField
                                                id="num-teardown-days"
                                                variant="outlined"
                                                label="Number of Teardown days"
                                                fullWidth
                                                onChange={(event) => setNumTeardownDays(event.target.value)}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={1} />

                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="specialized-equipment-label">Utilizing specialized Equipment?</InputLabel>
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

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="start-date"
                                                label="Start Date"
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
                                                label="End Date"
                                                format="MM/dd/yyyy"
                                                value={endDate}
                                                onChange={(date) => {setEndDate(date);}}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={createNewPrediction}
                                            className={props.classes.submitButton}
                                        >
                                            {loading && <CircularProgress color="white" />} Create Prediction
                                        </Button>

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
