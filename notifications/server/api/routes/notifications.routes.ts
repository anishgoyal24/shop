import express from 'express';
import { NotificationsController } from '../controllers'

const routes = express.Router();
const notificationFunctions = new NotificationsController();

//This route is responsible for fetching the latest first 5 read notifications
routes.get('/read', notificationFunctions.getRead);

//This route is responsible for fetching the latest first 5 un-read notifications
routes.get('/unread', notificationFunctions.getUnread);

//This function is responsible for fetching the marking the notifications to read
routes.post('/mark-read', notificationFunctions.markRead);

export { routes as notificationRoutes };