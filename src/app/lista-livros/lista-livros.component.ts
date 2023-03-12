import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.scss'],
})
export class ListaLivrosComponent {
  listaLivros: any[] = [];
  LIST_KEY = 'list_key';
  show: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const livros = localStorage.getItem(this.LIST_KEY);
    if (livros) {
      this.listaLivros = JSON.parse(livros);
    }
  }

  adicionarLivro(nomeLivro: string) {
    if (nomeLivro.trim().length === 0) {
      return;
    }

    const livroRepetido = this.listaLivros.find(
      (item) => item.nome.toLowerCase() === nomeLivro.toLowerCase()
    );

    if (!livroRepetido) {
      this.listaLivros.push({
        id: this.listaLivros.length,
        nome: nomeLivro,
        concluido: false,
      });
      this.salvarLista();
    }
  }

  deletarLivro(id: number) {
    this.listaLivros = this.listaLivros.filter(
      (itemExcluido) => itemExcluido.id != id
    );
    this.salvarLista();
  }

  completar(id: number) {
    const livroEncontrado = this.listaLivros.find((item) => item.id === id);
    if (livroEncontrado) {
      livroEncontrado.concluido = !livroEncontrado.concluido;
      this.salvarLista();
    }
  }

  private salvarLista() {
    localStorage.setItem(this.LIST_KEY, JSON.stringify(this.listaLivros));
  }
}
