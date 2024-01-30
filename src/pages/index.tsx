import { Inter } from 'next/font/google'
import Homes from './components/Home'
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  useEffect(() => {
    document.title = 'Joviada Coro - Retiro Reconstrução';
  }, []);
  return (
   <>
      <Homes />
   </>
  )
}
