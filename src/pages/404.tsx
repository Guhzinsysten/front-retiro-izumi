import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex min-h-screen bg-zinc-700 flex-col items-center justify-center md-20 p-4 font-inter">
            <picture>
                <img
                    className="w-80 h-auto rounded-xl"
                    src="/logoretiro.png"
                    alt="Logo Retiro"
                />
            </picture>
            <div className="p-6 w-full max-w-2xl text-white flex flex-col items-center justify-center rounded-xl bg-zinc-800 gap-3" >
                <h1>Ops! Não encontramos essa página...</h1>
                <Link href='/' className="bg-yellow-700 p-2 rounded-xl mt-3 text-xl">Voltar para o inicio</Link>
            </div>
        </div>
    );
}

export default NotFound;