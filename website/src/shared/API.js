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

    submitContactUs(subject, message) {
        return fetch(`${global.config.api.baseUrl}/user/submit_contact_us`, {
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
                "subject": String(subject),
                "message": String(message)
            })
        });
    }

    submitCCInfo(name, sqFootage) {
        return fetch(`${global.config.api.baseUrl}/user/submit_cc_info`, {
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
                "cc_info": {
                    "name": String(name),
                    "sq_footage": String(sqFootage)
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
