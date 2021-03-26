import '../config.js';

export default class EnercastSolutionsAPI {
    constructor(user) {
        this.user = user;
        this.jwt = user.signInUserSession.accessToken.jwtToken;
    }

    createPrediction(name, forecastedAttendance, sqFt, specializedEquipment, startDate, endDate, numSetUpDays, numTeardownDays) {
        return fetch(`${global.config.api.baseUrl}/user/submit_prediction`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': this.jwt,
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                "prediction_parameters": {
                    "event_name": String(name),
                    "start_date": String(startDate),
                    "end_date": String(endDate),
                    "setup_days": String(numSetUpDays),
                    "teardown_days": String(numTeardownDays),
                    "sqft": String(sqFt),
                    "forecast_attendance": String(forecastedAttendance),
                    "is_audio": String(specializedEquipment)
                }
            })
        });
    }

    getUser() {
        return fetch(`${global.config.api.baseUrl}/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': this.jwt,
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
    }
}