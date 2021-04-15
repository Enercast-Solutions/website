import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Image from "../assets/logo_homepage.png";
import Footer from "./footer.js";
import {
    Box,
    Typography,
    ListItem,
    MenuItem,
    withStyles
} from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    paddingBottom: theme.spacing(10)
  },
  header: {
    textAlign: "center"
  },
  subheader: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    color: 'white'
  },
  subtext: {
    textAlign: "center",
    marginTop: theme.spacing(4)
  },
  divider: {
    marginTop: theme.spacing(8)
  },
  button: {
    marginTop: theme.spacing(2)
  },
  logoImage: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  noDecoration: {
    textDecoration: "none !important",
    color: theme.palette.common.black
  },
  menuItem: {
    justifyContent: "flex-end"
  }
});


function Home(props) {
    return (
        <Container>
            <div className={props.classes.root}>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="right"
                    width="100%"
                >
                        <Link
                            key={"home"}
                            to={"/c/dashboard"}
                            className={props.classes.noDecoration}
                        >
                            <Button className={props.classes.button}>Login / Sign up</Button>
                        </Link>
                </Box>


                <Grid container justify="center" className={props.classes.logoImage}>
                    <Grid item xs={6}>
                        <CardMedia
                            component="img"
                            src={Image}
                        />
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Typography
                            variant="h2"
                            className={props.classes.header}
                        >
                            Precision. Reliability. Confidence.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            className={props.classes.subtext}
                        >
                            Enercast Solutions is a cloud-based Event Space Energy Prediction Tool that integrates historical energy data with your utility expenses to help improve event profitability and reduce energy costs.
                        </Typography>
                    </Grid>
                </Grid>

                <Divider className={props.classes.divider} />

                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Typography
                            variant="h3"
                            className={props.classes.subheader}
                        >
                            What We Deliver
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Grid item xs={4}>
                        <Typography
                            variant="h4"
                            className={props.classes.subtext}
                        >
                            Business Success
                        </Typography>

                        <Typography
                            variant="h5"
                            className={props.classes.subtext}
                        >
                            We help event spaces operate more profitably by accurately pricing electricity costs for events, avoiding unanticipated expenses
                        </Typography>
                    </Grid>

                    <Grid item xs={2} />

                    <Grid item xs={4}>
                        <Typography
                            variant="h4"
                            className={props.classes.subtext}
                        >
                            Sustainability
                        </Typography>

                        <Typography
                            variant="h5"
                            className={props.classes.subtext}
                        >
                            We help eliminate unnecessary energy usage by minimizing resource waste
                        </Typography>
                    </Grid>
                </Grid>

                <Divider className={props.classes.divider} />

                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Typography
                            variant="h3"
                            className={props.classes.subheader}
                        >
                            About Us
                        </Typography>
                    </Grid>


                </Grid>

                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            className={props.classes.subtext}
                        >
                            Enercast Solutions was founded in January 2021 by 10 students from the Georgia Institute of Technology, who saw a major opportunity in helping convention centers operate more profitably. With our product, no more major losses due to excessive energy usage will be incurred by convention centers and other event spaces. We'll provide precision, reliability, and the confidence you need.
                        </Typography>
                    </Grid>
                </Grid>

             <Footer/>
            </div>
        </Container>
    );
}

export default withStyles(styles, { withTheme: true })(Home);
