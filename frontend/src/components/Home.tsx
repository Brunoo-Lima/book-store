import Register from './book/Register';

const Home = () => {
  return (
    <div className="container px-8 m-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold mb-4">Cadastro de Livros</h1>

        <Register />
      </div>
    </div>
  );
};

export default Home;
