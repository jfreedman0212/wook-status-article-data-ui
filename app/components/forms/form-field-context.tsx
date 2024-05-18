import {createContext, ReactNode, useContext} from "react";
import {useFieldValidationErrors} from "~/api/use-validation-errors";

type FormFieldContextValue = {
    name: string;
    fieldId: string;
    errorId?: string;
    errors: ReactNode[];
    hintId?: string;
    hints: ReactNode[];
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

type FormFieldProviderProps = {
    name: string;
    fieldId: string;
    hint: ReactNode | ReactNode[];
    required?: boolean;
    children: ReactNode;
};

function FormFieldProvider({ name, fieldId, hint, required, children }: FormFieldProviderProps) {
    const errors = useFieldValidationErrors(name);
    let hints: ReactNode[] = [];
    if (hint instanceof Array) {
        hints = hint;
    } else if (hint) {
        hints = [hint];
    }
    
    const value = {
        name,
        fieldId,
        errorId: `${fieldId}__error`,
        errors: errors,
        hintId: `${fieldId}__hint`,
        hints,
        required
    };
    
    return (
        <FormFieldContext.Provider value={value}>
            {children}
        </FormFieldContext.Provider>
    );
}

function useFormField(): UseFormFieldResult {
    const context = useContext(FormFieldContext);
    if (!context) {
        throw new Error('Must be rendered within a FormField or a CheckboxList!');
    }
    
    const { name, fieldId, errorId, errors, hintId, hints, required } = context;
    
    return {
        id: fieldId,
        name,
        required,
        ['aria-invalid']: errors.length > 0 ? 'true' : 'false',
        ['aria-errormessage']: errors.length > 0 ? errorId : undefined,
        ['aria-describedby']: hints.length > 0 ? hintId : undefined
    };
}

function useHints() {
    const context = useContext(FormFieldContext);
    if (!context) {
        throw new Error('Must be rendered within a FormField or a CheckboxList!');
    }
    
    return { hints: context.hints, hintId: context.hintId };
}

function useFormErrors() {
    const context = useContext(FormFieldContext);
    if (!context) {
        throw new Error('Must be rendered within a FormField or a CheckboxList!');
    }

    return { errors: context.errors, errorId: context.errorId };
}

export { FormFieldProvider, useFormField, useHints, useFormErrors };
