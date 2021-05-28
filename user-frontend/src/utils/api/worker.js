const axios = require('axios');

export async function getGroundSensors() {
    const conn = await axios.get(`${process.env.REACT_APP_APIURL}public/get-sensors`);
    const data = await conn.data;
    return data;
}