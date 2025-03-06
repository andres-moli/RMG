import Cookies from 'js-cookie'
import { User } from '../../domain/graphql';
const stringToJsonUser = (stringUser: string | undefined): Partial<User> | undefined => {
  try {
    if(!stringUser) return undefined
    const result = JSON.parse(stringUser);
    return result as User
  }catch {
    return undefined
  }
}
const NavBar = () => {
  const stringUser = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_USER);
  const user = stringToJsonUser(stringUser);

  return (
    <nav className="bg-[#007BFF] border-b border-gray-200 p-4 flex justify-between items-center shadow-sm w-full fixed top-0 left-0 z-10">
      <div className="flex items-center space-x-3 bg-blue">
        <img
          src="logo.png"
          alt="Logo"
          className="h-12"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 md:hidden">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-2">
          <div className="hidden md:block">
            <p className="text-white text-2.5xl font-bold transform">{user?.fullName?.toLocaleUpperCase()}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

