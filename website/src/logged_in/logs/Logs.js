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
    field: 'eventName',
    headerName: 'Event',
    description: 'Event Name',
    sortable: true,
    width: 325,
    valueGetter: (params) =>
      `${params.getValue('prediction_parameters')['event_name'] || ''}`,
  },
  {
    field: 'dates',
    headerName: 'Event Dates',
    description: 'Event Start Date - Event End Date',
    sortable: false,
    width: 200,
    valueGetter: (params) => {
        try {
            return `${params.getValue('prediction_parameters')['start_date']} - ${params.getValue('prediction_parameters')['end_date']}`
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
    field: 'cost',
    headerName: 'Cost',
    description: 'Predicted Cost',
    sortable: true,
    width: 150,
    valueGetter: (params) =>
      `\$${params.getValue('prediction_results')['cost'] || ''}`,
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
                />
            </div>
        </div>
    );
}

export default Logs;
