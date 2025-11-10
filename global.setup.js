// global.setup.js
const { setCredentials } = require("@evinced/js-playwright-sdk");
import dotenv from 'dotenv';
dotenv.config();

async function globalSetup(config) {
    try {
        await setCredentials({
            serviceId: process.env.EVINCED_SERVICE_ID,
            secret: process.env.EVINCED_API_KEY,
        });

        console.log("stop func global")
    } catch (error) {
        console.log("func.error", error)
        throw new Error("Evinced SDK authorization failure.");
    }
}
module.exports = globalSetup;