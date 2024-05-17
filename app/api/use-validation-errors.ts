import {useActionData, useNavigation} from "@remix-run/react";

function useValidationErrors() {
    return useActionData<Record<string,  string[]> | null>();
}

function useFieldValidationErrors(name: string) {
    const { state } = useNavigation();
    const badRequestResponse = useValidationErrors();
    
    if (state !== 'idle') {
        return [];
    }
    
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
