[![CD Build](https://github.com/jhomarolo/aws-secret-to-env/actions/workflows/cd.yml/badge.svg?branch=main)](https://github.com/jhomarolo/aws-secret-to-env/actions/workflows/cd.yml)

# aws-secret-to-env

Essa lib JavaScript tem o objetivo de buscar credenciais de acesso armazenadas no serviço da AWS chamado AWS Secrets Manager e gerar um arquivo .env que contém as variáveis de ambiente necessárias para o desenvolvimento de sua aplicação.

### Using

```
    $ npx aws-secret-to-env
```

Quando a lib é chamada utilizando o comando acima, ela lê por padrão o arquivo .env.example do diretório atual, que deve conter as seguintes linhas:

```env
# nome do serviço exatamente como definido na AWS Secrets Manager
SVC_NAME=

# Tokens encontrados em "Command line or programmatic access"
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY_ID=
AWS_SESSION_TOKEN=
```

Estas linhas são lidas para obter as informações necessárias para acessar o AWS Secrets Manager.

Se o desenvolvedor quiser que a biblioteca leia outro arquivo, ele poderá passar como parâmetro na chamada do comando, por exemplo:

```
    $ npx aws-secret-to-env --envFile .env.test
```

Neste caso, a biblioteca lerá o arquivo .env.test em vez do arquivo .env.example.
