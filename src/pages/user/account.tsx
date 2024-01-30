import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from './components/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Axios from 'axios';

export default function EditAccount() {
    const { register, handleSubmit, setValue, getValues, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário

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

    const handleSubmitForm = async (data: any) => {
        try {
            // Atualize os dados do usuário no backend
            await Axios.put(`http://localhost/api/edituser/${id}`, {
                name: data.name,
                email: data.email,
                password: data.password,
                // Adicione outros campos, se necessário
            });
    
            reset();
            toast.success('Dados editados com sucesso!');
        } catch (error) {
            console.error('Erro ao editar dados do usuário:', error);
            toast.error('Erro ao editar dados do usuário. Tente novamente.');
        }
    };
    const [id, setID] = useState('');
    useEffect(() => {
        document.title = 'Joviada Coro - Minha Conta';
        const storedID = localStorage.getItem('ID');
        setID(storedID || '');
        
        const fetchUserData = async () => {
            try {
                const response = await Axios.get(`http://localhost/api/users/${storedID}`);
                setUserData(response.data);
                setValue('name', response.data.name);
                setValue('email', response.data.email);
                // Set other form values if needed
            } catch (error) {
                console.error('Erro ao obter dados do usuário:', error);
            }
        };
    
        if (storedID) {
            fetchUserData();
        }
    }, [setValue, id]);
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Layout>
            <div className='flex flex-col w- gap-3 font-inter text-white text-2x1'>
                <h1 className='text-2xl'>Minha Conta</h1>
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
                            Editar minha conta
                        </button>
                    </div>
                    <Toaster />
                </form>
            </div>
        </Layout>
    );
}
