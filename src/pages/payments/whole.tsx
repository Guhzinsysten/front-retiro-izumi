import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import clipboardCopy from 'clipboard-copy';

export default function PaymentSelectionWhole() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newOption = event.target.value;

        setSelectedOption((prevOption) => {
            // Adicione lógica de transição aqui conforme necessário
            return newOption === prevOption ? null : newOption;
        });
    };

    const handleCopyPix = () => {
        const pixContent = "00020126580014BR.GOV.BCB.PIX01364020319b-f23e-4f77-9dcd-f100e06059ce5204000053039865406180.005802BR5906Retiro6010Coromandel62070503***6304AF64";
    
        try {
            // Tentativa de copiar para a área de transferência usando clipboard-copy
            clipboardCopy(pixContent);
            console.log("Conteúdo PIX copiado com sucesso!");
            toast.success('Conteúdo PIX copiado com sucesso!');
        } catch (error) {
            console.error("Erro ao copiar o conteúdo PIX:", error);
            toast.error('Erro ao copiar o conteúdo PIX');
        }
    };

    return (
        <div className="flex min-h-screen bg-zinc-700 flex-col items-center justify-center md-20 p-4 font-inter">
            <picture>
                <img
                    className="w-80 h-auto rounded-xl"
                    src="/logoretiro.png"
                    alt="Logo Retiro"
                />
            </picture>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6 w-full max-w-2xl text-white flex flex-col items-center justify-center rounded-xl bg-zinc-800 gap-3"
            >
                <div className='flex flex-col justify-start gap-2 w-full'>
                    <label htmlFor="paymentMethod">Método de Pagamento:</label>
                    <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={selectedOption || ''}
                        onChange={handleSelectChange}
                        className="h-11 px-4 w-full rounded-md bg-zinc-700 focus:outline-yellow-600 focus:outline-none"
                    >
                        <option value="">Selecione...</option>
                        <option value="pix">PIX</option>
                        <option value="cartao">Cartão (parcelado em até 3x)</option>
                    </select>
                </div>

                <motion.div
                    key={selectedOption} // Adicionando uma chave para forçar a reinicialização da animação
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    {selectedOption === 'pix' && (
                        <div className='flex flex-col justify-center items-center '>
                            <label className='text-white text-2xl'>Valor da compra:</label>
                            <label className='text-yellow-600 text-2xl font-bold'>R$ 180,00</label>
                            <div className='gap-3 flex flex-col mt-1'>
                                <picture>
                                    <img
                                        className="w-40 h-auto rounded-xl"
                                        src="/pix-180.png"
                                        alt="Pix 180"
                                    />
                                </picture>
                                <button onClick={handleCopyPix} className='flex items-center justify-center gap-3 text-xl rounded-xl border-2'>
                                    Copiar PIX
                                    <ClipboardDocumentIcon className="h-7 w-auto  text-white " />
                                </button>
                            </div>
                            <div className='flex flex-col gap-2 mt-3'>
                                <h1 className='text-white text-[20px] font-bold flex'>Instruções para pagamento:</h1>
                                <div className="gap-3 flex flex-col">
                                    <label className='flex'>
                                        <h1 className='rounded-full bg-zinc-800 text-white font-bold text-xl justify-center items-center flex flex-col w-5 h-5'>1.</h1>
                                        <h2>Abra o APP do seu banco ou instituição fincanceira e acesse o ambiente Pix.</h2>
                                    </label>
                                    <label className='flex'>
                                        <h1 className='rounded-full bg-zinc-800 text-white font-bold text-xl justify-center items-center flex flex-col w-5 h-5'>2.</h1>
                                        <h2>Escolha a opção pagar com QR Code e escaneie a imagem acima.</h2>
                                    </label>
                                    <label className='flex'>
                                        <h1 className='rounded-full bg-zinc-800 text-white font-bold text-xl justify-center items-center flex flex-col w-5 h-5'>3.</h1>
                                        <h2>Confirme as informações e finalize a compra.</h2>
                                    </label>
                                    <label className='flex'>
                                        <h1 className='rounded-full bg-zinc-800 text-white font-bold text-xl justify-center items-center flex flex-col w-5 h-5'>4.</h1>
                                        <h2>Após finalizar o pagamento, envie comprovante para o número <br /> (34) 99338-9684.</h2>
                                    </label>
                                </div>
                            </div>
                            <div className='justify-end flex items-end w-full mt-3'>
                                <Link className="bg-green-900 text-white font-bold text-xl rounded-xl p-2" href="https://wa.me/5534993389684?text=Ol%C3%A1,%20finalizei%20a%20minha%20inscri%C3%A7%C3%A3o%20no%20Retiro%20Reconstru%C3%A7%C3%A3o,%20segue%20o%20comprovante%20de%20PIX:">
                                    Enviar comprovante
                                </Link>
                            </div>
                        </div>
                    )}

                    {selectedOption === 'cartao' && (
                        <div className='flex flex-col justify-center items-center '>
                            <label className='text-white text-2xl'>Valor da compra:</label>
                            <label className='text-yellow-600 text-2xl font-bold'>R$ 200,00</label>
                            <div className='flex flex-col gap-2 mt-3'>
                                <h1 className='text-white text-[20px] font-bold flex'>Instruções para pagamento:</h1>
                                <div className="gap-3 flex flex-col">
                                    <label className='flex'>
                                        <h1 className='rounded-full bg-zinc-800 text-white font-bold text-xl justify-center items-center flex flex-col w-5 h-5'>1.</h1>
                                        <h2>Clique no botão avançar.</h2>
                                    </label>
                                    <label className='flex'>
                                        <h1 className='rounded-full bg-zinc-800 text-white font-bold text-xl justify-center items-center flex flex-col w-5 h-5'>2.</h1>
                                        <h2>Você será encaminhado(a) para a página de pagamento segura.</h2>
                                    </label>
                                    <label className='flex'>
                                        <h1 className='rounded-full bg-zinc-800 text-white font-bold text-xl justify-center items-center flex flex-col w-5 h-5'>3.</h1>
                                        <h2>Confirme as informações e finalize a compra.</h2>
                                    </label>
                                    <label className='flex'>
                                        <h1 className='rounded-full bg-zinc-800 text-white font-bold text-xl justify-center items-center flex flex-col w-5 h-5'>4.</h1>
                                        <h2>Após finalizar o pagamento, envie comprovante para o número <br /> (34) 99338-9684.</h2>
                                    </label>
                                </div>
                            </div>
                            <div className='justify-end flex items-end w-full mt-3'>
                                <Link className="bg-yellow-800 text-white font-bold text-xl rounded-xl p-2" href="https://link.stone.com.br/t/chk_ErWQ1n7UjcxDmM9q">
                                    Avançar
                                </Link>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
            <Toaster />
        </div>
    );
}
