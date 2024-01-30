import * as React from 'react';
import Layout from './components/Layout';
import LineTable from './components/LineTable';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import {TrashIcon, PencilSquareIcon  } from '@heroicons/react/24/outline'
import Link from 'next/link';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import router from 'next/router';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDFWithAutoTable;
}


export default function MiniDrawer() {
  const [linhasDeDados, setLinhaDeDados] = useState<any[]>([]);
  const [totalInscricoes, setTotalInscricoes] = useState<number>(0);
  const [totalPagas, setTotalPagas] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedEditRow, setSelectedEditRow] = useState<string | null>(null);


  useEffect(() => {
    document.title = 'Joviada Coro - Inicio';

    // Adicione esta parte para buscar os participantes
    fetch('http://localhost/api/participants')
      .then(response => response.json())
      .then(data => setLinhaDeDados(data))
      .catch(error => console.error('Erro ao obter participantes:', error));
    fetch('http://localhost/api/totalPaidParticipants')
      .then(response => response.json())
      .then(data => setTotalPagas(data.totalPaid))  // Add a new state variable for total paid registrations
      .catch(error => console.error('Erro ao obter total de inscrições pagas:', error));
    fetch('http://localhost/api/totalParticipants')
      .then(response => response.json())
      .then(data => setTotalInscricoes(data.total))
      .catch(error => console.error('Erro ao obter total de inscrições:', error));

  }, []);
  const handleToggleRowSelect = (id: string, selected: boolean) => {
    setSelectedRows((prevSelectedRows) => {
      if (selected) {
        return [...prevSelectedRows, id];
      } else {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      }
    });
    if (selected) {
      setIsEditing(true);
      setSelectedEditRow(id);
    } else {
      // Desativar o modo de edição quando nenhuma linha está selecionada
      setIsEditing(false);
      setSelectedEditRow(null);
    }
  };

  const handleDeleteRows = async () => {
    // Substitua o modal pela caixa de diálogo do navegador
    const shouldDelete = window.confirm('Tem certeza de que deseja excluir as linhas selecionadas?');

    if (shouldDelete) {
      try {
        setIsDeleting(true);

        const deletePromises = selectedRows.map((rowId) =>
          fetch(`http://localhost/api/deleteparticipant/${rowId}`, {
            method: 'DELETE',
          })
        );

        await toast.promise(
          Promise.all(deletePromises),
          {
            loading: 'Excluindo linhas...',
            success: 'Linhas selecionadas excluídas com sucesso!',
            error: 'Erro ao excluir linhas. Tente novamente.',
          }
        );

        const updatedParticipants = linhasDeDados.filter(
          (dados) => !selectedRows.includes(dados.id)
        );
        setLinhaDeDados(updatedParticipants);
        setSelectedRows([]);
      } catch (error) {
        console.error('Erro ao excluir linhas do banco de dados:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };


  const handleDownloadPDF = () => {
    const pdf = new jsPDF() as jsPDFWithAutoTable;

    // Adicionar logo ao cabeçalho
    pdf.setTextColor(204, 102, 0); // Configura a cor do texto para amarelo (RGB)
    pdf.setFont("helvetica", "bold"); // Configura o estilo do texto para bold
    pdf.text('Retiro Reconstrução', 20, 20);

    // Restaura as configurações padrão de estilo
    pdf.setTextColor(0, 0, 0); // Configura a cor do texto de volta para preto
    pdf.setFont("helvetica", "bold");
    // Adicione a numeração à tabela
    const columns = ['Nº', 'Nome Completo', 'Data de nascimento', 'Numero de telefone', 'STATUS'];

    // Adicione os dados da tabela ao PDF
    const data = linhasDeDados.map((dados, index) => [
      index + 1,
      dados.name,
      dados.birthday,
      dados.phone,
      dados.status === 'pay' ? 'PAGO' : (dados.status === 'pending' ? 'PENDENTE' : dados.status)
    ]);

    pdf.autoTable({
      head: [columns],
      body: data,
      startY: 25 // Ajuste conforme necessário para deixar espaço para a logo
    });

    // Baixe o arquivo PDF
    pdf.save('inscricoes.pdf');
    setTimeout(function () {
      toast.success('PDF baixado com sucesso!');
    }, 500);
  };


  const handleEditRows = () => {
    // Redirecione para a página de edição com o ID da primeira linha selecionada
    if (selectedRows.length > 0) {
      const firstSelectedRowId = selectedRows[0];
      router.push(`/user/edit/${firstSelectedRowId}`);
    }
  };

  const shouldAddScrollBar = linhasDeDados.length > 9;

  return (
    <>
      <Layout>
        <div className={`gap-3 flex flex-col ${shouldAddScrollBar ? 'max-h-[600px] overflow-y-auto' : ''}`}>
          <div className='flex max-sm:flex-col max-sm:gap-1 gap-3'>
            <div className="relative w-full h-32 bg-cover bg-center bg-zinc-800 group rounded-lg overflow-hidden mt-4 shadow-lg transition duration-300 ease-in-out">
              <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center">
                <div>
                  <div className="text-white text-lg flex space-x-2 items-center">
                    <div className="bg-yellow-600 rounded-md p-2 flex items-center">
                      <i className="fas fa-toggle-off fa-sm text-yellow-300"></i>
                    </div>
                    <p>Inscrições totais</p>
                  </div>
                  <h3 className="text-white text-3xl mt-2 font-bold">
                    {totalInscricoes}
                  </h3>
                </div>
              </div>
            </div>
            <div className="relative w-full h-32 bg-cover bg-center bg-zinc-800 group rounded-lg overflow-hidden mt-4 shadow-lg transition duration-300 ease-in-out">
              <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center">
                <div>
                  <div className="text-white text-lg flex space-x-2 items-center">
                    <div className="bg-green-800 rounded-md p-2 flex items-center">
                      <i className="fas fa-toggle-off fa-sm text-yellow-300"></i>
                    </div>
                    <p>Inscrições pagas</p>
                  </div>
                  <h3 className="text-white text-3xl mt-2 font-bold">
                    {totalPagas}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="relative font-inter overflow-x-auto shadow-md sm:rounded-lg z-0 scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-zinc-800 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                   
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nome Completo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Data de Nascimento
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Telefone Celular
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {linhasDeDados.map((dados, index) => (
                  <LineTable
                    key={index}
                    conteudos={[dados.name, dados.birthday, dados.phone]}
                    status={dados.status as 'pay' | 'pending'}
                    id={dados.id}
                    onRowSelect={handleToggleRowSelect}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex justify-end gap-2'>
            {isEditing && (
              <button
                className={`bg-red-800 rounded-full text-white font-inter p-2 hover:bg-red-950 ${selectedRows.length === 0 || isDeleting ? 'cursor-not-allowed' : ''}`}
                onClick={handleDeleteRows}
                disabled={selectedRows.length === 0 || isDeleting}
              >
                <TrashIcon className='w-9' />
              </button>
            )}
            {isEditing && (
              <button
                className={`bg-blue-800 rounded-full text-white font-inter p-2 hover:bg-blue-950`}
                onClick={handleEditRows}
              >
                <PencilSquareIcon className='w-9' />
              </button>
            )}
            <button className='bg-yellow-800 rounded-full text-white font-inter p-2 hover:bg-blue-950' onClick={handleDownloadPDF}>
              <ArrowDownTrayIcon className='w-9' />
            </button>
            <Link className='bg-green-800 rounded-full text-white font-inter p-2 hover:bg-green-950' href='/user/add'><PlusIcon className='w-9' /></Link>
          </div>
        </div>
        <Toaster />
      </Layout>
    </>
  );
}
