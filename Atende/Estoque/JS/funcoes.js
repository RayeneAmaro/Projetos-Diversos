function validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto, idPrecoCusto, idMargem){
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let quantidade = document.getElementById(idQtidadeProduto).value;
    let custo = document.getElementById(idPrecoCusto).value;
   let margem = document.getElementById(idMargem).value;

    if (nome == ""){
        alert("Nome do produto não pode estar em branco!");
    }
    else if (codigo == ""){
        alert("Código do produto não pode estar em branco!");
    }
    else if (quantidade == ""){
        alert("Quantidade do produto não pode estar em branco!");
    }
    else if (custo == ""){
        alert("Preço de custo do produto não pode estar em branco!");
    }
    else {
        cadastrarProduto(nome, codigo, parseInt(quantidade), parseFloat(custo), parseFloat(margem));
    }
}
  
function cadastrarProduto(produto,codig,qtidade,cust, marg){
    let novoProduto = {nome:produto, codigo:codig, quantidade:qtidade, custo:cust, margem: (marg/100)};
    novoProduto.venda = cust * (1 + (marg / 100) );
    if (typeof(Storage) !== "undefined"){
        let produtos = localStorage.getItem("produtos");

        if (produtos == null) produtos = [];
        else produtos = JSON.parse(produtos);

        produtos.push(novoProduto);
        
        localStorage.setItem("produtos", JSON.stringify(produtos));
        alert("Foram cadastradas com sucesso " +qtidade+ " unidades do produto " +produto+ "!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    }
    else {
        alert("A versão do seu navegador é muito antiga")
    }
}

function atualizarTotalEstoque(idCampo){
    localStorage.setItem("totalEstoque", ++document.getElementById(idCampo).innerHTML)
}

function carregarTotalEstoque(idCampo){
    if (typeof(Storage) !== "undefined"){
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é antiga!")
}


function listarEstoque(){
    if(typeof(Storage) !== "undefined"){
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Estoque:</h1> ")
        if (produtos == null)
            document.write("<h3>Ainda não há nenhum item no estoque</h3> ");
            else{
                produtos = JSON.parse(produtos);
                produtos.forEach(produto => {
                    document.write("<ul>");
                    document.write("<li>Nome do produto: " +produto.nome+ "</li>");
                    document.write("<li>Código do produto: " +produto.codigo+ "</li>");
                    document.write("<li>Quantidade em estoque: " +produto.quantidade+ "</li>");
                    document.write("<li>Preço de custo: R$" +produto.custo+ "</li>");
                    document.write("<li>Preço de venda: R$" +produto.venda+ "</li>");
                    document.write("</ul>");
                });
            }
    }
    else alert("A versão do seu navegador é antiga!")
}


carregaProdutosSelect = () => {
    let select = document.getElementById("selProdutos");
    let produtos = retornaProdutos();
    let options = "";

    if( produtos.length){
        produtos.forEach(function(value,key){
            options += `<option value="${key}">Codigo: ${value.codigo} - Produto: ${value.nome}</option>`;
        })
    }else{
        alert("Não há produtos cadastrados!");
        return;
    }
    select.innerHTML = options;
}

apagarProduto = () => {
    let select          = document.getElementById('selProdutos');
    let produto_remover = retornaProdutos()[select.value]
    let produtos        = retornaProdutos();

    let produtos_novo = produtos.filter(e => e.codigo != produto_remover.codigo);
    if(confirm(`Deseja apagar o produto ${produto_remover.nome}?`)){
        localStorage.removeItem('produtos');
        localStorage.setItem('produtos',  JSON.stringify( produtos_novo ) );
        alert("Removido com sucesso");
        location.reload();
    }
}

populaProduto = () => {
    let dados = document.getElementsByClassName('dados');
    dados[0].style.display = 'none';
    let select = document.getElementById('selProdutos');
    let produto = retornaProdutos()[select.value]
    
    document.getElementById('codigo').innerText     = produto.codigo
    document.getElementById('nome').innerText       = produto.nome
    document.getElementById('custo').innerText      = produto.custo
    document.getElementById('quantidade').innerText = produto.quantidade
    document.getElementById('venda').innerText      = produto.venda
    dados[0].style.display = 'block';
}

retornaProdutos = () =>{
    let produtos = localStorage.getItem('produtos');

    if( produtos != "" ){
        produtos = JSON.parse(produtos);
        return produtos
    }else{
        return []
    }
}
