import { writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import ics from 'ics';

// read agenda
const agenda = JSON.parse(
    await readFile(
        './agenda/agenda.json'
    )
);

// start conversion of sessions in agenda to ics
doConversion();


/**
 * Read session from file agenda.json and convert them to ICS
 */
function doConversion() {
    for (let session in agenda) {
        // some of the properties of a session
        /*
        console.log(agenda[session].title);
        console.log(agenda[session].abstract);
        console.log(agenda[session].language);
        console.log(agenda[session].track);
        console.log(agenda[session].time);
        console.log(agenda[session].duration);
        */
        const event = createICalEntry(agenda[session]);        
        writeEventToIcs(event, agenda[session].id);
    }
}

/**
 * Create iCal data entry from session information
 * @param {*} session object
 */
function createICalEntry(session) {
    const organizer = {
        name: "ABAPConf",
        email: "abapconf@gmail.com"
    };
    const streamUrl = "https://abapconf.org/abapconf2025/" + session.track;

    const hour = Number(session.time.split(':')[0]);
    const minute = Number(session.time.split(':')[1]);
    // calculate end time based on start time and duration
    const endTime = calcEndTime(session);

    // construct event object
    const event = {
        start: [2025, 6, session.day, hour, minute],
        end: [endTime.getFullYear(), endTime.getMonth()+1, endTime.getDate(), endTime.getHours(), endTime.getMinutes()],
        title: session.title,
        description: session.abstract,
        url: streamUrl,
        location: streamUrl,
        busyStatus: 'BUSY',
        status: 'CONFIRMED',
        organizer: { name: organizer. name, email: organizer.email }
    };
    
    return event;
}

/**
 * Calculate end time of a session based on start time and duration
 * @param {*} session 
 * @returns end time as Date
 */
function calcEndTime(session) {

    const year = "2025";
    const month = "06";
    let day = "" + session.day;
    if (session.day < 10) {
        day = "0" + session.day;
    }
    
    let hour = session.time.split(':')[0];
    if (Number(hour) < 10) {
        hour = "0" + hour;
    }
    const minute = session.time.split(':')[1];

    // create Date from start time
    const startTime  = new Date(`${year}-${month}-${day}T${hour}:${minute}`);

    // end time is start time + duration in minutes
    let endTime  = new Date(startTime.getTime() + session.duration * 60000);
    
    console.log(startTime);
    console.log(endTime);
    return endTime;
}

/**
 * Write event data as ICS file
 * 
 * @param {*} event 
 */
function writeEventToIcs(event, sessionId) {

    ics.createEvent(event, (error, value) => {
        if (error) {
            console.log(error);
        }
        console.log("write to file ", sessionId);
        writeFileSync(`./result/${sessionId}.ics`, value);
    });
}
