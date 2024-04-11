import { useContext, useEffect } from 'react';
import { UserContext } from '../../../UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from '../../form/Input';
import Checkbox from '../../form/Checkbox';
import TextArea from '../../form/TextArea';
import Select from '../../form/Select';

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const {
    listBooks,
    handleInputChange,
    bookData,
    setBookData,
    handleCheckboxChange,
    handleAddAuthor,
    handleAuthorInputChange,
    handleTextareaChange,
    handleSelectChange,
    updateBook,
  } = context!;

  useEffect(() => {
    if (id !== undefined) {
      const parsedId = parseInt(id);
      if (!isNaN(parsedId)) {
        const book = listBooks.find((book) => book.id === parsedId);
        if (book) {
          // Preencher os campos do formulário com os dados do livro
          setBookData(book);
        } else {
          console.error('Livro não encontrado:', id);
        }
      } else {
        console.error('ID inválido:', id);
      }
    } else {
      console.error('ID não definido');
    }
  }, [id, listBooks, setBookData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBook(bookData.id, bookData);
    navigate('/consult');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Editar Livro</h1>

      <div className="w-[950px] border border-gray-300 rounded-md p-6 bg-[#f1efef]">
        <form onSubmit={handleSubmit}>
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
                  onChange={(e) => handleInputChange(e, 'title')}
                />

                {bookData.category.map((category, index) => (
                  <div key={index}>
                    <Checkbox name={category} onChange={handleCheckboxChange} />
                  </div>
                ))}

                <Input
                  type="text"
                  placeholder="Ano"
                  width={94}
                  value={bookData.year}
                  onChange={(e) => handleInputChange(e, 'year')}
                />
                <Input
                  type="text"
                  placeholder="Nome da Editora"
                  width={300}
                  value={bookData.publisher}
                  onChange={(e) => handleInputChange(e, 'publisher')}
                />
                <Input
                  type="text"
                  placeholder="Edição"
                  width={94}
                  value={bookData.edition}
                  onChange={(e) => handleInputChange(e, 'edition')}
                />
                <Input
                  type="text"
                  placeholder="ISBN"
                  width={195}
                  value={bookData.ISBN}
                  onChange={(e) => handleInputChange(e, 'ISBN')}
                />
                <Input
                  type="text"
                  placeholder="Total páginas"
                  width={100}
                  value={bookData.pages}
                  onChange={(e) => handleInputChange(e, 'pages')}
                />
                <Input
                  type="text"
                  placeholder="Valor"
                  width={100}
                  value={bookData.value}
                  onChange={(e) => handleInputChange(e, 'value')}
                />
              </div>

              <h2 className="text-xl text-center my-2">Sinopse do Livro</h2>
              <div className="pl-7">
                <TextArea
                  placeholder="Digite a sinopse do Livro"
                  value={bookData.synopsis}
                  onChange={(e) => handleTextareaChange(e, 'synopsis')}
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
                  onChange={(e) => handleInputChange(e, 'height')}
                />
                <Input
                  type="text"
                  placeholder="Largura"
                  width={80}
                  value={bookData.width}
                  onChange={(e) => handleInputChange(e, 'width')}
                />
                <Input
                  type="text"
                  placeholder="Peso"
                  width={80}
                  value={bookData.weight}
                  onChange={(e) => handleInputChange(e, 'weight')}
                />
                <Input
                  type="text"
                  placeholder="Profundidade"
                  width={130}
                  value={bookData.depth}
                  onChange={(e) => handleInputChange(e, 'depth')}
                />
              </div>

              <div className="pl-7">
                <p className="my-2">Grupo de Precificação</p>
                <Select
                  options={[
                    { value: 'DEFAULT', label: 'PADRÃO' },
                    { value: 'BRONZE', label: 'BRONZE' },
                    { value: 'SILVER', label: 'SILVER' },
                    { value: 'GOLD', label: 'GOLD' },
                    { value: 'DIAMOND', label: 'DIAMOND' },
                  ]}
                  value={bookData.groupPricing}
                  onChange={(e) => handleSelectChange(e, 'groupPricing')}
                />
              </div>

              <div className="pl-7">
                <p className="my-2">Codigo de Barras</p>
                <Input
                  type="text"
                  placeholder="Digite o Código de barras"
                  value={bookData.barCode}
                  onChange={(e) => handleInputChange(e, 'barCode')}
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

export default EditBook;
