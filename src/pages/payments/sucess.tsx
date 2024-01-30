import { CheckCircleIcon } from "@heroicons/react/24/outline"

export default function() {
    return(
        <div className="bg-green-500 w-screen h-screen justify-center items-center content-center flex flex-col gap-1">
            <CheckCircleIcon 
                className="text-white w-40"
            />
            <h1 className="text-white text-4xl">SUCESSO</h1>
            <h1 className="text-white text-2xl">Inscrição enviada com sucesso!</h1>
        </div>
    )
}