import path from 'path';

/**
 * This function is responsible for initilising the development configuration and environment variables
 */
function devConfigInit() {

  // Node Environment
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'

  // Application Port
  process.env.PORT = process.env.PORT || '5000'

  // Application Host
  process.env.HOST = process.env.HOST || '0.0.0.0'

  // Database Url String
  process.env.dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/amasia'

  // Files Uploads Folder
  process.env.FILE_UPLOAD_FOLDER = process.env.FILE_UPLOAD_FOLDER || path.join(__dirname, '../uploads/');

  // Sendgrid Key
  process.env.SENDGRID_KEY = process.env.SENDGRID_KEY || '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'

  // Protocol- 'http' or 'https'
  process.env.PROTOCOL = process.env.PROTOCOL || 'http'

  // Domain
  process.env.DOMAIN = process.env.DOMAIN || 'localhost'

  // Twilio
  process.env.TWILIO_SID = 'AC7f40830a92a2c5bba038905c66e861aa'
  process.env.TWILIO_AUTH = 'd0c13c3a1a88d13d25bbd24f69929f1f'
  process.env.TWILIO_FROM = '+12058786637'

};

export { devConfigInit as developmentConfig }

