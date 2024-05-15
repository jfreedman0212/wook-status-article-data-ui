import {useActionData} from "@remix-run/react";

function useValidationErrors() {
    return useActionData<Record<string,  string[]> | null>();
}

function useFieldValidationErrors(name: string) {
    const badRequestResponse = useValidationErrors();
    const errors: string[] = [];

    if (badRequestResponse) {
        for (const key in badRequestResponse) {
            if (key.toLowerCase() === name.toLowerCase() && badRequestResponse[key]) {
                errors.push(...badRequestResponse[key]);
            }
        }
    }
    
    return errors;
}

export { useFieldValidationErrors, useValidationErrors };
