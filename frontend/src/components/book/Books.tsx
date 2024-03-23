const Books = () => {
  return (
    <div className="bg-[#fefefe] my-4 rounded-lg">
      <div className="flex justify-between w-[700px] p-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Nome do Titulo</h1>
          <p className="text-base">Autor</p>
          <p>Total de Páginas</p>
          <span>2000</span>
        </div>

        <div className="mt-8">
          <h3 className="text-base font-semibold">Categoria</h3>
          <p>Suspense</p>
          <p>Ação</p>
        </div>

        <div className="mt-8">
          <h3 className="text-base font-semibold">Nome da Editora</h3>
          <p>Edição</p>
        </div>

        <p className="font-semibold">R$ 28,00</p>
      </div>
    </div>
  );
};

export default Books;
