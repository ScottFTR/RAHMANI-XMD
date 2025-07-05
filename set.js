




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSURURzdQZ3J4QTVaMmNJdXRyQlhqWXRlMVVnbTgrMmdhS1FSNjBZdG1Faz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQjdMdm1aMTA4YjNyUlUyL1FKSUtyKzYwcEFES3JNZkhIQ3V2SlNzVld6UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSHRzY1hrWGZpT2ZzSjBWZ1NBZzFPTnlZWEFWOUk5eW1lRUlIUm1IVldrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTExUNXNkQTd2RU9JckJsSkFDcDhSZ3NZdEovc3EwRW9OcWdUN21EUmlFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVJbnd2aDdmSENnQUtoQkxpb25CZ3pRaE5vcEFmejNOVkZIdlhmN2pTM2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBpeWFuN1ZFbkM4b2FQVjdBeU4zeFpkTE8zVDNkY3FtVTdHRDJidW5TRDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkVabEVwakgzU2tkOVZWUFdiUTNtcnQra0ZTVzFSbzNkWE00ZXpvZ3QxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGNZR0lyc1ZSQTVweGJ4bWhWRGVQQW9vRnRqcnh4Q3BRdzZuUnUyZDdUdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdZVk5RRmZ5ditMRmNWb1JRSUZBc1p1WDE3UVFNWjZRdW0yMXJJSVdpQjVZQnFUTitnem9PeGU5K1JYdjhQZnIrOS9HZERoV3hUY0lucGpMZVpGbWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM3LCJhZHZTZWNyZXRLZXkiOiJibi9WeUFQYjNBTUhhbFl2eEcvZkd3NUJBeDIvSlprYjMyNzJUZkM4SFBzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYyOTMwODE1NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0OERBMTY1QjZBNzg4RjI5RUQ3RERGMzE1MzYwNTdFNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxNzE1Mjc3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2MjkzMDgxNTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDJDQURGQTkzQjAxNEM0RTVDRDkyMjlBNEIxMUJFMjUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTcxNTI3OH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiQkZQRTNOU1QiLCJtZSI6eyJpZCI6IjI1NTYyOTMwODE1NDoxNUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEyNjAzNjQ1Mjg5Njg2NDoxNUBsaWQiLCJuYW1lIjoiQWxseSBTY290dCAzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLWGU4cnNDRUxXYnBNTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJxZk03NzhHd1NQT1VsRVp2Z3pWRVQ0Wkt3VFRUVURrSVJpbVpGc1VnSWo4PSIsImFjY291bnRTaWduYXR1cmUiOiJXcHNWbmtBNmFpNldsa0FRSWRkQVlVNmsrRjRIbHZuUnpkVW1vb2ljcWlncklwL1lxM0tJOU0rejVPUG0vMDZiUmExSEZUTUZ6bU5YMmJVNXNTOW9CZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSW9TOHQ4N0puMGRyZDVmNzdSdzAwZVYwdkIrQVJROTZyaHJvRmJDQVRjc2MwcVVNdVB2SmZTZklvM3BxeHlSYU04a3FzWFp4ZFJyWHNyRXdEYjlUalE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2MjkzMDgxNTQ6MTVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYW56TysvQnNFanpsSlJHYjRNMVJFK0dTc0UwMDFBNUNFWXBtUmJGSUNJLyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxNzE1MjY3LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUtMSyJ9',
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
