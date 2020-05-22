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
  process.env.dbURL = process.env.dbURL || 'mongodb://mongodb:27017/saifco' || 'mongodb://127.0.0.1:27017/saifco'

  // Files Uploads Folder
  process.env.FILE_UPLOAD_FOLDER = process.env.FILE_UPLOAD_FOLDER ||`${__dirname}/uploads/`

  // Sendgrid Key
  process.env.SENDGRID_KEY = process.env.SENDGRID_KEY || ''


};

export { prodConfigInit as productionConfig } 
