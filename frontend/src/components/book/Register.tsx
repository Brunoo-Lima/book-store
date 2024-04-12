import { Link } from 'react-router-dom';
import Input from '../form/Input';
import TextArea from '../form/TextArea';
import Checkbox from './../form/Checkbox';
import mockDataCategories from '../../config/mockDataCategories';
import { useUserContext } from '../../hooks/useUserContext';

const Register = () => {
  const {
    handleBookSubmit,
    bookData,
    handleCheckboxChange,
    handleAddAuthor,
    handleAuthorInputChange,
    handleChangeEvents,
  } = useUserContext();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Cadastro de Livros</h1>

      <div className="w-[950px] border border-gray-300 rounded-md p-6 bg-[#f1efef]">
        <form onSubmit={handleBookSubmit}>
          <div className="grid grid-cols-2">
            <div className="my-2">
              <h2 className="text-xl text-center my-2">Dados do Livro</h2>
              <div className="flex flex-wrap justify-center p-1">
                {bookData.author.map((author, index) => (
                  <div key={index} className="flex">
                    <Input
                      type="text"
                      name={`author-${index}`}
                      placeholder="Nome do Autor"
                      width={400}
                      value={author}
                      onChange={(e) => handleAuthorInputChange(e, index)}
                    />
                  </div>
                ))}

                <button type="button" onClick={handleAddAuthor} className="">
                  <p className="text-2xl font-bold">+</p>
                </button>

                <Input
                  type="text"
                  placeholder="Nome do Livro"
                  width={400}
                  value={bookData.title}
                  onChange={(e) => handleChangeEvents(e, 'title')}
                />

                <div>
                  <h2 className="text-xl text-center my-2">Categorias</h2>
                  <div className="flex flex-wrap justify-center">
                    {mockDataCategories.map((category) => (
                      <Checkbox
                        key={category.id}
                        name={category.name}
                        onChange={handleCheckboxChange}
                      />
                    ))}
                  </div>
                </div>

                <Input
                  type="text"
                  placeholder="Ano"
                  width={94}
                  value={bookData.year}
                  onChange={(e) => handleChangeEvents(e, 'year')}
                />
                <Input
                  type="text"
                  placeholder="Nome da Editora"
                  width={300}
                  value={bookData.publisher}
                  onChange={(e) => handleChangeEvents(e, 'publisher')}
                />
                <Input
                  type="text"
                  placeholder="Edição"
                  width={94}
                  value={bookData.edition}
                  onChange={(e) => handleChangeEvents(e, 'edition')}
                />
                <Input
                  type="text"
                  placeholder="ISBN"
                  width={195}
                  value={bookData.ISBN}
                  onChange={(e) => handleChangeEvents(e, 'ISBN')}
                />
                <Input
                  type="text"
                  placeholder="Total páginas"
                  width={100}
                  value={bookData.pages}
                  onChange={(e) => handleChangeEvents(e, 'pages')}
                />
                <Input
                  type="text"
                  placeholder="Valor"
                  width={100}
                  value={bookData.value}
                  onChange={(e) => handleChangeEvents(e, 'value')}
                />
              </div>

              <h2 className="text-xl text-center my-2">Sinopse do Livro</h2>
              <div className="pl-7">
                <TextArea
                  placeholder="Digite a sinopse do Livro"
                  value={bookData.synopsis}
                  onChange={(e) => handleChangeEvents(e, 'synopsis')}
                />
              </div>
            </div>
            <div className="my-2">
              <h2 className="text-xl text-center my-2">Dimensões</h2>
              <div className="flex justify-center pt-1.5">
                <Input
                  type="text"
                  placeholder="Altura"
                  width={80}
                  value={bookData.height}
                  onChange={(e) => handleChangeEvents(e, 'height')}
                />
                <Input
                  type="text"
                  placeholder="Largura"
                  width={80}
                  value={bookData.width}
                  onChange={(e) => handleChangeEvents(e, 'width')}
                />
                <Input
                  type="text"
                  placeholder="Peso"
                  width={80}
                  value={bookData.weight}
                  onChange={(e) => handleChangeEvents(e, 'weight')}
                />
                <Input
                  type="text"
                  placeholder="Profundidade"
                  width={130}
                  value={bookData.depth}
                  onChange={(e) => handleChangeEvents(e, 'depth')}
                />
              </div>

              <div className="pl-7">
                <p className="my-2">Grupo de Precificação</p>
                <select
                  name="select"
                  className="p-2 rounded-md border-2 border-gray-200 focus:border-emerald-200 outline-none"
                  value={bookData.groupPricing}
                  onChange={(e) => handleChangeEvents(e, 'groupPricing')}
                >
                  <option value="DEFAULT">PADRÃO</option>
                  <option value="BRONZE">BRONZE</option>
                  <option value="SILVER">SILVER</option>
                  <option value="GOLD">GOLD</option>
                  <option value="DIAMOND">DIAMOND</option>
                </select>
              </div>

              <div className="pl-7">
                <p className="my-2">Codigo de Barras</p>
                <Input
                  type="text"
                  placeholder="Digite o Código de barras"
                  value={bookData.barCode}
                  onChange={(e) => handleChangeEvents(e, 'barCode')}
                />
              </div>

              <div className="flex justify-center mt-4 gap-2">
                <button
                  type="submit"
                  className="px-4 py-3 bg-emerald-500 hover:bg-emerald-700 transition duration-300 rounded-lg w-32"
                >
                  <p className="text-white text-md font-semibold uppercase">
                    Salvar
                  </p>
                </button>

                <Link
                  to={'/'}
                  className="px-4 py-3 bg-red-500 hover:bg-red-700 transition duration-300 rounded-lg w-32"
                >
                  <p className="text-white font-semibold text-md uppercase text-center">
                    Voltar
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
