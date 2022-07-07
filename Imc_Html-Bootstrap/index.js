//categorias do imc
let categorias = [
    { min: 0, max: 18.5, descricao: "Abaixo do peso", img: "down.png", bg: "bg-secondary" },
    { min: 18.5, max: 24.9, descricao: "Peso ideal", img: "up.png", bg: "bg-success" },
    { min: 25, max: 29.9, descricao: "Sobrepeso", img: "down.png", bg: "bg-warning" },
    { min: 30, max: 99, descricao: "Obesidade", img: "down.png", bg: "bg-danger" },
];
let imgLink = "/assets/";
let imgWidth = "60px";
//pegar o id do html chamado linha, é uma row do bootstrap
var linha = document.getElementById("linha");
//crie um botão com posição absolute e coloque a esquerda da linha do imc

//criar uma ação de click para o botão com id calcular
let imc = 0;
mostrarCategorias();

document.getElementById("calcular").addEventListener("click", function () {
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;
    imc = peso / (altura * altura);
    Number(imc.toFixed(2));
    mostrarCategorias();
});

//pegar o botao com o id limpar
function limpar() {
    linha.innerHTML = "";
    imc = 0;
    mostrarCategorias();
}

//colocar essas categorias no html chamado linha, utilize col-md-6 para cada categoria, coloque a cor da categoria no bg, e a imagem da categoria no src com um tamnho da variavel imgWidth
// faltou colocar text-white, text-center para centralizar o texto, margin-bottom, bg estava na linha e nao no card

function mostrarCategorias() {
    if (imc === 0) {
        for (let i = 0; i < categorias.length; i++) {
            linha.innerHTML += `
        <div class="col-lg-6 ">
            <div class="card ${categorias[i].bg} text-center text-white mb-4">
                <div class="card-body">
                    <img src="${imgLink}${categorias[i].img}" width="${imgWidth}">
                    <h5 class="card-title mt-4">${categorias[i].descricao}</h5>
                    <p class="card-text">IMC está entre ${categorias[i].min} e ${categorias[i].max}</p>    
                </div>
            </div>
        </div>
    `;
        }
    } else if (imc < 18.5) {
        linha.innerHTML = `
        <div class="col-md-12 ">
            <div class="card bg-secondary text-center text-white mb-4">
                <div class="card-body">
                    <img src="${imgLink}down.png" width="${imgWidth}">
                    <h5 class="card-title mt-4">Abaixo do peso</h5>
                    <p class="card-text">IMC está entre ${categorias[0].min} e ${categorias[0].max}</p>   
                    <p class="card-text">IMC: ${imc}</p>   
                </div>
            </div>
        </div>
    `;
    } else if (imc < 24.9) {
        linha.innerHTML = `
        <div class="col-md-12 ">
            <div class="card bg-success text-center text-white mb-4">
                <div class="card-body">
                    <img src="${imgLink}up.png" width="${imgWidth}">
                    <h5 class="card-title mt-4">Peso ideal</h5>
                    <p class="card-text">IMC está entre ${categorias[1].min} e ${categorias[1].max}</p>  
                    <p class="card-text">IMC: ${imc}</p>  
                </div>
            </div>
        </div>
    `;
    } else if (imc < 29.9) {
        linha.innerHTML = `
        <div class="col-md-12 ">
            <div class="card bg-warning text-center text-white mb-4">
                <div class="card-body">
                    <img src="${imgLink}down.png" width="${imgWidth}">
                    <h5 class="card-title mt-4">Sobrepeso</h5>
                    <p class="card-text">IMC está entre ${categorias[2].min} e ${categorias[2].max}</p>    
                    <p class="card-text">IMC: ${imc}</p>  
                </div>
            </div>
        </div>
    `;
    } else if (imc < 99) {
        linha.innerHTML = `
        <div class="col-md-12 ">
            <div class="card bg-danger text-center text-white mb-4">
                <div class="card-body">
                    <img src="${imgLink}down.png" width="${imgWidth}">
                    <h5 class="card-title mt-4">Obesidade</h5>
                    <p class="card-text">IMC está entre ${categorias[3].min} e ${categorias[3].max}</p> 
                    <p class="card-text">IMC: ${imc}</p>     
                </div>
            </div>
        </div>
    `;
    }
    if (imc > 0) {
        linha.innerHTML += `
    <div class="col-md-12" onclick="limpar()">
        <button class="btn btn-dark py-2" id="limpar">Retornar</button>
    </div>
    `;
    }
}

/* 
fazer criando uma div e jogando ela para ser o elemento filho de linha
for (let i = 0; i < categorias.length; i++) {
    let card = document.createElement("div");
    card.className = "col-md-6";
    card.innerHTML = `
        <div class="card ${categorias[i].bg}">
            <div class="card-body">
                <h5 class="card-title">${categorias[i].descricao}</h5>
                <img src="${imgLink}${categorias[i].img}" class="img-fluid" alt="">
                <p class="card-text">${categorias[i].min} - ${categorias[i].max}</p>
            </div>
        </div>
    `;
    linha.appendChild(card);
}
 */
