import { useForm } from "react-hook-form";
import { useFormState } from "./FormContext";
import React from 'react'

type TFormValues = {
};

export default function InfoForm() {
  const { onHandleNext, setFormData, formData } = useFormState();
  const { handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: TFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext();
  };

  return (
    <form
      className="flex flex-col gap-4 font-inter"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <div className="flex flex-col justify-center items-start text-lg gap-3">
        <div className="flex flex-col">
          <label className="font-bold text-xl">Data:</label>
          <label>Dias 10, 11, 12 e 13 de feveiro</label>
        </div>
        <div>
        <div className="flex flex-col">
          <label className="font-bold text-xl">Local:</label>
          <label>Clube campestre</label>
        </div>
          <picture>
            <img
              className="w-56 h-auto rounded-xl"
              src="/clube.jpg"
              alt="Clube campestre"
            />
          </picture>
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-xl">Valores:</label>
          <label>Inteira:</label>
          <label>R$180,00 (PIX)</label>
          <label>R$200,00 (Cartão em até 3x)</label>
          <label className="mt-2">Meia (5 a 11 anos):</label>
          <label>R$90,00 (PIX)</label>
          <label>R$100,00 (Cartão em até 3x)</label>
          <label className="mt-2">Entrada franca (0 a 4 anos)</label>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="h-11 px-6 inline-block bg-yellow-600 font-semibold text-white rounded-full">
          Próximo
        </button>
      </div>
    </form>
  );
}
