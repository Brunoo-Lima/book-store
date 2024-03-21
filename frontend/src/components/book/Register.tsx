import Input from '../form/Input';
import Select from '../form/Select';
import Textarea from '../form/Textarea';

const Register = () => {
  return (
    <div className="w-[500px] border border-black rounded-md p-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-xl text-center my-2">Dados do Livro</h2>
        <div className="flex flex-wrap justify-center p-1">
          <Input type="text" placeholder="Nome do Autor" width={400} />
          <Input type="text" placeholder="Nome do Livro" width={400} />
          <Input type="text" placeholder="Nome da Categoria" width={300} />
          <Input type="text" placeholder="Ano" width={94} />
          <Input type="text" placeholder="Nome da Editora" width={300} />
          <Input type="text" placeholder="Edição" width={94} />
          <Input type="text" placeholder="Valor da Aquisição" width={100} />
          <Input type="text" placeholder="ISBN" width={100} />
          <Input type="text" placeholder="Número de páginas" width={184} />
        </div>
        <p>Sinopse do Liro</p>
        <Textarea placeholder="Digite a sinopse do Livro" />

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
  );
};

export default Register;
