import ButtonLink from './form/ButtonLink';

type ButtonProps = {
  id: number;
  text: string;
  href: string;
};

const buttons: ButtonProps[] = [
  {
    id: 1,
    text: 'Cadastrar Livro',
    href: '/register',
  },
  {
    id: 2,
    text: 'Consultar Livro',
    href: '/consult',
  },
  {
    id: 3,
    text: 'Ativar/Desativar Livro',
    href: '/status',
  },
];

const Home = () => {
  return (
    <div className="container px-8 m-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold mb-4">
          Escolha a opção desejada
        </h1>

        <div className="flex justify-center gap-2 bg">
          {buttons.map((props) => (
            <ButtonLink key={props.id} href={props.href}>
              {props.text}
            </ButtonLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
