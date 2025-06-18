const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVBSRTVoQkw0djNtUm9jSVg2SmFuc3VxYitDNlNUZ2xoNmQ2ZVAwUkhGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaE10SmRIRnF5NjEwZVFnUnMwUGFaU0IzZE41dWlhQ09vaWhTYkdTMGJ5OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTVp6ejlDalZwc1gxS0dQeGNaOThpQlo3YiszMUZ4VHZNQXFrM2JTNm00PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4bzhIUHNvN0ZsOWtNam1TM0Vucm1yWkRnUExNNjRWRklrSWlKckp5bEJrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdHL3lHdlRmUG4zTjZoREpDU0I5Wit5UlJqS1NIblRteE5wSTJSYnlwRmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklOelRUL1dCa1R0eU90QUR3M2YzdmNDMHRkZmo2UHcvaE9KWFZJTS9IeU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0NRWjg2bnhwd3FYVXEyaURmWVBHaXl3MEdHRVVtNCtpWkZNTzFYdDdWbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYWdqMEQ1VnFGK0paQmxLczhiYkpQUDNTV295NWdIakNlUUVhMmkxZS9BQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVZemI2UUtCT0tyWXlGdkNjdFIzNWNyNDF0Z1ZaMThnbmI0aW9vMzhSNGd1ay82aDVRZjRlbDhJb2xsN0lXbCtwVVpKNURqVnlZeXFqcEpCTzQvaEJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ2LCJhZHZTZWNyZXRLZXkiOiJaN01wRzlsU1l6ZlBWV2NxK0lRNlp1R01LK1dsaUMyeWZyWmUycXUxb3pNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4Z1VTVUwzSlNUbUhXbjd3X2RTd1R3IiwicGhvbmVJZCI6IjYyNTc4NmQ2LTdlNDAtNGMxYy1iMDcyLTFiNWVjOThiYzMxMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNWm9WTFZoZE1QL01halJpc0w3M3JicFpUcWs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDl0K3IvVEJPYWtyWUlhdXVZa2w2dUUzMmJnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRPWElDVEVDIiwibWUiOnsiaWQiOiIyNTU2MjE1MTQ2NDU6M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJBbGx5IFNjb3R0IiwibGlkIjoiMjU1MzA2Mzc4NTcxODkzOjNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNNnF5bEFRblBYTHdnWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIySVNFUDVPQW9lczY2YnVhaVBqYnJOb2RtRldmQVgzVThCbHdmOW52TW44PSIsImFjY291bnRTaWduYXR1cmUiOiI1YjloSHRPVS9pQW4wTC9LQkYrRHhjaDVrVEkwN1hObURRa0JXbnVKNXlaWXRRRm5Ya1c1dTZ1MVZVdEFESUdKbnlIYWJpNis1SzdCYXRXWEo1QUdDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZlUwd2xQbDNxK2NPT0JRTmNEVzNmL1RRRGFENU9VVTY2Rld6VG50Z0FWUGdxVzFYYWUyNE5hZWtXWkhCTTcwRGtWOHRHelRPMGdkS3krREo2QW9xQVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2MjE1MTQ2NDU6M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkaUVoRCtUZ0tIck91bTdtb2o0MjZ6YUhaaFZud0Y5MVBBWmNIL1o3ekovIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTAyNjg1ODgsImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDbFYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "rahman md",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "rahman md",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Njabulo-Jb',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/nw8nva.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
