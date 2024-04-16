import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { useEffect } from 'react';
import TextArea from '../form/TextArea';

import { useDebounce } from 'use-debounce';
import { toast } from 'react-toastify';

const StatusBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    initialBookData,
    listBooks,
    bookData,
    setBookData,
    handleChangeEvents,
    setLoading,
    updateBookData,
  } = useUserContext();

  useDebounce(handleChangeEvents, 300);

  useEffect(() => {
    setLoading(true);

    if (id === undefined) {
      toast.warn(`ID não definido: ${id}`);
      return;
    }

    const parseId = parseInt(id);

    if (isNaN(parseId)) {
      toast.error(`O Id fornecido não é um número válido: ${id}`);
      return;
    }

    const book = listBooks.find((book) => book.id === parseId);

    if (!book) {
      toast.warn(`Não foi possível encontrar um livro com o ID: ${id}`);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      // Preenche os campos do formulário com os dados do livro
      setBookData(book);
    }, 1000);
  }, [id, setLoading, listBooks, setBookData]);

  const handleModifiedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBookData(bookData, bookData);
    toast.success('Status atualizado com sucesso!');

    navigate('/consult');

    setTimeout(() => {
      setBookData(initialBookData);
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Mudar Status do Livro</h1>
      <div className="w-[950px] border border-gray-300 rounded-md p-6 bg-[#f1efef]">
        <form onSubmit={handleModifiedSubmit}>
          <div>
            <p>Status: </p>
            <select
              className="p-2 rounded-md border-2 border-gray-200 focus:border-emerald-200 outline-none"
              value={bookData.status}
              onChange={(e) => handleChangeEvents(e, 'status')}
            >
              <option value="ACTIVE" defaultChecked>
                Ativar
              </option>
              <option value="INACTIVE">Inativar</option>
            </select>
          </div>

          <div className="my-2">
            <p>Motivo:</p>
            <select
              className="p-2 rounded-md border-2 border-gray-200 focus:border-emerald-200 outline-none"
              value={bookData.categoryOfChange}
              onChange={(e) => handleChangeEvents(e, 'categoryOfChange')}
            >
              <option value="Motivos pessoais">Motivos pessoais</option>
              <option value="Sem Estoque">Sem Estoque</option>
              <option value="Em Estoque">Em Estoque</option>
              <option value="Indisponivel">Indisponivel</option>
              <option value="Fora de Mercado">Fora de Mercado</option>
            </select>
          </div>

          <div className="my-2">
            <p>Justificativa:</p>
            <TextArea
              placeholder="Justificativa da sua ação"
              value={bookData.justifyStatus}
              onChange={(e) => handleChangeEvents(e, 'justifyStatus')}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 transition duration-300 px-2.5 py-2.5 rounded-lg"
            >
              <p className="text-white font-semibold uppercase">Salvar</p>
            </button>

            <Link
              to={'/consult'}
              className="bg-red-600 hover:bg-red-500 transition duration-300 px-2.5 py-2.5 rounded-lg"
            >
              <p className="text-white font-semibold uppercase">Voltar</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusBook;
