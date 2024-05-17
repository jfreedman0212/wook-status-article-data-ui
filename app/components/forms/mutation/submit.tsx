import {useNavigation} from "@remix-run/react";
import {Button} from "~/components/buttons";
import {Spinner} from "~/components/forms";
import {FormSubmissionAction, useMutationForm} from "./mutation-form-context";
import {forwardRef, ReactNode} from "react";
import {Link} from "~/components/links";

type SubmitProps = {
    variant?: 'primary' | 'destructive';
    value?: FormSubmissionAction;
    text?: string;
    loadingText?: string;
};

function useSubmitState(value?: FormSubmissionAction) {
    const { state, formData } = useNavigation();
    const { name } = useMutationForm();
    const loading = state !== 'idle';
    const saving = loading && formData?.get(name) === value;
    
    return { name, loading, saving };
}

const Submit = forwardRef<HTMLButtonElement, SubmitProps>((props, ref) => {
    const {
        variant = 'primary',
        value = 'save',
        text = 'Save',
        loadingText = 'Saving'
    } = props;
    
    const { name, loading, saving } = useSubmitState(value);    

    return (
        <Button 
            variant={variant}
            type='submit'
            name={name}
            value={value} 
            aria-live='polite'
            disabled={loading}
            ref={ref}
        >
            {saving ? (
                <>
                    <Spinner />
                    <span>{loadingText}</span>
                </>
            ) : text}
        </Button>
    );
});
Submit.displayName = 'Submit';

type CancelProps = {
    to: string;
    children?: ReactNode;
};

function Cancel({ to, children = 'Cancel' }: CancelProps) {
    const { loading } = useSubmitState();
    
    return (
        <Link to={to} aria-disabled={loading ? 'true' : 'false'}>
            {children}
        </Link>
    );
}

export { Submit, Cancel };
