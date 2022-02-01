import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import userRoutes from './router'

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

mongoose.connect(config.db_uri);
mongoose.connection.on('open', () => {
    console.log('Database connection for sunny..')
})

app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}`);
})

export default app;
