const AWS = require('aws-sdk-mock')
const fs = require('fs')
const path = require('path')
const generateEnv = require('../src/getSecrets') // Supondo que o código fornecido esteja em um arquivo chamado 'generateEnv.js'
const { expect } = require('chai')

describe('generateEnv()', () => {
  afterEach(() => {
    AWS.restore('SecretsManager')
    if (fs.existsSync('.env')) {
      fs.unlinkSync('.env')
    }
  })

  it.skip('Gera arquivo .env corretamente', async () => {
    const secretsMock = {
      TEST_SECRET_KEY: 'test_secret_value'
    }

    AWS.mock('SecretsManager', 'getSecretValue', (params, callback) => {
      callback(null, {
        SecretString: JSON.stringify(secretsMock)
      })
    })

    await generateEnv()

    const envFilePath = path.join(__dirname, '.env')
    expect(fs.existsSync(envFilePath)).to.be.true

    const envContent = fs.readFileSync(envFilePath, 'utf-8')
    const envLines = envContent.split('\n')

    for (const [key, value] of Object.entries(secretsMock)) {
      expect(envLines).to.include(`${key}=${value}`)
    }
  })
})
