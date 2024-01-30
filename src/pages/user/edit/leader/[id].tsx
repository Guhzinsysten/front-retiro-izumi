import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import axios from 'axios';

interface UserData {
  name: string;
  email: string;
  password: string;
}

export default function EditLeader() {
  const { register, handleSubmit, setValue, reset } = useForm<UserData>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const userId = router.query.id;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fetchData = async (userId: string) => {
    try {
      const response = await axios.get(`https://api.guhzin.shop/api/users/${userId}`);
      const userData: UserData = response.data;
      setValue('name', userData.name);
      setValue('email', userData.email);
      setValue('password', userData.password);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Error fetching user data. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Essa ação é irreversível.')) {
      try {
        const response = await axios.delete(`https://api.guhzin.shop/api/deleteuser/${userId}`);
        console.log(response.data); // Log the response for debugging
        toast.success('Conta excluída com sucesso!');
        router.push('/user/leaders'); // Redireciona para a página inicial ou qualquer outra página desejada
      } catch (error) {
        console.error('Error deleting user account:', error);
        toast.error('Error deleting user account. Please try again.');
      }
    }
  };

  const handleSubmitForm = async (data: UserData) => {
    try {
      const response = await axios.put(`https://api.guhzin.shop/api/edituser/${userId}`, data);
      console.log(response.data); // Log the response for debugging
      reset();
      toast.success('Usuario editado com sucesso!');
      router.push('/user/leaders');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 409) {
        toast.error('Email já cadastrado para outro usuário. Por favor, escolha outro email.');
      } else {
        console.error('Error editing user data:', error);
        toast.error('Error editing user data. Please try again.');
      }
    }
  };



  useEffect(() => {
    document.title = 'Joviada Coro - Editar Lider';
    if (userId) {
      const idString = Array.isArray(userId) ? userId[0] : userId;
      fetchData(idString);
    }
  }, [userId]);

  return (
    <Layout>
      <div className='flex flex-col w- gap-3 font-inter text-white text-2xl'>
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
              className='bg-red-800 rounded-md p-4 w-full'
              type='button'
              onClick={handleDeleteAccount}
            >
              Deletar Conta
            </button>
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
