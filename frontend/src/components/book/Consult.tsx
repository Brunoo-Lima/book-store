import Input from './../form/Input';
import Filter from './../form/Filter';
import { Link } from 'react-router-dom';
import Books from './Books';

const Consult = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Consulta de Livro</h1>

      <div className="border-2 border-gray-300 w-[900px] h-[650px] rounded-md p-6 bg-[#f1efef] overflow-hidden">
        <div className="flex flex-col items-center mt-6">
          <h2 className="text-2xl text-center font-semibold mb-1">Pesquisa</h2>
          <Input type="text" placeholder="O que você busca?" width={300} />

          <Filter />
          <Link
            to={'/'}
            className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-700 transition duration-300 rounded-lg"
          >
            <p className="text-md font-semibold text-white">Voltar</p>
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center mt-4 p-6 w-[700px] m-auto  h-full">
          <h2 className="text-2xl font-semibold">Livros</h2>
          <ul className="h-full overflow-y-auto">
            {[1, 2, 3, 4].map(() => (
              <li>
                <Books />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Consult;
