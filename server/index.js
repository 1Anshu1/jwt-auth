import express from 'express';
import dotenv from 'dotenv';

import app from './app.js';
import dbConnect from './config/dbConfig.js';

dotenv.config()

dbConnect();


app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`)
})


