import pegaArquivo from "./index.js";
import fs from 'fs';
import chalk from "chalk";
import listaValidada from "./http-validacao.js";

const caminho = process.argv; /*process é uma funcionalidade que o node tem de exibir o caminho do arq*/

async function imprimeLista(valida, resultado, identificador = ''){

    if(valida){
        console.log(
            chalk.yellow('lista validada'),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado)); 
    } else {
        console.log(
            chalk.yellow('lista de links'),
            chalk.black.bgGreen(identificador),
            resultado); 
    }
    }

//como a função pegaArquivo é assíncrona tenho q transforma a função q vai emitar no terminal o pegaArquivo em uma função assíncrona tbm

async function processaTexto(argumentos){
    const caminho = argumentos[2]
    const valida = argumentos[3] === '--valida'; /*constante vai me mostrar se é true ou false*/

    try{
        fs.lstatSync(caminho);
    } catch (erro){
        if(erro.code === 'ENOENT'){
            console.log('O arquivo ou diretório não existe!')
            return/*com este return somente o console.log irá ser exibido no console*/
        }
    }

    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(caminho)
        imprimeLista(valida, resultado);
    } else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho); /*readdir comando utilziado para ler o diretório, passando um await por estar dentro de uma função assíncrona e .promisses para a função esperar a ação acontecer antes de conlcuir o funcinamento*/
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo);
        })
    }
}

processaTexto(caminho)