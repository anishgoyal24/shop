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
                userId: partyId
            });

            if (!notification){
                await Notification.create({
                    userId: partyId,
                    content: `Your Order ${orderId} is ${status}`,
                    room: partyRoom
                });
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

}
