#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require('fs')
const AWS = require('aws-sdk')
require('../src/env')(process.argv[3])
const config = require('../src/config').aws

// Configura as credenciais da AWS
AWS.config.update(config)

  const secretsmanager = new AWS.SecretsManager()

  async function getSecrets(secretFile) {
    return new Promise((resolve, reject) => {
      secretsmanager.getSecretValue({ SecretId: secretFile }, function(err, data) {
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
      }else if (error.message.includes("'SecretId' in params")){
        console.error("⚠ Falha na autenticação: SVC_NAME é obrigatório. ⚠")
      }
    }
  }

generateEnv()
