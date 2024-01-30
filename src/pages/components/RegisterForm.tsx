import { useForm } from "react-hook-form";
import { useFormState } from "./FormContext";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import router from "next/router";
import toast, { Toaster } from "react-hot-toast";

type TFormValues = {
  name: string;
  email: string;
  birthday: string;
  phone: string;
  status: string;
};

interface PhoneInputProps {
  label: string;
}

const formatPhoneNumber = (input: string): string => {
  const cleaned = input.replace(/\D/g, "");
  const formatted = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  return formatted;
};

function formatDateToPTBR(birthday: string): string {
  const [year, month, day] = birthday.split('-');
  return `${day}/${month}/${year}`;
}

const RegisterForm: React.FC<PhoneInputProps> = ({ }) => {
  const { onHandleNext, setFormData, onHandleBack, formData } = useFormState();
  const [isCreated, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });
  const celRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    if (input.length > 14) {
      input = input.slice(0, 14);
    }

    const formattedPhone = formatPhoneNumber(input);
    setPhoneNumber(formattedPhone);
  };

  const onHandleFormSubmit = async (data: TFormValues) => {
    try {
      setLoading(true);
      const formattedBirthday = formatDateToPTBR(data.birthday);

      const result = await toast.promise(
        fetch('http://localhost/api/addparticipantes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            birthday: formattedBirthday,
            phone: phoneNumber,
          }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao enviar para o banco de dados');
            }
            return response.json();
          }),
        {
          loading: 'Carregando',
          success: 'Encaminhando para a página de pagamento',
          error: 'Erro ao enviar para o banco de dados',
        }
      );

      setFormData((prev: any) => ({ ...prev, ...data }));
      setCreated(true);

      const birthdayDate = new Date(data.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthdayDate.getFullYear();

      if (age >= 5 && age <= 11) {
        router.push('/payments/half');
      } else if (age >= 0 && age <= 4) {
        router.push('/payments/sucess');
      } else {
        router.push('/payments/whole');
      }

    } catch (error) {
      console.error('Erro ao adicionar participante:', error);
    } finally {
      setLoading(false);
    }
  };
  const [phoneNumber, setPhoneNumber] = useState("");

  const formatPhoneNumber = (input: string): string => {
    const cleaned = input.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    return formatted;
  };

  return (
    <form
      className="flex gap-1 flex-col"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <label htmlFor="name">Nome Completo</label>
      <input
        autoFocus
        id="name"
        type="text"
        {...register("name")}
        className="h-11 px-4 rounded-md bg-zinc-700 focus:outline-yellow-600 focus:outline-none"
        required={true}
      />
      <label htmlFor="email">Email</label>
      <input
        autoComplete="email"
        id="email"
        type="email"
        {...register("email")}
        className="h-11 px-4 rounded-md bg-zinc-700 focus:outline-yellow-600 focus:outline-none"
        required={true}
      />
      <label htmlFor="phone">Telefone Celular</label>
      <input
        id="phone"
        minLength={14}
        className="h-11 px-4 rounded-md bg-zinc-700 focus:outline-yellow-600 focus:outline-none"
        required={true}
        value={phoneNumber}
        onChange={handlePhoneChange}
      />
      <label htmlFor="birthday">Data de Nascimento</label>
      <input
        id="birthday"
        type="date"
        {...register("birthday")}
        className="h-11 px-4 rounded-md bg-zinc-700 focus:outline-yellow-600 focus:outline-none"
        required={true}
        maxLength={10}
      />
      <div className="flex gap-4 justify-end mt-4">
        <button
          type="button"
          onClick={onHandleBack}
          className="h-11 px-6 inline-block bg-zinc-500 font-semibold text-white rounded-full"
        >
          Voltar
        </button>
        <button
          type="submit"
          className={`h-11 px-6 inline-block ${loading ? "bg-gray-400" : "bg-yellow-600"} font-semibold text-white rounded-full`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center content-center">
              <span className="mr-2">Carregando</span>
              <ArrowPathIcon className="animate-spin h-5 w-5" />
            </div>
          ) : (
            "Próximo"
          )}
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default RegisterForm;
