import {createContext, useContext} from "react";

type CheckboxListContextValue = {
    value: string[];
    onChange: (value: string, checked: boolean) => void;
};

const CheckboxListContext = createContext<CheckboxListContextValue | null>(null);

function useCheckboxList() {
    const context = useContext(CheckboxListContext);
    if (!context) {
        throw new Error('Must be rendered within a FormField!');
    }
    return context;
}

export { CheckboxListContext, useCheckboxList };
