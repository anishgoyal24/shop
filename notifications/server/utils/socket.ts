import socketIO from 'socket.io';
import { helperFunctions } from '.';
import { NotificationsService } from '../api/service/notification.service';

// Creating notification service class
const notifications = new NotificationsService();

// Maintains the count of all the connected users
const globalConnections = [];

function init(server: any){

    const io: any = socketIO(server);

    /* =================
     * - NOTIFICATIONS -
     * =================
     */

    // Allowing all the origins to connect
    io.set('origins', '*:*');

    // Initiate the connection
    io.sockets.on('connection', (socket: any) => {

        // Push the socket into the array
        globalConnections.push(socket);

        // Console the present sockets connections
        console.log('New User Connected: %s sockets are connected', globalConnections.length);

        socket.emit('connected', {
            message: 'Successfully Connected to socket!'
        });

        // -| WAREHOUSE NOTIFICATION CENTER |-

        // Order Placed
        socket.on('orderPlace', ({pincode}) => {
            // Send Notification
            io.sockets.emit('openOrder', {
                pincode
            })
        });

        // User Role Socket 
        socket.on('userData', (userId: string, userData: Object) => {
            
            // Emit socket with 
            io.sockets.in(userId).emit('userDataUpdate', userData);
        });

        // Get notifications based on the userId
        socket.on('getNotifications', async (userId: string) => {
            
            // Send notification to the user
            await helperFunctions.sendNotificationsFeed(socket, userId, io);
        });
        
        socket.on('disconnect', () => {
            
            // Remove the socket from globalConnection array
            globalConnections.splice(globalConnections.indexOf(socket), 1);

            // Console the present list of of sockets
            console.log('User disconnected: %s sockets connected', globalConnections.length);
        });
    });
};

export {
    init
}