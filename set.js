




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNktINzkxRStBZmVIeXY0d1JrRmZNMk1ES1ZtK3M2ZGJHV2EwZGhpalZtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic3hKZHZ4VWZINzZRVklSUFFaams2TUg0SVhIRUhDeGs3ajArR2tRRUN4WT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLQkt2NXQvS1hlcGlxbzFmcFcrUWdKUmdNdk03V3h1VEFibHlCeXg1eDNrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5M3BSZmNDWkErejZGdFlTNkFTQW1aaS9GTVpxWXlMZWhCNzBTak4rZzFjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVOalNvOXFsbzJCYlJRMzBEVHI5aDRCYXJsZ0xROWV5RlNqaHMxL3pibGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkczN3plVVlHbFlqRXNwTm9XOGJzZDhZSlJkVUZmOThOK2tQMlluazYwR009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVBkSVAzVHZvN2p1QU1PaStZazVxaEVXQTBTcWwyYkNqeU5QYW1jVlBuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk1KQ3lOSXZmaEZPM0xZbGR6OWE4Tko2YzcvQStQeUdvc2tCVENoZDEyaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhMRFd2VUJTbVhjWC81VWxyZDBVemhuZlowYWlISGhwNWpKUWxiZFNiNVgxVlNQZEZ5dHR6OGZ0cGNhVW5OTFUrc3UrTlk5M0VhMnhVenJSNXVkWUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MCwiYWR2U2VjcmV0S2V5IjoiRkx5TE1oUWNrbmQ2QkVUQVlIbW1adWViR2NJU3JrcEEzRVFpRTJhMHpkMD0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2MjkzMDgxNTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzc2MzA3OTRDOTIyN0UzRDFCQzdFNTA5MTQ5RDNGNEUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTc0NzQ0NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NjI5MzA4MTU0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkMyQUE1MUNGRENDRTE4Mzc4MzUzMURFMEUyMzY5RkU2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE3NDc0NDV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjJBMVQ1RkhLIiwibWUiOnsiaWQiOiIyNTU2MjkzMDgxNTQ6MTZAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMjYwMzY0NTI4OTY4NjQ6MTZAbGlkIiwibmFtZSI6IkFsbHkgU2NvdHQgMyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2JlOHJzQ0VPR1dwc01HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicWZNNzc4R3dTUE9VbEVadmd6VkVUNFpLd1RUVFVEa0lSaW1aRnNVZ0lqOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiN0paUndDRDFuOTJlNEhkbk95NVhib2VVMkdsdStXYjBMZUFudisyaWlQcCtuL1pNcVp2UnRuT3d2TkNxU256cnJHVDNKOEswQTlqWitGdmY1NGZZQXc9PSIsImRldmljZVNpZ25hdHVyZSI6IlBMZWhuSWpEdFA0blNJUU1SZlg5TXVmMmk5aWtDRXZHdzZpWTlUTkdqbjdYVTNpYVJBRDhzWlJhWXloaWFOV2k3ZHY5eXVRNE50VXljQVdZRU8yU0N3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjI5MzA4MTU0OjE2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFuek8rL0JzRWp6bEpSR2I0TTFSRStHU3NFMDAxQTVDRVlwbVJiRklDSS8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTc0NzQzOSwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLTE0ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "",
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
