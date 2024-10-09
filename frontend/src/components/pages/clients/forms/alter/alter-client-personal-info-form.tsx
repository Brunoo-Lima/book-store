import Input from '@/components/ui/input';
import Radio from '@/components/ui/radio';
import { clientsList } from '@/mocks/clientsList';
import { IRegisterClientForm } from '@/validations/register-client-schema';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { FieldErrors, useFormContext, UseFormRegister } from 'react-hook-form';

interface IClientPersonal {
  register: UseFormRegister<IRegisterClientForm>;
  errors: FieldErrors<IRegisterClientForm>;
}

export default function AlterClientPersonalInfoForm({
  register,
  errors,
}: IClientPersonal) {
  const { setValue } = useFormContext();
  const { id } = useParams();

  useEffect(() => {
    const client = clientsList.find((client) => client.id === Number(id));

    if (client) {
      setValue('name', client.name);
      setValue('cpf', client.cpf);
      setValue('typePhone', client.typePhone);
      setValue('phone', client.phone);
      setValue('dateOfBirth', client.dateOfBirth);
      setValue('email', client.email);
      setValue('password', client.password);
      setValue('confirm', client.confirmPassword);
      setValue('gender', client.gender);
      setValue('status', client.status);
    }
  }, [id, setValue]);

  return (
    <>
      <Input
        type="text"
        label="Nome completo"
        placeholder="Digite o nome completo"
        {...register('name')}
      />

      <div className="grid grid-cols-2 gap-3 items-center">
        <Input
          type="text"
          label="CPF"
          placeholder="000.000.000-00"
          {...register('cpf')}
        />

        <Input
          type="date"
          label="Data de nascimento"
          placeholder="dd/MM/aaaa"
          {...register('dateOfBirth')}
        />
      </div>

      <div className="grid md:grid-cols-2 md:gap-4 items-start">
        <div>
          <p className="block text-sm font-medium text-white">
            Tipo do telefone:{' '}
          </p>
          <Radio label="Celular" value="Celular" {...register('typePhone')} />
          <Radio label="Fixo" value="Fixo" {...register('typePhone')} />
          {errors?.typePhone && (
            <span className="text-sm text-red-600">
              {errors.typePhone.message}
            </span>
          )}
        </div>
        <Input
          type="tel"
          label="Telefone"
          placeholder="(00) 0000-0000"
          {...register('phone')}
        />

        <div className="flex flex-col">
          <p className="block text-sm font-medium text-white">Gênero</p>
          <Radio label="Masculino" value="Masculino" {...register('gender')} />
          <Radio label="Feminino" value="Feminino" {...register('gender')} />
        </div>

        <div>
          <p className="block text-sm font-medium text-white">
            Status do cliente
          </p>
          <Radio label="Ativo" value="Ativo" {...register('status')} />
          <Radio label="Inativo" value="Inativo" {...register('status')} />
        </div>
      </div>

      <div className="space-y-4">
        <Input
          type="email"
          label="E-mail"
          placeholder="Digite seu email"
          {...register('email')}
          error={errors?.email}
        />

        <Input
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          {...register('password')}
          error={errors?.password}
        />

        <Input
          type="password"
          label="Confirme sua senha"
          placeholder="Digite sua senha novamente"
          {...register('confirmPassword')}
          error={errors?.confirmPassword}
        />
      </div>
    </>
  );
}
