import mongoose from 'mongoose';

const { Schema } = mongoose;

const NotificationSchema = new Schema({
    userId: {
        type: String,
        required: false
    }, 

    room: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true
    },

    read: {
        type: Boolean,
        default: false
    },

    pincode: {
        type: String,
        required: false
    }
});

const Notification = mongoose.model('Notification', NotificationSchema);

export { Notification }
