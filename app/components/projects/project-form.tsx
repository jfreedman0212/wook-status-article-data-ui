import {Project, ProjectType} from "~/models/project";
import {Form, FormMethod} from "@remix-run/react";
import {Button} from "~/components/buttons";
import {Link} from "~/components/links";
import styles from "./project-form.module.css";
import {IMaskInput} from "react-imask";
import IMask from "imask";

type ProjectFormProps = {
    variant: 'new' | 'existing';
    defaultValues?: Project;
    action?: string;
    method?: FormMethod;
};

function ProjectForm({ variant, defaultValues, action, method = 'post' }: ProjectFormProps) {
    const createdAtDate = defaultValues?.createdAt?.toISODate() ?? '';
    const createdAtTime = defaultValues?.createdAt?.toUTC().toFormat('HH:mm') ?? '';

    return (
        <Form 
            className={styles.form}
            action={action} 
            method={method}
        >
            <input type="text" name='name' placeholder='Name' defaultValue={defaultValues?.name}/>
            <select name='type' defaultValue={defaultValues?.type}>
                <option value={ProjectType.CATEGORY}>Category</option>
                <option value={ProjectType.INTELLECTUAL_PROPERTY}>Intellectual Property</option>
            </select>
            {variant === 'new' ? (
                <>
                    <input type='date' name='createdAtDate' defaultValue={createdAtDate}/>
                    <IMaskInput
                        name='createdAtTime'
                        defaultValue={createdAtTime}
                        mask="hh:mm"
                        blocks={{
                            'hh': {
                                mask: IMask.MaskedRange,
                                from: 0,
                                to: 23
                            },
                            'mm': {
                                mask: IMask.MaskedRange,
                                from: 0,
                                to: 59
                            }
                        }}
                        lazy
                        autofix
                    />
                </>
            ) : null}
            <div className={styles.buttons}>
                <div className={styles.primaryButtons}>
                    <Button type='submit' name='action' value='save'>Save</Button>
                    <Link variant='link' to='/admin/projects'>Cancel</Link>
                </div>
                {variant === 'existing' ? (
                    <Button 
                        variant='destructive'
                        type='submit'
                        name='action'
                        value='delete'
                        formMethod='delete'
                        formNoValidate
                    >
                        Delete
                    </Button>
                ) : null}
            </div>
        </Form>
    );
}

export {ProjectForm};
