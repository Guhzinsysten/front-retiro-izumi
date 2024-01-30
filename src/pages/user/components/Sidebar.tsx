import React, { forwardRef, ForwardedRef } from 'react';
import Link from "next/link";
import { HomeIcon, UserIcon, CalendarDaysIcon, UsersIcon } from "@heroicons/react/24/solid";
import useRouter from "next/router";

interface SideBarProps {
  showNav: boolean;
}


const SideBar = forwardRef(({ showNav }: SideBarProps, ref: ForwardedRef<HTMLDivElement>) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed font-inter w-56 h-full bg-zinc-800 shadow-sm z-10">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 mt-8 h-auto"
            src="/logoretiro.png"
            alt="Logo Joviada"
          />
        </picture>
      </div>

      <div className="flex flex-col">
        <Link href="/user/dash">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/user/dash"
              ? "bg-zinc-700 text-yellow-700"
              : "text-white hover:bg-zinc-900 hover:text-yellow-700"
              }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Inicio</p>
            </div>
          </div>
        </Link>
        <Link href="/user/account">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/user/account"
              ? "bg-zinc-700 text-yellow-700"
              : "text-white hover:bg-zinc-900 hover:text-yellow-700"
              }`}
          >
            <div className="mr-2">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Minha conta</p>
            </div>
          </div>
        </Link>
        <Link href="/user/leaders">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/user/leaders"
              ? "bg-zinc-700 text-yellow-700"
              : "text-white hover:bg-zinc-900 hover:text-yellow-700"
              }`}
          >
            <div className="mr-2">
              <UsersIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Lideres</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;