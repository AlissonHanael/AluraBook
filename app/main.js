import { aplicarDesconto } from "./metodoMap.js"
import { exibirLivros } from "./metodoForEach.js"
let livros = []
const endPointDaApi = "https://guilhermeonrails.github.io/casadocodigo/livros.json"
const valorTotalLivrosDisponiveis = document.getElementById("valor_total_livros_disponiveis")

async function getBuscarLivros() {
	const res = await fetch(endPointDaApi)
	livros = await res.json()
	livros = aplicarDesconto(livros)
	exibirLivros(livros)
}

/* Método Filter - Filtrar com click por categoria.*/

const btnTagLivros = document.querySelectorAll(".btn")
export function filtrarLivros() {
	const elementoBtn = document.getElementById(this.id)
	const categoria = elementoBtn.value
	let livrosFiltrados = categoria == "disponivel" ? filtrarPorDisponibilidade() : filtrarPorCategoria(categoria)
	exibirLivros(livrosFiltrados)
	if (categoria == "disponivel") {
		const valorTotal = calculaLivroDisponiveis(livrosFiltrados)

		exibirValorTotal(valorTotal.toFixed(2))
	}
}
btnTagLivros.forEach((btn) => btn.addEventListener("click", filtrarLivros))

function filtrarPorCategoria(categoria) {
	return livros.filter((livro) => livro.categoria == categoria)
}

function filtrarPorDisponibilidade() {
	return livros.filter((livro) => livro.quantidade > 0)
}

/*Método SORT*/
const btnOrdenarPorPreco = document.getElementById("btnOrdenarPorPreco")
export function ordenarPorPreco() {
	let livrosOrdenados = livros.sort((a, b) => a.preco - b.preco)
	console.log(livrosOrdenados)
	exibirLivros(livrosOrdenados)
}
btnOrdenarPorPreco.addEventListener("click", ordenarPorPreco)

getBuscarLivros()

/*Exibe valor total dos livros na tela*/

function exibirValorTotal(valor) {
	valorTotalLivrosDisponiveis.innerHTML = `
    <div class="livros__disponiveis">
				<p>Todos os livros disponíveis por R$ <span id="valor">${valor}</span></p>
			</div>`
}

/* Método reduce */
function calculaLivroDisponiveis(livros) {
	return livros.reduce((acc, livros) => acc + livros.preco, 0)
}
