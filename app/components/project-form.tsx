import {Project, ProjectType} from "~/models/project";
import {
    FormField,
    Input,
    Select
} from "~/components/forms";
import {TimeInput} from "~/components/forms/time-input";
import {DateTime} from "luxon";
import {Cancel, FormFields, MutationForm, PrimaryButtons, SecondaryButtons, Submit} from "~/components/forms/mutation";

type ProjectFormProps = {
    variant: 'new' | 'existing';
    defaultValues?: Project;
    cancelTo?: string;
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
        cancelTo = '/admin/projects'
    } = props;

    const createdAtDate = defaultValues?.createdAt?.toISODate() ?? '';
    const createdAtTime = defaultValues?.createdAt?.toFormat('HH:mm') ?? '';
    
    return (
        <MutationForm 
            confirmation={{
                delete: `Are you sure you want to archive ${defaultValues.name || 'this project'}?`
            }}
        >
            <FormFields>
                <FormField name='name' label='Name' required>
                    <Input type="text" defaultValue={defaultValues?.name} />
                </FormField>
                <FormField 
                    name='type'
                    label='Type'
                    hint='Choosing "Intellectual Property" will italicize the project name.' 
                    required
                >
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
                        <FormField 
                            name='createdTime' 
                            label='Created Time'
                            hint={['In UTC/GMT.', '24-hour format.']}
                            required
                        >
                            <TimeInput defaultValue={createdAtTime} />
                        </FormField>
                    </>
                ) : null}
            </FormFields>

            <PrimaryButtons>
                <Submit />
                <Cancel to={cancelTo} />
            </PrimaryButtons>

            {variant === 'existing' ? (
                <SecondaryButtons>
                    <Submit variant='destructive' value='delete' text='Archive' loadingText='Archiving' />
                </SecondaryButtons>
            ) : null}
        </MutationForm>
    );
}

export {ProjectForm};
