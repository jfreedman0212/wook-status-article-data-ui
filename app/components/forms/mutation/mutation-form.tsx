import {ReactNode, useMemo} from "react";
import {Form as RemixForm, useNavigation} from "@remix-run/react";
import styles from "./mutation-form.module.css";
import {FormSubmissionAction, MutationFormContext} from "./mutation-form-context";

type Confirmation = Record<FormSubmissionAction, string>;

type MutationFormMethod = 'post' | 'put' | 'delete';

type MutationFormProps = {
    action?: string;
    method?: Uppercase<MutationFormMethod> | Lowercase<MutationFormMethod>;
    actionName?: string;
    confirmation?: Confirmation;
    encType?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | undefined;
    children: ReactNode;
};

function MutationForm(props: MutationFormProps) {
    const { 
        action,
        method = 'post',
        actionName = 'action',
        confirmation,
        encType,
        children
    } = props;
    
    const context = useMemo(() => ({ name: actionName }), [actionName]);
    
    return (
        <RemixForm 
            className={styles.form}
            action={action}
            method={method}
            encType={encType}
            onSubmit={confirmation ? (e) => {
                // we only do this to implement the delete confirmation. of course, the user won't
                // have it if JS isn't available, but it will at least still work
                const nativeEvent = e.nativeEvent as SubmitEvent;
                const formData = new FormData(nativeEvent.target as HTMLFormElement, nativeEvent.submitter);
                const action = formData.get(actionName);
                
                // if we have a confirmation configured AND they agree to the confirmation, or
                // we don't have one configured, submit the form
                if (typeof action !== 'string' || !confirmation?.[action] || confirm(confirmation[action])) {
                    return true;
                }

                // otherwise, prevent the submission from going through
                e.preventDefault();
                return false;
            } : undefined}
        >
            <MutationFormContext.Provider value={context}>
                {children}
            </MutationFormContext.Provider>
        </RemixForm>
    );
}

type FormFieldsProps = {
    children: ReactNode;
};

function FormFields({ children }: FormFieldsProps) {
    const { state } = useNavigation();
    
    return (
        <fieldset className={styles.fieldset} disabled={state !== 'idle'}>
            {children}
        </fieldset>
    );
}

type PrimaryButtonProps = {
    children: ReactNode;
};

function PrimaryButtons({ children }: PrimaryButtonProps) {
    return (
        <div className={styles.primaryButtons}>
            {children}
        </div>
    );
}

type SecondaryButtonsProps = {
    children: ReactNode;
}

function SecondaryButtons({ children }: SecondaryButtonsProps) {
    return (
        <div className={styles.secondaryButtons}>
            {children}
        </div>
    );
}

export {MutationForm, FormFields, PrimaryButtons, SecondaryButtons};
