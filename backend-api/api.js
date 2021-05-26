const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        await next();
    }
});

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("[SERVER] DB connected."))
    .catch(error => console.log(error));

app.use('/api/connect')

app.get('/', async (req, res) => {
    res.json({
        message: "Backend api is live."
    })
})

app.listen(process.env.PORT, () => {
    console.log(`[SERVER] Server started on: ${process.env.PORT}`);
})