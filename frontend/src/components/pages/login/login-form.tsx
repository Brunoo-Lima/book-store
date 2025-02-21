import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { ILoginForm, LoginSchema } from '../../../validations/login-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import handleError from '@/utilities/handle-toast';

interface ILoginProps {
  create: () => void;
}

export default function LoginForm({ create }: ILoginProps) {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (form) => {
    try {
      await login(form.email, form.password);
    } catch (err: any) {
      handleError('Usuário ou senha inválidos!');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900 relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Efeito de iluminação */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 w-[350px] bg-black/80 border border-gray-700 shadow-2xl rounded-xl flex flex-col items-center p-6"
      >
        <h2 className="text-2xl text-white font-semibold mb-4">LOGIN</h2>

        <div className="w-full mb-4">
          <label htmlFor="email" className="block text-gray-300">Usuário</label>
          <input
            className="w-full text-white text-base rounded-md h-10 px-3 outline-none bg-gray-800 border border-gray-600 focus:border-blue-500"
            type="text"
            placeholder="Digite seu usuário"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-xs text-red-400">{errors.email.message}</span>
          )}
        </div>

        <div className="w-full mb-4">
          <label htmlFor="password" className="block text-gray-300">Senha</label>
          <input
            className="w-full text-white text-base rounded-md h-10 px-3 outline-none bg-gray-800 border border-gray-600 focus:border-blue-500"
            type="password"
            placeholder="Digite sua senha"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-xs text-red-400">{errors.password.message}</span>
          )}
        </div>
        <div className="w-full mb-4 text-center">
          <p className="text-sm text-white">
            Não tem acesso?
            <span onClick={create} className="text-indigo-400 cursor-pointer"> Crie uma conta!</span>
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-semibold h-10 rounded-md hover:bg-blue-700 transition duration-300 shadow-md"
        >
          {isSubmitting ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
