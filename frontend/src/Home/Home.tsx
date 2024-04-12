import { useNavigate } from 'react-router-dom';
import ButtonLink from '../components/form/ButtonLink';
import Loading from '../components/utils/Loading';
import { useUserContext } from '../hooks/useUserContext';

type ButtonProps = {
  id: number;
  text: string;
  href: string;
};

const buttons: ButtonProps[] = [
  {
    id: 1,
    text: 'Cadastrar Livro',
    href: '/user',
  },
  {
    id: 2,
    text: 'Consultar Livro',
    href: '/consult',
  },
];

const Home = () => {
  const { loading, setLoading } = useUserContext();
  const navigate = useNavigate();

  const handleButtonClick = (href: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(href);
    }, 2000);
  };

  return (
    <div className="container px-8 m-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h1 className="text-3xl font-semibold mb-4">
              Escolha a opção desejada
            </h1>

            <div className="flex justify-center gap-2 bg">
              {buttons.map((props) => (
                <ButtonLink
                  key={props.id}
                  href={props.href}
                  onClick={() => handleButtonClick(props.href)}
                >
                  {props.text}
                </ButtonLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
