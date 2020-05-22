import fs from 'fs';
import ejs from 'ejs';
import http from 'axios';
import { NextFunction, Request, Response } from 'express';
import { sendError } from '.';

const generateEmailBody = async (data: any, subject) => {
    try {
        // Pass email data to the template
        const templateStr = fs.readFileSync(`${__dirname}/${subject}.ejs`);
        const body = ejs.render(templateStr.toString(), data);

        return body;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
}

// New Order confirmation email
const newOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { user } = req.body;

        // Generate email data
        const emailData = {
            subject: 'New Order',
            toEmail: user.email,
        };

        const subject = 'newOrder'

        // Generate email body from template
        const emailBody = await generateEmailBody(emailData, subject);

        // Send email
        await sendMail(emailBody, emailData, 'New Order has been placed!');

        // Send status 200 response
        return res.status(200).json({
            message: `New Order email sent!`,
        });

    } catch (err) {
        return sendError(res, err, 'Internal Server Error!', 500);
    }
}

// Cancel Order confirmation email
const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { user } = req.body;

        // Generate email data
        const emailData = {
            subject: 'Cancel Order',
            toEmail: user.email,
        };

        const subject = 'cancelOrder'

        // Generate email body from template
        const emailBody = await generateEmailBody(emailData, subject);

        // Send email
        await sendMail(emailBody, emailData, 'Order has been cancelled!');

        // Send status 200 response
        return res.status(200).json({
            message: `Cancel Order email sent!`,
        });

    } catch (err) {
        return sendError(res, err, 'Internal Server Error!', 500);
    }
}

// Order in transit confirmation email
const orderInTransit = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { user } = req.body;

        // Generate email data
        const emailData = {
            subject: 'Order in transit',
            toEmail: user.email,
        };

        const subject = 'orderInTransit'

        // Generate email body from template
        const emailBody = await generateEmailBody(emailData, subject);

        // Send email
        await sendMail(emailBody, emailData, 'Your order is in transit!');

        // Send status 200 response
        return res.status(200).json({
            message: `Order's transit email sent!`,
        });

    } catch (err) {
        return sendError(res, err, 'Internal Server Error!', 500);
    }
}

const outForDelivery = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { user } = req.body;

        // Generate email data
        const emailData = {
            subject: 'Out for Delivery',
            toEmail: user.email,
        };

        const subject = 'outForDelivery'

        // Generate email body from template
        const emailBody = await generateEmailBody(emailData, subject);

        // Send email
        await sendMail(emailBody, emailData, 'Your order is out for Delivery!');

        // Send status 200 response
        return res.status(200).json({
            message: `Order's out for delivery email sent!`,
        });

    } catch (err) {
        return sendError(res, err, 'Internal Server Error!', 500);
    }
}

const sendMail = async (emailBody: any, emailData: any, subject, scheduled: any = {}) => {
    try {
        // Sendgrid API settings
        const config: any = {
            url: '/v3/mail/send',
            method: 'post',
            baseURL: 'https://api.sendgrid.com',
            port: null,
            transformRequest: [function (data) {
                return JSON.stringify(data);
            }],
            headers: {
                authorization: `Bearer ${process.env.SENDGRID_KEY}`,
                'content-type': 'application/json'
            },
            data: {
                personalizations: [
                    {
                        to: [
                            {
                                email: emailData.toEmail
                            }
                        ],
                        subject: subject
                    }
                ],
                from:
                {
                    email: 'support@saifco.com',
                    name: 'Team Saifco'
                },
                reply_to: {
                    email: emailData.replyToEmail || 'support@saifco.com',
                    name: emailData.replyToName || 'Team Saifco'
                },
                content: [
                    {
                        type: 'text/html',
                        value: emailBody
                    }
                ]
            }
        };
        // Fire the request to sendgrid server, check the reponse
        const res = await http.request(config);

        return res;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
}


export {

    newOrder,
    cancelOrder,
    orderInTransit,
    outForDelivery

}
