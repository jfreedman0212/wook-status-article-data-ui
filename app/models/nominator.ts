enum NominatorAttributeType {
    AC_MEMBER = 'AcMember',
    INQUISITOR = 'Inquisitor',
    EDU_CORP = 'EduCorp',
    BANNED = 'Banned'
}

type Nominator = {
    id: number;
    name: string;
    attributes: NominatorAttributeType[];
};

export {
    type Nominator, 
    NominatorAttributeType
};
