import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\] \((https?:\/\/[^s?#.].[^\s]*)\)/gm; /*aqui é o código apra repartir*/
    // const capturas = texto.match(regex) /*esta constante vai fazer uma combinação do texto com o código para repartir somente os links*/
    const capturas = [...texto.matchAll(regex) ]/*função acessada do regex pelo "." chamada de exec que separa o texto em grupos*/
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]})); /*remapeamos as capturas para elas aparecerem como um array de chave e valor, com a chave ficando dentro de colchetes e para diferenciar as chaves de função para chaves de objeto englobamos tudo entre parenteses*/
    return resultados.length !== 0 ? resultados : 'Não existem links neste texto'; /*dar um retorno para ser utilizada fora da função, e colocamos um condicional ternário para conferir se realmente existe algum link para retornar*/
}

function trataErro(erro){
    throw new Error(chalk.red(erro.code, 'não há arquivos no diretório'));
}

async function pegaArquivo(caminhoDoArquivo){
    try{
        const encoding = 'utf-8';
        const resposta = await fs.promises.readFile(caminhoDoArquivo, encoding); 
        return extraiLinks(resposta);
    } 
    catch(erro){
        trataErro(erro);
    }
}

export default pegaArquivo;
