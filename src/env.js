const dotenv = require('dotenv')
const path = require('path')

const defaultFile = '.env.example'

module.exports = (envFile=defaultFile)=>{
  const envFileClientPath = path.join(process.cwd(), `./${envFile}`)
  return dotenv.config({path: envFileClientPath})
} 