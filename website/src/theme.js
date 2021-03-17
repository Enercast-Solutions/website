import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

// colors
const primary = "#05173E";
const secondary = "#4829B2";
const black = "#343a40";
const darkBlack = "rgb(36, 40, 44)";
const background = "#ffffff";
const warningLight = "rgba(253, 200, 69, .3)";
const warningMain = "rgba(253, 200, 69, .5)";
const warningDark = "rgba(253, 200, 69, .7)";
const white = "#ffffff";
const grey = "#9e9e9e";

// border
const borderWidth = 2;
const borderColor = "rgba(0, 0, 0, 0.13)";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

const blue1 = "#05173E";
const blue2 = "#072667";
const blue3 = "#0C3B9F";
const blue4 = "#255BD0";
const blue5 = "#497FF3";
const blue6 = "#A6C1FA";
const blue7 = "#DFE9FF";
const blue8 = "#EEF3FF";

// spacing
const spacing = 8;

const theme = createMuiTheme({
    palette: {
        blue: {
            blue1: blue1,
            blue2: blue2,
            blue3: blue3,
            blue4: blue4,
            blue5: blue5,
            blue6: blue6,
            blue7: blue7
        },
        primary: { main: blue1 },
        secondary: { main: secondary },
        common: {
            black,
            darkBlack,
            white,
            grey
        },
        warning: {
            light: warningLight,
            main: warningMain,
            dark: warningDark
        },
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
        background: {
            default: background
        },
        spacing
    },
    breakpoints: {
        // Define custom breakpoint values.
        // These will apply to Material-UI components that use responsive
        // breakpoints, such as `Grid` and `Hidden`. You can also use the
        // theme breakpoint functions `up`, `down`, and `between` to create
        // media queries for these breakpoints
        values: {
            xl,
            lg,
            md,
            sm,
            xs
        }
    },
    border: {
        borderColor: borderColor,
        borderWidth: borderWidth
    },
    overrides: {
        MuiExpansionPanel: {
            root: {
                position: "static"
            }
        },
        MuiTableCell: {
            root: {
                paddingLeft: spacing * 2,
                paddingRight: spacing * 2,
                borderBottom: `${borderWidth}px solid ${borderColor}`,
                    [`@media (max-width:  ${sm}px)`]: {
                        paddingLeft: spacing,
                        paddingRight: spacing
                    }
            }
        },
        MuiDivider: {
            root: {
                backgroundColor: borderColor,
                height: borderWidth
            }
        },
        MuiPrivateNotchedOutline: {
            root: {
                borderWidth: borderWidth
            }
        },
        MuiListItem: {
            divider: {
                borderBottom: `${borderWidth}px solid ${borderColor}`
            }
        },
        MuiDialog: {
            paper: {
                width: "100%",
                maxWidth: 430,
                marginLeft: spacing,
                marginRight: spacing
            }
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: darkBlack
            }
        },
        MuiExpansionPanelDetails: {
            root: {
                [`@media (max-width:  ${sm}px)`]: {
                    paddingLeft: spacing,
                    paddingRight: spacing
                }
            }
        }
    },
    typography: {
        fontFamily: [
            '"din-2014"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    }
});

export default responsiveFontSizes(theme);
