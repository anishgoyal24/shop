import express, { Router } from 'express';
import { SmsController } from '../controllers'

const routes = express.Router();
const smsController = new SmsController();


// POST - This route is responsible to send the user his new password
routes.post('/forgot-password', smsController.forgotPassword);


export { routes as smsRoutes };