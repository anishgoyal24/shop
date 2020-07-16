import { Response, Request, NextFunction } from "express";
import { sendErr } from "../../utils/sendError";
import { SmsService } from '../service'


// Creating Service class in order to build wrapper class
const smsService = new SmsService()


export class SmsController{


    /**
     * Function to send user their new password
     * @param req 
     * @param res 
     * @param next 
     */
    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            
            const { phone, password } = req.body;

            // Call service function
            const response = await smsService.forgotPassword(phone, password);

            // Send status 200 response
            return res.status(200).json({
                message: response
            });

        } catch (error) {
            // Error Handling
            return sendErr(res, new Error(error), 'Internal Server Error!', 500);
        }

    }

}