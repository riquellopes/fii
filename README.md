# API fundo imobiliário - FII.
Para curte o mercado financeiro, em especial [FII](http://www.bmfbovespa.com.br/Fundos-Listados/FundosListados.aspx?tipoFundo=imobiliario&idioma=pt-br) tem uma enorme dificuldade para saber quanto vai receber de proventos. Resolvi juntas o útil ao agradável estudar um pouco mas sobre [Nodejs](https://nodejs.org) e procurar bons sites com conteúdo gratuíto. Acabei criando um api muitos simples, entrega as o valor de todos os proventos que vão ser pagos.

### Como funciona?
Existe um [Makefile](https://en.wikipedia.org/wiki/Makefile) com comandos básicos ainda, **_make run_** e **_make test_**. Você precisa ter o [Nodejs](https://nodejs.org) instalado na sua máquina. Após clonar o projeto basta executar comando abaixo:
```shell
npm install
make test
make run
```
### Observações:
O app está rodando na porta 5000. Eu estou usando o [dotenv](https://www.npmjs.com/package/dotenv) nesse projeto, então antes de você começar a executar, você precisa criar 2 arquivos que estão no .gitignore o .env e o .env.test, eles vão possuir as informações que devem ser utilizadas para que o [mogoose](http://mongoosejs.com) se connecte ao [mongodb](https://www.mongodb.org) da sua máquina, e a url do site que você vai [crawlear](https://pt.wikipedia.org/wiki/Web_crawler), que nesse projeto é o http://fiis.com.br/resumo.

### Dica:
Se você não tem [mongodb]((https://www.mongodb.org) na sua máquina, ou não quer perder tempo instalando, existe um serviço free é muito legal, o [mongolab](https://mongolab.com).
