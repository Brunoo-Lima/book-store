import { ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
};

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ children, href }, ref) => {
    return (
      <Link
        to={href}
        ref={ref}
        className={`px-4 py-3 text-white text-md font-normal bg-gray-500 hover:bg-gray-400 transition duration-300 rounded-lg`}
      >
        {children}
      </Link>
    );
  },
);

export default ButtonLink;
