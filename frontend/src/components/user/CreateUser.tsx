import { useContext } from 'react';
import Input from '../form/Input';
import { UserContext } from './../../UserContext';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const context = useContext(UserContext);
  const { userData, handleInputChangeUser, handleSubmitUser } = context!;

  const navigate = useNavigate();

  const handleContinue = () => {
    if (userData.name.trim() === '') {
      return;
    }
    navigate('/register');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Criar Usuário</h1>

      <div className="w-[950px] border border-gray-300 rounded-md p-6 bg-[#f1efef]">
        <h1>Nome do Usuário:</h1>

        <div className="flex items-baseline gap-2">
          <form onSubmit={handleSubmitUser}>
            <div className="mb-2 flex gap-1">
              <Input
                type="text"
                placeholder="Digite nome do usuário"
                width={300}
                value={userData.name}
                onChange={(e) => handleInputChangeUser(e, 'name')}
                required
              />

              <button
                type="submit"
                className="px-4 py-3 bg-emerald-500 hover:bg-emerald-700 transition duration-300 rounded-lg w-32"
              >
                <p className="text-white text-md font-semibold uppercase">
                  Salvar
                </p>
              </button>
            </div>
          </form>

          <button
            onClick={handleContinue}
            className="block px-4 py-3.5 bg-red-500 hover:bg-red-700 transition duration-300 rounded-lg w-32"
          >
            <p className="text-white font-semibold text-md uppercase text-center">
              Continuar
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
