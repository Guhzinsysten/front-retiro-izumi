import React, { useState, useEffect, Fragment, ReactNode, Dispatch, SetStateAction } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";
import router from "next/router";

interface LayoutProps {
  children: ReactNode;
}

interface TopBarProps {
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  const [showNav, setShowNav] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  function handleResize(): void {
    if (window.innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      // Redirecionar para a página de login se não estiver logado
      router.push('/user/');
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg-zinc-700 h-screen w-screen">
        <TopBar showNav={showNav} setShowNav={setShowNav} />
        <Transition
          as={Fragment}
          show={showNav}
          enter="transform transition duration-[400ms]"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform duration-[400ms] transition ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Sidebar showNav={showNav} />
        </Transition>
        <main
          className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "pl-56" : ""
            }`}
        >
          <div className="p-4 z-0 bg-zinc-700 h-full w-full">{children}</div>
        </main>
      </div>
    </>
  );
}
