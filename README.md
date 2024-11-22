# Generate ICS for sessions from ABAPConf agenda

This is project is to generate an ICS file from the ABAPConf agenda. The ABAPConf agenda.json serves as input. For each session entry, an ICS file with the session information is generated. It takes into consideration the title, abstract, start time, duration and end time. 

## How to use

- Clone this repository: `git clone https://github.com/abapconf/ics-generator`
- Install dependencies with `npm install`
- provide agenda.json file
- Run the script with `node index.js

## Output

The output is a folder called `result`. Inside this folder, there are the ICS files for each session.

Sample folder output: [ABAPConf 2024](https://github.com/abapconf/abapconf.github.io/tree/main/abapconf2024/model/agenda)

## Configuration

THe input is the [agenda.json file from ABAPConf](https://github.com/abapconf/abapconf.github.io/blob/main/abapconf2024/model/agenda.json). Of course, any other agenda that follows the format is also supported. The file name is hard coded and must be agenda.json in the folder agenda.

In function createICalEntry the following static values are used and that must be adjusted accordingly the the event / agenda:

- organizer: name and email
- start: 2004 (year), 12 (month), 5 (day). 

Currently multi day events are not supported. The start date is used for all entries. To handle several days, the workaround would be to run the script several times, changing the event date accordingly.

## Samples

A sample agenda is provided: agenda/agenda.json. 

A sample output generated based on the agenda is in folder result.

Both are live samples from [ABAPConf 2024](https://abapconf.org/abapconf2024/).