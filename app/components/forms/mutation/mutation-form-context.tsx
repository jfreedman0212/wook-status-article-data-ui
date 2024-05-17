import {createContext, useContext} from "react";

type MutationFormContextValue = {
    name: string;
};

type FormSubmissionAction = 'save' | 'delete' | string;

const MutationFormContext = createContext<MutationFormContextValue | null>(null);

function useMutationForm(): MutationFormContextValue {
    const context = useContext(MutationFormContext);
    
    if (!context) {
        throw new Error('Must be rendered within a MutationForm!');
    }

    return context;
}

export {
    type FormSubmissionAction,
    MutationFormContext,
    useMutationForm
};
