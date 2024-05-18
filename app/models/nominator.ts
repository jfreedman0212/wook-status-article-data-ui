enum NominatorAttributeType {
    AC_MEMBER = 'AcMember',
    INQUISITOR = 'Inquisitor',
    EDU_CORP = 'EduCorp',
    BANNED = 'Banned'
}

type NominatorAttribute = {
    id: number;
    attributeName: NominatorAttributeType;
    effectiveAt: string;
};

type Nominator = {
    id: number;
    name: string;
    attributes: NominatorAttribute[];
};

export {
    type Nominator, 
    NominatorAttributeType
};
