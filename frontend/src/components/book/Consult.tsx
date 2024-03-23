import Input from './../form/Input';
import Filter from './../form/Filter';

const Consult = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Consulta de Livro</h1>

      <div className="border-2 border-gray-300 w-[900px] h-[600px] rounded-md p-6 bg-[#f1efef]">
        <div className="flex flex-col items-center mt-6">
          <h2 className="text-2xl font-semibold mb-1">Pesquisa</h2>
          <Input type="text" placeholder="O que você busca?" width={300} />

          <Filter />
        </div>

        <div className="flex flex-col justify-center items-center mt-6 p-6 w-[700px] m-auto">
          <h2 className="text-2xl font-semibold">Livros</h2>
          <ul>
            {[1, 2, 3].map(() => (
              <li>Teste</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Consult;
