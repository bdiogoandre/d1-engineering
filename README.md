# d1-engineering

## Cadastro de Usuários .NET Core Web API + Angular + Material + MongoDB
Este projeto é um exemplo de um cadastro básico de usuários.

O objetivo é compartilhar um pouco da experiência acerca do desenvolvimento WEB utilizando novas tecnologias.

### Tecnologias Utilizadas 

* [.NET Core 2.1](https://dotnet.microsoft.com/download)
* [ASP.NET Core 2.1](https://docs.microsoft.com/en-us/aspnet/core)
* [C# for Visual Studio Code 1.21.0](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
* [Angular 8.2](https://angular.io/docs)
* [Angular Flex-Layout](https://github.com/angular/flex-layout)
* [Angular Material](https://material.angular.io/)
* [Atlas](https://www.mongodb.com/cloud/atlas)
* [MongoDB](https://www.mongodb.com/)
* [Typescript 3.5.3](https://www.typescriptlang.org/docs/home.html)
* [HTML](https://www.w3schools.com/html)
* [CSS](https://www.w3schools.com/css)


A API desenvolvida em **ASP.NET Core** já está configurada para acessar um banco de dados de teste no **[Atlas MongoDB](https://www.mongodb.com/cloud/atlas)**, portanto não será necessário instalar o iniciar um banco de dados MongoDB local.

O projeto de **FRONTEND** está separado do projeto de **BACKEND** e as duas aplicações devem ser executadas separadamente através dos passos abaixo.

Faça o clone desse repositório em sua máquina local e realize os procesimentos.

### Como Executar

#### ATRAVÉS DA LINHA DE COMANDO
#### Pré-requisitos

**Instale as ferramentas abaixo**
* [.NET Core SDK](https://aka.ms/dotnet-download)
* [Node.js](https://nodejs.org)
* [Angular CLI](https://cli.angular.io)

#### Passos

1. Abra o diretório **d1-engineering\frontend** na linha de commando e execute **npm run restore**.
* Irá instalar todas as dependências e executar a aplicação Angular.

2. Abra o diretório **d1-engineering\backend** na linha de commando e execute **dotnet run**.
* Irá executar o applicativo de servidor em sua máquina local.

3. Abra <https://localhost:4200> e divirta-se.


#### ATRAVÉS DO VISUAL STUDIO CODE
#### Pré-requisitos

**Instale as ferramentas abaixo**
* [.NET Core SDK](https://aka.ms/dotnet-download)
* [Visual Studio Code](https://code.visualstudio.com)
* [C# Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
* [Node.js](https://nodejs.org)
* [Angular CLI](https://cli.angular.io)

#### Passos

1. Abra o diretório **\frontend** na linha de commando e execute **npm run restore**.
2. Abra o diretório **\backend** no Visual Studio Code.
3. Pressione **F5** ou **CTRL + F5**.
