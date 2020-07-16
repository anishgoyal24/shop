require('dotenv').config()

const accountSid = 'AC7f40830a92a2c5bba038905c66e861aa'
const authToken = 'd0c13c3a1a88d13d25bbd24f69929f1f'

const client = require('twilio')(accountSid, authToken);


export class SmsService{


    // Send new password on SMS
    async forgotPassword(phone: string, password: string){
        client.messages.create({
            to: phone,
            from: process.env.TWILIO_FROM,
            body: `The new password for you amasia.in account is ${password}.`
        }).then((message)=>{
            console.log(message);
            return message;
        }).catch((err)=>{
            throw(err);
        })
    }



}