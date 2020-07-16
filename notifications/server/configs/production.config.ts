/**
 * This function is responsible for initilising the production configuration and environment variables
 */
function prodConfigInit() {

  // Node Environment
  process.env.NODE_ENV = process.env.NODE_ENV || 'production'

  // Application Port
  process.env.PORT = process.env.PORT ||'5000'

  // Application Host
  process.env.HOST = process.env.HOST ||'0.0.0.0'

  // Jwt Key
  process.env.JWT_KEY = process.env.JWT_KEY

  // Database Url String
  process.env.dbURL = process.env.dbURL || 'mongodb://mongodb:27017/amasia' || 'mongodb://127.0.0.1:27017/amasia'

  // Files Uploads Folder
  process.env.FILE_UPLOAD_FOLDER = process.env.FILE_UPLOAD_FOLDER ||`${__dirname}/uploads/`

  // Sendgrid Key
  process.env.SENDGRID_KEY = process.env.SENDGRID_KEY || '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'

  // Twilio
  process.env.TWILIO_SID = 'AC7f40830a92a2c5bba038905c66e861aa'
  process.env.TWILIO_AUTH = 'd0c13c3a1a88d13d25bbd24f69929f1f'
  process.env.TWILIO_FROM = '+12058786637'


};

export { prodConfigInit as productionConfig } 
