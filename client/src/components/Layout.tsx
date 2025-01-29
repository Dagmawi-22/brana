import { ReactNode } from "react";
import { Link } from "react-router-dom";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="lg:flex lg:w-64 bg-gray-800 text-white hidden">
        <div className="p-5">
          <h1 className="text-2xl font-bold">BRANA</h1>
          <nav className="mt-10 space-y-4">
            <Link to="/" className="block text-lg">
              Dashboard
            </Link>
            <Link to="/login" className="block text-lg">
              Login
            </Link>
            <Link to="/register" className="block text-lg">
              Register
            </Link>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 p-6">{children}</div>
    </div>
  );
};

export default Layout;
