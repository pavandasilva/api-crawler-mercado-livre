# Mercado Livre Crawler | API

## Descrição:

API responsável por servir dados de produtos do Mercado Livre

## Iniciando

### Instalando

### Windows, Linux e MacOS

Faça o clone desse projeto pelo git

```
git clone https://github.com/pavandasilva/api-crawler-mercado-livre.git
```

- Crie as branch master e develop

```
> git checkout -b master
> git pull origin master

> git checkout -b develop
> git pull origin develop
```

### Configurando

Crie o arquivo env.development dentro da pasta .env e preecha-o com as configurações necessárias usando .env.example como exemplo.

Execute os seguintes comandos:

```
> npm install ou yarn

```

### Rodando em ambiente de desenvolvimento

```
> yarn dev
```

### Rodando os teste automatizados

```
> yarn test
```

### Acessando a api

A rota health traz informações sobre o servidor

```
localhost:'porta-configurada no .env.development/health'
localhost:3000/health
```

## Autor(res)

- **Rogério Pavan - rogerio_pavan@hotmail.com**
