"use client";
import FormProvider from "./FormContext";
import FormStep from "./FormStep";


export default function Homes() {
    return (
        <main className="flex min-h-screen bg-zinc-700 flex-col items-center justify-center p-4">
            <picture>
                <img
                    className="w-80 h-auto rounded-xl"
                    src="logoretiro.png"
                    alt="Logo Retiro"
                />
            </picture>
            <div className="p-6 w-full max-w-2xl text-white  rounded-xl bg-zinc-800">
                <div className="space-y-6">
                    <FormProvider>
                        <FormStep />
                    </FormProvider>
                </div>
            </div>
        </main>
    );
}