import { Response, Request, NextFunction } from "express";
import { NotificationsService } from "../service";
import { sendErr } from "../../utils/sendError";
import { validateId } from "../../utils/helperFunctions";
const otpGen = require("otp-generator");
const otpTool = require("otp-without-db");
const key     = "secretKey"; 
import { sendOTP } from '../../utils/sendmail';
import Axios from "axios";

// Creating Service class in order to build wrapper class
const notificationService = new NotificationsService()

/*  ===============================
 *  -- NOTIFICATIONS CONTROLLERS --
 *  ===============================
 */

export class NotificationsController {

    /**
     * This function is responsible for fetching the latest first 5 read notifications
     * @param userId 
     */
    async getRead(req: Request, res: Response, next: NextFunction) {

        const { userId } = req.body;
        try {

            // Call service function for getRead
            await notificationService.getRead(userId).then(notifications => {
                return res.status(200).json({
                    message: 'Notification successfully retrieved',
                    notifications: notifications
                });
            }).catch(err => {
                return sendErr(res, new Error(err), 'Internal Server Error!', 500);
            });


        } catch (err) {
            // Error Handling
            return sendErr(res, new Error(err), 'Internal Server Error!', 500);
        }
    };

    /**
     * This function is responsible for fetching the latest first 5 un-read notifications
     * @param userId 
     */
    async getUnread(req: Request, res: Response, next: NextFunction) {

        const { userId } = req.body;

        // Validate userId
        if (!validateId(userId)) {
            return sendErr(res, new Error('Invalid ObjectId'), 'The ObjectId you entered is invalid!', 500);
        }
        try {

            // Call service function for getUnread
            await notificationService.getUnread(userId).then(notifications => {
                return res.status(200).json({
                    message: 'Successfully retrieved unread notifications',
                    notifications: notifications
                });
            }).catch(err => {
                return sendErr(res, new Error(err), 'Internal Server Error!', 500);
            })
        } catch (err) {
            // Error Handling
            return sendErr(res, new Error(err), 'Internal Server Error!', 500);
        }
    }

    async sendOTP(req: Request, res: Response, next: NextFunction) {

        try {

            const { user } = req.body;

            let otp = otpGen.generate(6, { upperCase: false, specialChars: false, alphabets: false });

            let hash = otpTool.createNewOTP(user.email, otp, key);

            user.otp = otp;

            sendOTP(user);

            return res.status(200).json({
                message: 'OTP Sent!',
                hash: hash
            });


        } catch (err) {
            // Error Handling
            return sendErr(res, new Error(err), 'Internal Server Error!', 500);
        }
    }

    async verifyOTP(req: Request, res: Response, next: NextFunction) {

        try {

            const { user } = req.body;

            let status = otpTool.verifyOTP(user.email, user.otp , user.hash, key);

            if(status)
                return res.status(200).json({
                    message: 'OTP verified!',
                });
            
            else        
                return res.status(401).json({
                    message: 'Authorization failed',
                });

        } catch (err) {
            // Error Handling
            return sendErr(res, new Error(err), 'Internal Server Error!', 500);
        }
    }
}
