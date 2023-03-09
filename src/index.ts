import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './user/user.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/db_test';

console.log(`Connecting to MongoDB: ${mongoUrl}`);
console.log(`docker env ${process.env.MONGO_URI}`);

mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log(`Connected to MongoDB: ${mongoUrl}`);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

app.use(bodyParser.json());

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello world!');
});
