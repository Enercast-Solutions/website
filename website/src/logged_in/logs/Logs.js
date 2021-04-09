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
        field: 'minF&B',
        headerName: 'Min F&B Per Contract',
        description: 'F&B Minimum Per Contract',
        sortable: true,
        width: 200,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['F&B Minimum Per Contract']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'area',
        headerName: 'SQFT per Event',
        description: 'SQFT per Event',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['SQFT per Event']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'type',
        headerName: 'Type',
        description: 'Event Type',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['event_type']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'type-account',
        headerName: 'Type-account',
        description: 'Event Type account',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['type_account']}`
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
                return `${params.getValue('prediction_parameters')['total_days']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'isTelecom',
        headerName: 'isTelecom',
        description: 'isTelecom',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['is_telecom']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'isAudio',
        headerName: 'isAudio',
        description: 'isAudio',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['is_audio']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'eventDaynumber',
        headerName: 'EventDayNumber',
        description: 'EventDayNumber',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['event_daynumber']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'isWeekend',
        headerName: 'isWeekend',
        description: 'isWeekend',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['is_weekend']}`
            } catch (error) {
                return '';
            }
        }
    },
    {
        field: 'dayOfyear',
        headerName: 'DayofYear',
        description: 'DayofYear',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['day_of_Year']}`
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
    {
        field: 'totalCost',
        headerName: 'Total Cost (USD)',
        description: 'Total Cost (USD)',
        sortable: true,
        width: 175,
        valueGetter: (params) => {
            try {
                return `${params.getValue('prediction_parameters')['total_cost']}`
            } catch (error) {
                return '';
            }
        }
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
