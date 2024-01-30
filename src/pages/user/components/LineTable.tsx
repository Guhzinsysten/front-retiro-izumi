// components/LineTable.tsx

import Link from 'next/link';
import React from 'react';

interface LineTableProps {
  id: string;
  conteudos?: string[];
  status: 'pay' | 'nopay' | 'pending' | 'canceled';
  onRowSelect: (id: string, selected: boolean) => void;
}

const LineTable: React.FC<LineTableProps> = ({ conteudos = [], status, id, onRowSelect }) => {
  let corFundo = '';
  let text = '';
  let wid = '';

  switch (status) {
    case 'pay':
      corFundo = 'bg-green-800';
      wid= 'w-16'
      text = 'PAGO';
      break;
    case 'pending':
      corFundo = 'bg-yellow-700';
      text = 'PENDENTE';
      wid= 'w-24'
      break;
    default:
      corFundo = '';
  }

  return (
    <tr className={`odd:bg-white text-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800 border-b dark:border-gray-700`}>
      <td className="px-6 py-4">
        <input
          type="checkbox"
          onChange={(e) => onRowSelect(id, e.target.checked)}
        />
      </td>
      {conteudos!.map((conteudo, index) => (
        <td key={index} className={`px-6 py-4 ${index === conteudos.length - 1 ? 'text-start' : ''}`}>
          {conteudo}
        </td>
      ))}
      <td className={`px-6 py-4`}>
        <div className={`rounded-full px-2 ${wid} items-center flex content-center justify-center ${corFundo}`}>
          <h1 className={`text-white`}>
            {text}
          </h1>
        </div>
      </td>
    </tr>
  );
};

export default LineTable;
