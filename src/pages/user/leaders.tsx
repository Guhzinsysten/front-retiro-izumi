import * as React from 'react';
import Layout from './components/Layout';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface UserData {
    name: string;
    email: string;
    id: string; // Adicione outros campos do usuário conforme necessário
}

export default function Leaders() {
    const [linhasDeDados, setLinhaDeDados] = useState<UserData[]>([]);
    useEffect(() => {
        document.title = 'Joviada Coro - Lideres';

        // Exemplo de chamada à API para obter a lista de usuários
        axios.get<UserData[]>('http://localhost/api/users')
            .then(response => {
                setLinhaDeDados(response.data); // Supondo que a resposta da API seja um array de objetos com os dados dos líderes
            })
            .catch(error => {
                console.error('Erro ao obter dados dos líderes:', error);
                toast.error('Erro ao obter dados dos líderes. Tente novamente.');
            });
    }, []);
    const shouldAddScrollBar = linhasDeDados.length > 9;

    return (
        <>
            <Layout>
                <div className={`gap-3 flex flex-col ${shouldAddScrollBar ? 'max-h-[600px] overflow-y-auto' : ''}`}>
                    <div className="relative font-inter overflow-x-auto shadow-md sm:rounded-lg z-0 scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-zinc-800 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nome Completo
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ação
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {linhasDeDados.map((usuario, index) => (
                                    <tr key={index} className={`odd:bg-white text-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800 border-b dark:border-gray-700`}>
                                        <td className={`px-6 py-4`}>
                                            {usuario.name}
                                        </td>
                                        <td className={`px-6 py-4`}>
                                            {usuario.email}
                                        </td>
                                        <td className={`px-6 py-4`}>
                                            <Link href={`/user/edit/leader/${usuario.id}`}>
                                                <span className='font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer'>
                                                    Edit
                                                </span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <Link className='bg-green-800 rounded-full text-white font-inter p-2 hover:bg-green-950' href='/user/addleader'><PlusIcon className='w-9' /></Link>
                    </div>
                </div>
                <Toaster />
            </Layout>
        </>
    );
}
