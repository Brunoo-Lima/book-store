import { createUser } from '@/services/create-user';
import { IRegisterForm, RegisterSchema } from '@/validations/register-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IRegisterProps {
  back: () => void;
}

export default function RegisterForm({ back }: IRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (form) => {
    try {
      const user = {
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const response = await createUser(user);

      if (response && response.error) {
        toast.error(response.error);
      } else {
        toast.success('Usuário criado com sucesso!');
      }
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error('Usuário já existe. Por favor, use outro email.');
      } else {
        toast.error('Algo deu errado!');
      }
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
        <div className="w-full mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="email">E-mail</label>
          <input
            className="w-full text-black text-base rounded-md h-10 px-3 outline-none border-[1.5px] border-gray-600 focus:border-blue-500"
            type="text"
            placeholder="Digite seu email"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-xs text-red-400">{errors.email.message}</span>
          )}
        </div>

        <div className="w-full mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="password">Senha</label>
          <input
            className="w-full text-black text-base rounded-md h-10 px-3 outline-none border-[1.5px] border-gray-600 focus:border-blue-500"
            type="password"
            placeholder="Digite sua senha"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-xs text-red-400">{errors.password.message}</span>
          )}
        </div>

        <div className="w-full mb-6">
          <label className="block text-gray-300 mb-1" htmlFor="confirmPassword">Confirmar senha</label>
          <input
            className="w-full text-black text-base rounded-md h-10 px-3 outline-none border-[1.5px] border-gray-600 focus:border-blue-500"
            type="password"
            placeholder="Digite sua senha novamente"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-400">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold h-10 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Criar conta
        </button>

        <Link
          href="#"
          onClick={back}
          className="text-white font-semibold text-center w-max mt-4 cursor-pointer hover:underline"
        >
          Voltar
        </Link>
      </form>
    </div>
  );
}