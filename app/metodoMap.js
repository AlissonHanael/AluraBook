export function aplicarDesconto(livros) {
	const desconto = 0.3
	let livroComDesconto = livros.map((livro) => {
		return {
			...livro,
			preco: livro.preco - livro.preco * desconto,
		}
	})
	return livroComDesconto
}
