const init = () => {
    process.env.NODE_ENV = 'development';
    process.env.PORT = '3000';
    process.env.host = `http://localhost:${process.env.PORT}/`;
    process.env.JWT_KEY = 'thisissecret';
  };
  
  module.exports = { init };
  