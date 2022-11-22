import chalk from "chalk";

function extraiLinks (arrLinks){
    return arrLinks.map((objLink)=> Object.values(objLink).join()) 
    //o map vai fazer o loop dentro do array e entrair para um novo array somente os valores, que seria os links
    //.join() ele transforma os arrays em um só, com todos os links guardados dentro dele
}


async function checaStatus (listaURLs){
    const arrStatus = await Promise.all(
        listaURLs.map(async (url)=>{
            try{
                const response = await fetch(url);
                return response.status; /*para pegar o status dos links, que seriam somente o valor deles*/
            } catch (erro){
                return manejaErros(erro)
            }
        })
    )

    return arrStatus;
}

function manejaErros(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return "LINK NÃO ENCONTRADO"
    } else {
        return 'OCORREU ALGUM ERRO'
    }
}

async function listaValidada (listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);


    return listaDeLinks.map((obj, indice)=>({
        ...obj, //... chama-se de spread, ele espelha os obj dentro do novo array e depois da vírgula colocamos oq desejamos add
        status: status[indice]
    }));
}

export default listaValidada;