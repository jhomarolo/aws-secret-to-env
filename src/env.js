const dotenv = require('dotenv')

module.exports = (envFile)=>{
  return dotenv.config(envFile)
}