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
  process.env.dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/saifco'

  // Files Uploads Folder
  process.env.FILE_UPLOAD_FOLDER = process.env.FILE_UPLOAD_FOLDER || path.join(__dirname, '../uploads/');

  // Sendgrid Key
  process.env.SENDGRID_KEY = process.env.SENDGRID_KEY || ''

  // Protocol- 'http' or 'https'
  process.env.PROTOCOL = process.env.PROTOCOL || 'http'

  // Domain
  process.env.DOMAIN = process.env.DOMAIN || 'localhost'

};

export { devConfigInit as developmentConfig }

