import { createUser } from '@/services/create-user';
import { IRegisterForm, RegisterSchema } from '@/validations/register-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IRegisterProps {
  back: () => void;
}

export default function RegisterForm({ back }: IRegisterProps) {
  // const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

      if (response) {
        toast.success('Usuário criado com sucesso!');
        back();
      }
    } catch (err) {
      toast.error('Algo deu errado!');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[300px] space-y-5"
    >
      <div className="flex flex-col">
        <label htmlFor="name">E-mail</label>
        <input
          className="text-black text-base rounded-md h-8 ps-2 pe-2 outline-none border-[1.5px] border-transparent focus-visible:border-blue-500"
          type="text"
          placeholder="Digite seu email"
          {...register('email')}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
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
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="confirmPassword">Confirmar senha</label>
        <input
          className="text-black text-base rounded-md h-8 ps-2 pe-2 outline-none border-[1.5px] border-transparent focus-visible:border-blue-500"
          type="password"
          placeholder="Digite sua senha novamente"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white h-10 rounded-md hover:bg-blue-700/80 transition duration-300"
      >
        Criar conta
      </button>
    </form>
  );
}
