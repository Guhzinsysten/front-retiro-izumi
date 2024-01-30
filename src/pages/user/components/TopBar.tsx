import { Fragment, useEffect, useState } from "react";
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import router from "next/router";

interface TopBarProps {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const getRandomColor = (): string => {
  const colors = [
    "bg-yellow-700",
    "bg-blue-700",
    "bg-green-700",
    "bg-red-700",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const getInitials = (name: string): string => {
  const nameArray = name.split(" ");
  return nameArray.map(word => word[0]).join("").toUpperCase();
};



const TopBar: React.FC<TopBarProps> = ({ showNav, setShowNav }) => {
  const [isBarsIconVisible, setBarsIconVisible] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName || '');
  }, []);


  const handleBarsIconClick = () => {
    setShowNav(!showNav);
    setBarsIconVisible(!isBarsIconVisible);
  };
  const handleLogout = () => {
    // Limpar o estado de autenticação no Local Storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('ID');

    // Redirecionar para a página de login após o logout
    router.push('/user/');
  };
  return (
    <div
      className={`fixed w-full font-inter z-10 h-16 flex bg-zinc-800 justify-between items-center transition-all duration-[400ms] ${showNav ? "pl-56" : ""
        }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-white cursor-pointer"
          onClick={handleBarsIconClick}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <div
                className={`rounded-full mr-2 h-8 w-8 flex items-center justify-center text-white font-medium border-zinc-300 border ${getRandomColor()}`}
              >
                {getInitials(userName)}
              </div>
              <span className="hidden md:block font-medium text-white">
                {userName || 'Nome nao encontrado'}
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-white" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-zinc-900 rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <Link
                    href="./account"
                    className="flex hover:bg-yellow-600 hover:text-white hover:font-bold text-white rounded p-2 text-sm group transition-colors items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Minha Conta
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                  onClick={handleLogout}
                    className="flex hover:bg-yellow-600 hover:text-white hover:font-bold text-white rounded p-2 text-sm w-full group transition-colors items-center"
                  >
                    <ArrowLeftEndOnRectangleIcon className="h-4 w-4 mr-2" />
                    Sair da conta
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default TopBar;
