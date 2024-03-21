import Input from './components/form/Input';
import TextArea from './components/form/TextArea';
import Select from './components/form/Select';

const App = () => {
  return (
    <div className="bg-[#121212] text-white">
      <h1 className="text-2xl">Cadastro de Livros</h1>

      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input type="text" placeholder="Nome do Autor" />
          <Input type="text" placeholder="Nome da Categoria" />
          <Input type="text" placeholder="Ano" />
          <Input type="text" placeholder="Nome do Livro" />
          <Input type="text" placeholder="Nome da Editora" />
          <Input type="text" placeholder="Valor da Aquisição" />
          <Input type="text" placeholder="Edição" />
          <Input type="text" placeholder="ISBN" />
          <Input type="text" placeholder="Número de páginas" />

          <p>Sinopse do Liro</p>
          <TextArea placeholder="Digite a sinopse do Livro" />

          <p>Dimensões</p>
          <Input type="text" placeholder="Altura do Livro" />
          <Input type="text" placeholder="Largura do Livro" />
          <Input type="text" placeholder="Peso do Livro" />
          <Input type="text" placeholder="Profundidade do Livro" />

          <p>Grupo de Precificação</p>
          <Select />

          <p>Codigo de Barras</p>
          <Input type="text" placeholder="Digite o Código de barras" />

          <button type="submit">Cadastrar Livro</button>
        </form>
      </div>
    </div>
  );
};

export default App;
