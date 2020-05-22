import { Notification } from "../models";

/*  ===============================
 *  -- NOTIFICATIONS Service --
 *  ===============================
 */

export class NotificationsService {

    
    async saveNotification(notification: any){
        try {
            await Notification.create(notification);
            return "Success";
        } catch (error) {
            throw(error);
        }
    }

    async orderStatus(partyId, status, orderId, partyRoom){
        try {
            var notification = await Notification.find({
                'userId': partyId
            });


            if (!notification){
                let notification = await Notification.create({
                    userId: partyId,
                    content: `Your Order ${orderId} is ${status}`,
                    room: partyRoom
                });
                console.log(notification);
            }
            else{
                await Notification.findOneAndUpdate({
                    userId: partyId
                }, {
                    $set: {
                        content: `Your Order ${orderId} is ${status}`
                    }
                });
            }
        } catch (error) {
            throw(error);
        }
    }
    

    async getUnread(userId){
        try {
            const notifications = await Notification.find({
                userId: userId
            },{
                $and: [{
                    read: false
                }]
            });
        } catch (error) {
            throw(error);
        }
    }


    async getRead(userId){
        try {
            const notifications = await Notification.find({
                userId: userId
            },{
                $and: [{
                    read: true
                }]
            });
        } catch (error) {
            throw(error);
        }
    }


    async getOpenOrder(warehouseRoom: string){
        try {
            const notifications = await Notification.find({
                room: warehouseRoom,
                content: 'There is a new open order in your area!'
            });
            return notifications;
        } catch (error) {
            console.log(error);
        }
    }

}
