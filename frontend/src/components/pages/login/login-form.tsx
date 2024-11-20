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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[300px] space-y-5"
    >
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="text-black text-base rounded-md h-8 ps-2 pe-2 outline-none border-[1.5px] border-transparent focus-visible:border-blue-500"
          type="text"
          placeholder="Digite seu email"
          {...register('email')}
        />
        {errors.email && (
          <span className="text-xs text-red-400">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Senha</label>
        <input
          className="text-black text-base rounded-md h-8 ps-2 pe-2 outline-none border-[1.5px] border-transparent focus-visible:border-blue-500"
          type="password"
          placeholder="Digite sua senha"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-xs text-red-400">
            {errors.password.message}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm">
          Não tem acesso?
          <span onClick={create} className="text-indigo-400 cursor-pointer">
            {' '}
            Crie uma conta!
          </span>
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white font-semibold h-10 rounded-md hover:bg-blue-700/80 transition duration-300"
      >
        {isSubmitting ? 'Carregando...' : 'Entrar'}
      </button>
    </form>
  );
}
