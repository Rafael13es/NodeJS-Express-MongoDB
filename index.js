const {
    google
} = require('googleapis');
require('dotenv/config');
const {
    OAuth2
} = google.auth;
const oAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);
oAuth2Client.setCredentials({
    refresh_token: process.env.TOKEN
});
const calendar = google.calendar({
    version: 'v3',
    auth: oAuth2Client
});

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes + 45);

const event = {
    sumary: 'Meet with Dave',
    location: 'Random Adress',
    description: 'Meeting with Dave to talk about the client project',
    start: {
        datetime: eventStartTime,
        timeZone: 'America/Denver'
    },
    end: {
        datetime: eventEndTime,
        timeZone: 'America/Denver'
    },
    ColorId: 1
};

calendar.freebusy.query(
    {
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timeZone: 'America/Denver',
            items: [
                {
                    id: 'primary'
                }
            ],
        }
    },
    (err, res) => {
        if(err) return console.log(err);
        
        const eventsArr = res.data.calendars.primary.bussy;
        console.log(eventsArr);

        if(eventsArr.length === 0){
            return calendar.events.insert(
                {
                    id: 'primary',
                    resource: events
                },
                err => {
                    if(err) return console.error(err);

                    return console.log('Calendar Event Created')
                }
            );
        }
        return console.log('sorry im bussy');
    }
);



