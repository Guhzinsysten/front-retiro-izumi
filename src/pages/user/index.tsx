import React, { useEffect, useState } from 'react';
import useRouter from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Axios from 'axios';

interface UserData {
  roles: string[];
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogout = () => {
    // Limpar o estado de autenticação no Local Storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('ID');

    // Redirecionar para a página de login após o logout
    router.push('/login');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      const response = await Axios.post('https://api.guhzin.shop/api/login', { email, password });

      toast.success(response.data.msg);

      // Salvando o estado de autenticação no Local Storage
      localStorage.setItem('isLoggedIn', 'true');

      // Salvando o nome do usuário no Local Storage
      localStorage.setItem('userName', response.data.user.name);
      localStorage.setItem('ID', response.data.user.id);
      // Redirecionar para a página do painel após o login
      router.push('/user/dash');
    } catch (error) {
      console.error(error);

      if (Axios.isAxiosError(error)) {
        // Tratar erros específicos do Axios
        if (error.response && error.response.status === 401) {
          toast.error('Credenciais inválidas. Tente novamente.');
        } else if (error.response && error.response.status === 404) {
          toast.error('Conta não encontrada.');
        } else {
          toast.error('Erro ao fazer login. Tente novamente.');
        }
      } else {
        // Tratar outros erros
        toast.error('Erro ao fazer login. Tente novamente.');
      }
    }
  };

  useEffect(() => {
    document.title = 'Joviada Coro - Login';
  }, []);
  
  return (
    <main className="flex min-h-screen bg-zinc-700 flex-col items-center justify-center p-4">
      <picture>
        <img
          className="w-80 h-auto rounded-xl"
          src="/logoretiro.png"
          alt="Logo Retiro"
        />
      </picture>
      <div className="p-6 w-full max-w-2xl text-white  rounded-xl bg-zinc-800">
        <h2 className="text-center text-2xl font-semibold py-4">Login Form</h2>
        <form className="flex flex-col items-start" onSubmit={handleSubmit}>
          <label>Email: </label>
          <input
            name="email"
            autoComplete='email'
            className="h-11 px-4 w-full rounded-md bg-zinc-700 focus:outline-yellow-600"
            type="email"
            required={true}
          />

          <br />
          <label>Password: </label>
          <input
            autoComplete='password'
            name="password"
            type="password"
            className="h-11 px-4 w-full rounded-md bg-zinc-700 focus:outline-yellow-600"
            required
          />

          <br />
          <div className="w-full justify-center items-center flex">
            <button
              className="rounded-full bg-yellow-700 py-3 text-2x1 font-medium px-7 hover:bg-yellow-800 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </main>
  );
};

export default LoginForm;
function setLoggedIn(arg0: boolean) {
  throw new Error('Function not implemented.');
}

