import {createContext, useContext} from "react";

type FormFieldContextValue = {
    name: string;
    fieldId: string;
    errorId?: string;
    hintId?: string;
    required?: boolean;
};

type UseFormFieldResult = {
    id: string;
    name: string;
    required?: boolean;
    'aria-invalid': 'true' | 'false';
    'aria-errormessage'?: string;
    'aria-describedby'?: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

function useFormField(): UseFormFieldResult {
    const context = useContext(FormFieldContext);
    if (!context) {
        throw new Error('Must be rendered within a FormField!');
    }
    
    const { name, fieldId, errorId, hintId, required } = context;
    
    return {
        id: fieldId,
        name,
        required,
        ['aria-invalid']: errorId ? 'true' : 'false',
        ['aria-errormessage']: errorId,
        ['aria-describedby']: hintId ? 'true' : 'false'
    };
}

export { FormFieldContext, useFormField };
