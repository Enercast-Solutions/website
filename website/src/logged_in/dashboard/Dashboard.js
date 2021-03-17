import React from 'react';
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
    // TODO: Pull data from the API
    var listItems = [
        ["1", "4,235.36 kWh", "$5000.00"],
        ["2", "4,235.36 kWh", "$5000.00"],
        ["3", "4,235.36 kWh", "$5000.00"],
        ["4", "4,235.36 kWh", "$5000.00"],
        ["5", "13,235.36 kWh", "$5000.00"],
        ["6", "4,235.36 kWh", "$5000.00"],
        ["7", "4,235.36 kWh", "$5000.00"]
    ];
    var renderedList = listItems.map((item) => {
        return (
            <ListItem>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        {item[0]}
                    </Grid>

                    <Grid item xs={4}>
                        {item[1]}
                    </Grid>

                    <Grid item xs={4}>
                        {item[2]}
                    </Grid>
                </Grid>
            </ListItem>
        );
    });

    return (
        <div className={props.classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={props.classes.title}>
                        Dashboard
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Card className={props.classes.card}>
                        <CardContent>
                            <Typography className={props.classes.profile}>
                                PROFILE
                            </Typography>

                            <Typography className={props.classes.username}>
                                TODO: username
                            </Typography>

                            <Typography className={props.classes.position}>
                                TODO: position
                            </Typography>
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

                            <Typography className={props.classes.username}>
                                Georgia World Conference Center
                            </Typography>

                            <Typography className={props.classes.username}>
                                Location: Atlanta, Georgia
                            </Typography>

                            <Typography className={props.classes.username}>
                                SQ Footage: 1.5 million
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Dashboard);
