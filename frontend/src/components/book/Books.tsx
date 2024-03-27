import { UserBooksTypes } from '../../UserContext';

const Books = ({
  author,
  title,
  TotalPage,
  year,
  category,
  publishing,
  edition,
  value,
}: UserBooksTypes) => {
  return (
    <div className="bg-[#fefefe] my-4 rounded-lg h-[230px] border-2 border-gray-200">
      <div className="flex justify-between w-[700px] p-5">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-base">Autor: {author}</p>
          <p>Total de Páginas: {TotalPage}</p>
          <span>Ano lançamento: {year}</span>

          <h3 className="text-base font-semibold">Editora</h3>
          <h3 className="text-base">Editora: {publishing}</h3>
          <p>Edição: {edition}</p>
        </div>

        <div className="mt-8 space-y-1">
          <h3 className="text-base font-semibold">Categoria</h3>
          <ul className="flex flex-wrap w-44">
            {category.map((cat: string, index: number) => (
              <li key={index} className="flex flex-wrap mr-2">
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <p className="font-semibold text-lg">R$ {value}</p>

          <div className="flex flex-1 mt-28">
            <button className="bg-red-600 hover:bg-red-500 transition duration-300 px-2.5 rounded-lg">
              <p className="text-white font-semibold">Inativar</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
