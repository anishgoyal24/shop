import express, { Router } from 'express';
import { NotificationsController } from '../controllers'
import { newOrder, cancelOrder, orderInTransit, outForDelivery, newPassword } from '../../utils/sendmail';

const routes = express.Router();
const notificationFunctions = new NotificationsController();

//This route is responsible for fetching the latest first 5 read notifications
routes.get('/read', notificationFunctions.getRead);

//This route is responsible for fetching the latest first 5 un-read notifications
routes.get('/unread', notificationFunctions.getUnread);

// POST - Send mail for the new order to the user
routes.post('/new-order', newOrder)

// POST - Send mail for the cancel order to the user
routes.post('/cancel-order', cancelOrder)

// POST - Send mail
routes.post('/in-transit', orderInTransit)

// POST - Send mail
routes.post('/out-for-delivery', outForDelivery)

// POST - Send OTP
routes.post('/send-otp', notificationFunctions.sendOTP)

// POST - Verify OTP
routes.post('/verify-otp', notificationFunctions.verifyOTP)

// POST - New Password
routes.post('/new-password', newPassword)


export { routes as notificationRoutes };