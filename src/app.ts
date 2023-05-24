import errorHandler from "./utils/errorHandler";
import taskRoutes from './routes/taskRoutes';
import authMiddleware from "./utils/authMiddleware";
import JwtService from "./services/JwtService";
import AuthController from "./controllers/AuthController";
import {checkDatabase} from "./config/check";

const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use('/api', authMiddleware, taskRoutes);
app.use(errorHandler);

const jwtService = new JwtService(process.env.JWT_SECRET as string);
const authController = new AuthController(jwtService);

app.post("/login", authController.login.bind(authController));

checkDatabase()
    .then(() => {
        app.listen(port, async () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch(() => {
        console.error("Server can't start. Check README.md for more information.");
    });

