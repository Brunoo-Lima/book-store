import { ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  onClick?: () => void;
};

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ children, href, onClick }, ref) => {
    return (
      <Link
        to={href}
        ref={ref}
        className={`px-4 py-3 text-white text-md font-normal bg-gray-500 hover:bg-gray-400 transition duration-300 rounded-lg`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  },
);

export default ButtonLink;
