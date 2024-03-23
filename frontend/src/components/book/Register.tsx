import Input from '../form/Input';
import Select from '../form/Select';
import Textarea from '../form/Textarea';

const Register = () => {
  return (
    <div className="w-[950px] border border-gray-300 rounded-md p-6 bg-[#f1efef]">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2">
          <div className="my-2">
            <h2 className="text-xl text-center my-2">Dados do Livro</h2>
            <div className="flex flex-wrap justify-center p-1">
              <Input type="text" placeholder="Nome do Autor" width={400} />
              <Input type="text" placeholder="Nome do Livro" width={400} />
              <Input type="text" placeholder="Nome da Categoria" width={300} />
              <Input type="text" placeholder="Ano" width={94} />
              <Input type="text" placeholder="Nome da Editora" width={300} />
              <Input type="text" placeholder="Edição" width={94} />
              <Input type="text" placeholder="Valor" width={100} />
              <Input type="text" placeholder="Total páginas" width={100} />
              <Input type="text" placeholder="ISBN" width={184} />
            </div>

            <h2 className="text-xl text-center my-2">Sinopse do Liro</h2>
            <div className="pl-7">
              <Textarea placeholder="Digite a sinopse do Livro" />
            </div>
          </div>
          <div className="my-2">
            <h2 className="text-xl text-center my-2">Dimensões</h2>
            <div className="flex justify-center pt-1.5">
              <Input type="text" placeholder="Altura" width={80} />
              <Input type="text" placeholder="Largura" width={80} />
              <Input type="text" placeholder="Peso" width={80} />
              <Input type="text" placeholder="Profundidade" width={130} />
            </div>

            <div className="pl-7">
              <p className="my-2">Grupo de Precificação</p>
              <Select />
            </div>

            <div className="pl-7">
              <p className="my-2">Codigo de Barras</p>
              <Input type="text" placeholder="Digite o Código de barras" />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="px-4 py-3 bg-emerald-500 hover:bg-emerald-700 transition duration-300 rounded-lg"
              >
                <p className="text-white text-md font-semibold uppercase">
                  Cadastrar Livro
                </p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
