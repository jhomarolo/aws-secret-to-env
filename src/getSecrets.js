/* eslint-disable no-console */
const AWS = require('aws-sdk')
  require('dotenv').config({ path: '.env.example' })
  const fs = require('fs')

  // Configura as credenciais da AWS
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: 'sa-east-1',
  })

  const secretsmanager = new AWS.SecretsManager()

  async function getSecrets(env) {
    return new Promise((resolve, reject) => {
      secretsmanager.getSecretValue({ SecretId: env }, function(err, data) {
        if (err) reject(err)
        else resolve(data.SecretString)
      })
    })
  }

  async function generateEnv() {
    try {
      const secrets = await getSecrets(process.env.SVC_NAME)
      const jsonContent = JSON.parse(secrets)
      const envContent = Object.keys(jsonContent).map(key => key + "=" + jsonContent[key]).join("\n")
      fs.writeFileSync('.env', envContent)
    } catch (error) {
      if (error.message.includes('request is expired')){
        console.error("⚠ Falha na autenticação: credenciais expiradas ⚠")
      }else if (error.message.includes('request is invalid')){
        console.error("⚠ Falha na autenticação: credenciais inválidas ⚠")
      }else if (error.message.includes('Missing credentials in config')){
        console.error("⚠ Falha na autenticação: credenciais não preenchidas ⚠")
      }else if (error.message.includes("can't find the specified secret")){
        console.error("⚠ Falha na autenticação: secret não localizada, verifique o nome do serviço. ⚠")
      }
    }
  }

  module.exports = generateEnv
