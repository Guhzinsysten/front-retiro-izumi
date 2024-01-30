import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from './components/Layout';
import toast, { Toaster } from 'react-hot-toast';
import router from 'next/router';
import { format } from 'date-fns';


export default function AddPerson() {
    const { register, handleSubmit, setValue, getValues, reset } = useForm();

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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };
    const onSubmit = async (data: any) => {
        // 'data' contains the form values collected by react-hook-form
        const formattedDate = format(new Date(data.birthday), 'dd/MM/yyyy');

    try {
      const response = await fetch('http://localhost/api/addparticipant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          birthday: formattedDate, // Usando a data formatada
          phone: data.phone,
          status: data.status === 'PAGO' ? 'pay' : 'pending',
        }),
      });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.msg); // Log success message
                // You can add additional logic here if needed
                reset(); // Reset the form fields to their default values
                toast.success('Participante adicionado com sucesso!');
                router.push('/user/dash')
            } else {
                console.error('Error adding participant:', response.statusText);
                // Handle error as needed
            }
        } catch (error: any) {
            console.error('Error adding participant:', error.message);
            // Handle error as needed
        }
    };



    const handleClearFields = () => {
        reset(); // Reset the form fields to their default values
    };
    useEffect(() => {
        document.title = 'Joviada Coro - Adicionar Usuario';
    }, []);
    return (
        <Layout>
            <div className='flex flex-col w- gap-3 font-inter text-white text-2x1'>
                <h1 className='text-2xl'>Adicionar Participante</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div>
                        <label htmlFor="birthday">Data de Nascimento:</label>
                        <input
                            {...register('birthday', { required: true })}
                            type='date'
                            className="h-11 px-4 w-full rounded-md bg-zinc-800 focus:outline-yellow-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Telefone Celular:</label>
                        <input
                            {...register('phone', { required: true, minLength: 14 })}
                            className="h-11 px-4 w-full rounded-md bg-zinc-800 focus:outline-yellow-600 focus:outline-none"
                            onChange={handlePhoneChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="status">Status de pagamento:</label>
                        <select
                            {...register('status', { required: true })}
                            className="h-11 px-4 w-full rounded-md bg-zinc-800 focus:outline-yellow-600 focus:outline-none"
                        >
                            <option value="PAGO">PAGO</option>
                            <option value="PENDENTE">PENDENTE</option>
                        </select>
                    </div>
                    <div className='mt-3 max-lg:w-full w-1/2 flex gap-3 max-sm:flex-col'>
                        <button
                            type='button'
                            className='bg-red-900 rounded-md p-4 w-full'
                            onClick={handleClearFields}
                        >
                            Limpar campos
                        </button>
                        <button
                            className='bg-green-800 rounded-md p-4 w-full'
                            type='submit'
                        >
                            Adicionar Participante
                        </button>
                    </div>
                    <Toaster />
                </form>
            </div>
        </Layout>
    );
}