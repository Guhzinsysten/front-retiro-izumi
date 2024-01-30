import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import toast, { Toaster } from 'react-hot-toast';
import router, { useRouter } from 'next/router';

interface ParticipantData {
    id: number;
    name: string;
    email: string;
    birthday: string;
    phone: string;
    status: string;
}

export default function EditPerson() {
    const [participantData, setParticipantData] = useState<any>({});
    const { query } = useRouter();
    const { register, handleSubmit, setValue, reset } = useForm<ParticipantData>();

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

    const handleDeleteParticipant = async () => {
        // Display a confirmation dialog before proceeding with deletion
        const isConfirmed = window.confirm("Tem certeza de que deseja excluir este participante?");
    
        if (!isConfirmed) {
            return;
        }
    
        try {
            const response = await fetch(`https://api.guhzin.shop/api/deleteparticipant/${participantData.id}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                toast.success('Participante excluído com sucesso!');
                router.push('/user/dash');
            } else {
                toast.error('Erro ao excluir participante. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao excluir participante:', error);
            toast.error('Erro ao excluir participante. Por favor, tente novamente.');
        }
    };
    
    const handleSubmitForm = async (data: ParticipantData) => {
        // Map the status to the desired values
        const mappedStatus = data.status === 'PENDENTE' ? 'pending' : data.status === 'PAGO' ? 'pay' : data.status;
    
        const newData = {
            ...data,
            status: mappedStatus,
        };
    
        console.log(`Name: ${newData.name} Email: ${newData.email} Birthday: ${newData.birthday} Phone: ${newData.phone} Status: ${newData.status}`);
        reset();
    
        try {
            const response = await fetch(`https://api.guhzin.shop/api/editparticipant/${participantData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
    
            if (response.ok) {
                toast.success('Participante editado com sucesso!');
                router.push('/user/dash');
                reset();
            } else {
                toast.error('Erro ao editar participante. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao editar participante:', error);
            toast.error('Erro ao editar participante. Por favor, tente novamente.');
        }
    };

    const handleClearFields = () => {
        reset();
    };

    useEffect(() => {
        document.title = 'Joviada Coro - Editar Participante';
        if (query?.id) {
            fetch(`https://api.guhzin.shop/api/participants/${query.id}`)
                .then(response => response.json())
                .then((data: ParticipantData) => {
                    // Change 'fethData' to 'participantData' here as well
                    setParticipantData(data);
                    // Preencher os campos do formulário com os dados obtidos
                    setValue('name', data.name);
                    setValue('email', data.email);
                    setValue('birthday', data.birthday);
                    setValue('phone', data.phone);
    
                    // Map the status to the desired values when setting the value
                    const mappedStatus = data.status === 'pending' ? 'PENDENTE' : data.status === 'pay' ? 'PAGO' : data.status;
                    setValue('status', mappedStatus);
                })
                .catch(error => console.error('Erro ao obter participante:', error));
        }
    }, [query, setValue]);

    return (
        <Layout>
            <div className='flex flex-col w- gap-3 font-inter text-white text-2x1'>
                <h1 className='text-2xl'>Editar Participante</h1>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div>
                        <label htmlFor="name">Nome Completo:</label>
                        <input
                            {...register('name', { required: true })}
                            defaultValue={participantData?.name}
                            type='text'
                            className="h-11 px-4 w-full rounded-md bg-zinc-800 focus:outline-yellow-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            {...register('email', { required: true })}
                            defaultValue={participantData?.email}
                            type='email'
                            className="h-11 px-4 w-full rounded-md bg-zinc-800 focus:outline-yellow-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="birthday">Data de Nascimento:</label>
                        <input
                            {...register('birthday', { required: true })}
                            defaultValue={participantData?.date}
                            type='text'
                            className="h-11 px-4 w-full rounded-md bg-zinc-800 focus:outline-yellow-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Telefone Celular:</label>
                        <input
                            defaultValue={participantData?.cel}
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
                        className='bg-red-800 rounded-md p-4 w-full'
                        onClick={handleDeleteParticipant}
                    >
                        Deletar Participante
                    </button>
                        <button
                            className='bg-green-800 rounded-md p-4 w-full'
                            type='submit'
                        >
                            Editar Participante
                        </button>
                    </div>
                    <Toaster />
                </form>
            </div>
        </Layout>
    );
}