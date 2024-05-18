import {FormField, Input} from "~/components/forms";
import {Cancel, FormFields, MutationForm, PrimaryButtons, Submit} from "~/components/forms/mutation";
import {Nominator, NominatorAttributeType} from "~/models/nominator";
import {Checkbox, CheckboxList} from "~/components/forms/checkbox";
import {useReducer} from "react";
import {difference, uniq} from "lodash-es";
import {TimeInput} from "~/components/forms/time-input";
import {DateTime} from "luxon";
import {Time} from "~/components/time";

type NominatorFormProps = {
    variant: 'new' | 'existing';
    defaultValues?: Nominator;
};

function NominatorForm(props: NominatorFormProps) {
    const {
        variant,
        defaultValues = {
            id: 0,
            name: '',
            attributes: []
        }
    } = props;
    
    const [attributesState, dispatch] = useReducer(attributesStateReducer, null, () => ({
        initialValue: defaultValues.attributes.map(attr => attr.attributeName),
        value: defaultValues.attributes.map(attr => attr.attributeName),
        dirty: false
    }));
    
    const options = [
        { value: NominatorAttributeType.AC_MEMBER, label: 'AgriCorp' },
        { value: NominatorAttributeType.EDU_CORP, label: 'EduCorp' },
        { value: NominatorAttributeType.INQUISITOR, label: 'Inquisitor' },
        { value: NominatorAttributeType.BANNED, label: 'Banned' },
    ].map(({ value, label }) => {
        const currentValue = defaultValues.attributes.find(x => x.attributeName === value);
        return {
            value,
            label,
            effectiveAt: currentValue?.effectiveAt ? DateTime.fromISO(currentValue.effectiveAt) : null,
            disabled: value !== NominatorAttributeType.BANNED && attributesState.value.includes(NominatorAttributeType.BANNED)
        };
    });

    return (
        <MutationForm>
            <FormFields>
                <FormField name='name' label='Name' required>
                    <Input type="text" defaultValue={defaultValues?.name} />
                </FormField>
                <CheckboxList 
                    name='attributes'
                    label='Attributes'
                    value={attributesState.value}
                    onChange={(checkbox, checked) => dispatch({ checkbox: checkbox as NominatorAttributeType, checked })}
                    hint={['Banning a user will remove all other attributes.']}
                >
                    {options.map(({ value, label, disabled, effectiveAt }) => (
                        <Checkbox 
                            key={value}
                            value={value}
                            label={label}
                            disabled={disabled}
                            hint={effectiveAt ? (
                                <>
                                    Effective as of <Time value={effectiveAt} />
                                </>
                            ) : null} 
                        />
                    ))}
                </CheckboxList>
                {/* only require these fields for new nominators that have attributes, OR an existing one with changed attributes */}
                {(variant === 'new' && attributesState.value.length > 0) || (variant === 'existing' && attributesState.dirty) ? (
                    <>
                        <FormField name='effectiveAsOfDate' label='Effective As Of Date' hint='In UTC/GMT.' required>
                            <Input type='date' />
                        </FormField>
                        <FormField
                            name='effectiveAsOfTime'
                            label='Effective As Of Time'
                            hint={['In UTC/GMT.', '24-hour format.']}
                            required
                        >
                            <TimeInput />
                        </FormField>
                    </>
                ) : null}
            </FormFields>

            <PrimaryButtons>
                <Submit />
                <Cancel to='/admin/nominators' />
            </PrimaryButtons>
        </MutationForm>
    );
}


type AttributesState = {
    initialValue: NominatorAttributeType[];
    value: NominatorAttributeType[];
    dirty: boolean;
};

type AttributesAction = {
    checkbox: NominatorAttributeType;
    checked: boolean;
};

function attributesStateReducer(state: AttributesState, { checkbox, checked }: AttributesAction): AttributesState {
    let newValue: NominatorAttributeType[];
    if (checkbox === NominatorAttributeType.BANNED && checked) {
        newValue = [NominatorAttributeType.BANNED];
    } else if (checked) {
        newValue = [...state.value, checkbox];
    } else {
        newValue = state.value.filter(it => it !== checkbox);
    }
    
    const initialValue = uniq(state.initialValue).sort((a,b) => a.localeCompare(b));
    newValue = uniq(newValue).sort((a,b) => a.localeCompare(b));
    
    const dirty = initialValue.length !== newValue.length || difference(state.initialValue, newValue).length > 0;
    
    return {
        ...state,
        value: newValue,
        dirty
    };
}

export {NominatorForm};
