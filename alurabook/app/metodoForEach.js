const inserirLivro = document.getElementById("livros")
const valorTotalLivrosDisponiveis = document.getElementById("valor_total_livros_disponiveis")

export function exibirLivros(listaDeLivros) {
	valorTotalLivrosDisponiveis.innerHTML = ""
	inserirLivro.innerHTML = ""
	listaDeLivros.forEach((livro) => {
		let disponible = verificaDisponibilidade(livro)
		inserirLivro.innerHTML += `<div class="livro">
        <img class="${disponible}" src="${livro.imagem}" alt="${livro.alt}" />
        <h2 class="livro__titulo" id="titulo">
          ${livro.titulo}
        </h2>
        <p class="livro__descricao" id="autor">${livro.autor}</p>
        <p class="livro__preco" id="preco">R$ ${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag" id="tag">${livro.categoria}</span>
        </div>
      </div>`
	})
}

function verificaDisponibilidade(livro) {
	if (livro.quantidade > 0) {
		return "livro__imagens"
	} else {
		return "livro__imagens indisponivel"
	}
}
