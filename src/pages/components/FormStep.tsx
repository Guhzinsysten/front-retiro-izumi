import InfoForm from "./InfoFrom";
import React from 'react'
import RegisterForm from "./RegisterForm";
import { useFormState } from "./FormContext";

export default function FormStep() {
    const { step } = useFormState();
    switch (step) {
        case 1:
            return <InfoForm />;
        case 2:
            return <RegisterForm label={""} />;
    }
}