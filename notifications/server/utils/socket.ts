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

        // Party Room
        const partyRoom: string = 'party';

        // Warehouse Room
        const warehouseRoom: string = 'warehouse';

        // Console the present sockets connections
        console.log('New User Connected: %s sockets are connected', globalConnections.length);

        socket.emit('connected', {
            message: 'Successfully Connected to socket!'
        });

        socket.on('joinPartyRoom', ()=>{
            socket.join(partyRoom, ()=>{
                console.log(`Party joined room`);
            })
        })

        socket.on('joinWarehouseRoom', ()=>{
            socket.join(warehouseRoom, ()=>{
                console.log("Warehouse joined room");
            })
        })

        // -| WAREHOUSE NOTIFICATION CENTER |-

        // Order Placed
        socket.on('orderPlace', ({pincode}) => {
            // Send Notification
            socket.broadcast.to(warehouseRoom).emit('openOrder', {
                pincode
            })
        });

        socket.on('orderStatus', ({partyId, status, orderId})=>{
            // Send order status notifications to user
            try {
                notifications.orderStatus(partyId, status, orderId, partyRoom);
            } catch (error) {
                console.log(error);
            }

            // Send notification
            socket.broadcast.to(partyRoom).emit('orderStatus', {
                partyId,
            })
        })

        // Get notifications based on the userId
        socket.on('getNotificationsById', async (userId: string) => {
            
            // Send notification to the user
            await helperFunctions.sendNotificationsFeed(socket, userId, io);
        });

        socket.on('getOpenOrderNotifications', async ()=>{
            await helperFunctions.getOpenOrderNotifications(socket, warehouseRoom);
        })
        
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