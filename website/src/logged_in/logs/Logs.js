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
import { DataGrid } from '@material-ui/data-grid';

function resolve(path, obj, separator='.') {
    var properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
}

const columns = [
    {
        field: 'dateSubmitted',
        hide: true,
        headerName: 'Date Submitted',
        description: 'Date Submitted',
        sortable: true,
        width: 150,
        valueGetter: (params) =>
            `${params.getValue('time_submitted') || ''}`,
    },
    {
        field: 'eventName',
        headerName: 'Event',
        description: 'Event Name',
        sortable: true,
        width: 450,
        valueGetter: (params) =>
            `${params.getValue('prediction_parameters')['event_name'] || ''}`,
    },
    {
        field: 'startDate',
        headerName: 'Event Start Date',
        description: 'Event Start Date',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['start_date']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'endDate',
        headerName: 'Event End Date',
        description: 'Event End Date',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['end_date']}`
            } catch (error) {
                return '';
            }
        }
    },

    {
        field: 'spaceUsed',
        headerName: 'Square Footage Utilized',
        description: 'Square Footage Utilized',
        sortable: true,
        width: 225,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['SQFT per Event']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'numAttend',
        headerName: 'Forecast Attendence',
        description: 'Forecast Attendence',
        sortable: true,
        width: 225,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['Forecast Attendence']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'totalDays',
        headerName: 'Total Days (In-Out)',
        description: 'Total Days (In-Out)',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue((('prediction_parameters')['endDate'].getTime()-'prediction_parameters')['startDate'].getTime()/(1000 * 3600 * 24))}`
            } catch (error) {
                return '';
            }
        }
    },

    {
        field: 'kwhConsumption',
        headerName: 'kWh',
        description: 'kWh',
        sortable: true,
        width: 150,
        valueGetter: (params) =>
            `${params.getValue('prediction_results')['energy_consumption_kwh'].split(".")[0] || ''}`,
    },

];

function Logs() {
    const [loading, setLoading] = useState(true);
    const [previousPredictions, setPreviousPredictions] = useState([]);

    async function loadProjectInformation(selectedProjectContext, forceReload) {
        const api = new EnercastSolutionsAPI(await loadUserFromCache());
        api.getUser()
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPreviousPredictions(data["user"]["energy_consumption_predictions"]);

                setLoading(false);
            })
            .catch((e) => {
                console.log(e);

                setLoading(false);
            });
    }

    if (loading) {
        loadProjectInformation();
    }

    return (
        <div className='logs'>
            <h1>Previous Predictions {loading && <CircularProgress color="white" />}</h1>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={previousPredictions}
                    columns={columns}
                    pageSize={5}
                    getRowId={(row) => row.ID}
                    sortModel={[
                        {
                            field: 'dateSubmitted',
                            sort: 'desc',
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default Logs;
