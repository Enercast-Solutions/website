import '../config.js';

export default class EnercastSolutionsAPI {
    constructor() {
        // TODO: Include user auth here
        //this.user = user;
        //this.jwt = user.signInUserSession.accessToken.jwtToken;
    }

    createPrediction(name, forecastedAttendance, sqFt, specializedEquipment, startDate, endDate, numSetUpDays, numTeardownDays) {
        return fetch(`${global.config.api.baseUrl}/user/submit_prediction`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': 'TODO_ADD_JWT_HERE',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                "prediction_parameters": {
                    "start_date": startDate,
                    "end_date": endDate,
                    "setup_days": numSetUpDays,
                    "teardown_days": numTeardownDays,
                    "sqft": sqFt,
                    "forecast_attendance": forecastedAttendance,
                    "is_audio": specializedEquipment
                }
            })
        });
    }
}
