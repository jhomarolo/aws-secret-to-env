const dotenv = require('dotenv')

module.exports = (envFile='.env.example')=>{
  return dotenv.config(envFile)
}