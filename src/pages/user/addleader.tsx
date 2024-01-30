import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from './components/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Axios from 'axios';


export default function EditAccount() {
    const { register, handleSubmit, setValue, getValues, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const formatPhoneNumber = (input: string): string => {
        const cleaned = input.replace(/\D/g, "");
        const formatted = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        return formatted;
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;

        if (input.length > 14) {
            input = input.slice(0, 14);
        }

        const formattedPhone = formatPhoneNumber(input);
        setValue('phone', formattedPhone);
    };

    const handleSubmitForm = (data: any) => {
        // Customize the console.log messages and order as needed
        console.log(`Name: ${data.name} Email: ${data.email} Password: ${data.password}`);
        reset();
        Axios.post('http://localhost/api/addleaders', {
            email: data.email,
            name: data.name,
            password: data.password, 
        }).then((reponse) => {
            toast.success('Lider adicionado com sucesso!')
            console.log(reponse);
        })
    };
    useEffect(() => {
        document.title = 'Joviada Coro - Minha Conta';
    }, []);



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Layout>
            <div className='flex flex-col w- gap-3 font-inter text-white text-2x1'>
                <h1 className='text-2xl'>Adicionar Líder</h1>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div>
                        <label htmlFor="name">Nome Completo:</label>
                        <input
                            {...register('name', { required: true })}
                            type='text'
                            className="h-11 px-4 w-full rounded-md bg-zinc-800 focus:outline-yellow-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            {...register('email', { required: true })}
                            type='email'
                            className="h-11 px-4 w-full rounded-md bg-zinc-800 focus:outline-yellow-600 focus:outline-none"
                        />
                    </div>

                    <label htmlFor="password">Senha</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            id="password"
                            {...register("password")}
                            required={true}
                            className="h-11 px-4 w-full rounded-md bg-zinc-800 focus:outline-yellow-600 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-white" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-white" />
                            )}
                        </button>
                    </div>
                    <div className='mt-3 max-lg:w-full w-1/2 flex gap-3 max-sm:flex-col'>
                        <button
                            className='bg-green-800 rounded-md p-4 w-full'
                            type='submit'
                        >
                            Adcionar Lider
                        </button>
                    </div>
                    <Toaster />
                </form>
            </div>
        </Layout>
    );
}