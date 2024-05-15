import {Project, ProjectType} from "~/models/project";
import {Form, FormMethod} from "@remix-run/react";
import {Button} from "~/components/buttons";
import {Link} from "~/components/links";
import styles from "./project-form.module.css";
import {FormField, Input, Select} from "~/components/forms";
import {TimeInput} from "~/components/forms/time-input";
import {DateTime} from "luxon";

type ProjectFormProps = {
    variant: 'new' | 'existing';
    defaultValues?: Project;
    action?: string;
    method?: FormMethod;
};

function ProjectForm(props: ProjectFormProps) {
    const {
        variant,
        defaultValues = {
            id: 0,
            name: '',
            type: ProjectType.CATEGORY,
            createdAt: DateTime.now().toUTC()
        }, 
        action,
        method = 'post'
    } = props;

    const createdAtDate = defaultValues?.createdAt?.toISODate() ?? '';
    const createdAtTime = defaultValues?.createdAt?.toFormat('HH:mm') ?? '';

    return (
        <Form 
            className={styles.form}
            action={action} 
            method={method}
        >
            <FormField name='name' label='Name' required>
                <Input type="text" defaultValue={defaultValues?.name} />
            </FormField>
            <FormField name='type' label='Type' hint='Choosing "Intellectual Property" will italicize the project name.' required>
                <Select defaultValue={defaultValues?.type}>
                    <option value={ProjectType.CATEGORY}>Category</option>
                    <option value={ProjectType.INTELLECTUAL_PROPERTY}>Intellectual Property</option>
                </Select>
            </FormField>
            {variant === 'new' ? (
                <>
                    <FormField name='createdDate' label='Created Date' hint='In UTC/GMT.' required>
                        <Input type='date' defaultValue={createdAtDate} />
                    </FormField>
                    <FormField name='createdTime' label='Created Time' hint={['In UTC/GMT.', '24-hour format.']} required>
                        <TimeInput defaultValue={createdAtTime} />
                    </FormField>
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
