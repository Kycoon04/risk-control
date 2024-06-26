import { ErrorOption } from "react-hook-form";
import DepartmentCard from "./app/components/maintenance/maintenance_cards/department_card";

interface DepartXFormCron{
    id: number;
    department: number | string;
    forms: number | string;

}

interface FormCron{
    id: number;
    name: string;
    state: number;
    inicialperiod: Date;
    finalperiod: Date;
    complete: string;
}

interface UserCron{
    id: number;
    name: string;
    second_name: string;
    surname: string;
    second_surname: string;
    email: string;
    phone_number: string;
    nickname: string;
    identification: string;
    department: number;
}

interface DepartmentCron{
    id: number;
    name: string;
    description: string;
    unit: number;
}

export interface User {
    id: string;
    name: string;
    second_name: string;
    surname: string;
    second_surname: string;
    email: string;
    phone_number: string;
    nickname: string;
    identification: string;
    department: string;
};
export interface UserFecth {
    id: string;
    name: string;
    second_name: string;
    surname: string;
    second_surname: string;
    email: string;
    phone_number: string;
    nickname: string;
    identification: string;
    department: string;
    page?: number;
    limit?: number;
};
export interface Form {
    id: string;
    name: string;
    state: string;
    inicialperiod: string;
    finalperiod: string;
    complete: string;
};
export interface FormFecth {
    id: string;
    name: string;
    state: string;
    inicialperiod: string;
    finalperiod: string;
    complete: string;
    page?: number;
    limit?: number;
};
export interface Department {
    id: string;
    name: string;
    description: string;
    unit: string;
};

export interface FieldComponentProps {
    type: string;
    titule: string;
    text_Field: string;
    setText_Field: React.Dispatch<React.SetStateAction<string>>;
    register: any,
    error: undefined | ErrorOption
    name: string
};

export interface DatePickerComponent{
    value: Date;
    titule: string;
    setText_Field: React.Dispatch<React.SetStateAction<Date>>;
    //error: undefined | ErrorOption

}

export interface PhoneNumberValidationProps {
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    register: any,
    error: undefined | ErrorOption
    name: string
};

export interface Section {
    id: string,
    name: string,
    description: string,
    forms: string,
    complete: string,
};

export interface SectionFetch {
    id: string,
    name: string,
    description: string,
    forms: string,
    complete: string,
    page?: number;
    limit?: number;
};

export interface RoleXUser {
    id: string;
    user: string;
    role: string;
};

export interface CreateAnswerData {
    user: number;
    option: number;
};

export interface CreateDepartmentData {
    name: string;
    description: string;
    unit: number;
};

export interface CreateFormsData {
    name: string;
    state: number;
    incialperiod: Date;
    finalperiod: Date;
    complete: string;
};

export interface CreateFormsXUserData {
    id: number;
    Forms: number;
    User: number;
    complete: string;
};

export export interface Logger {
    usuario: string,
    transaction_type: string,
    role: string,
    transaction: string,
    ip: string,
    date: string,
};

export interface CreateDepartmentXFormsData {
    departament: number;
    forms: number;
};

export interface Role {
    id: string;
    name: string;
    active: string;
};
export interface RoleFecht {
    id: string;
    name: string;
    active: string;
    page?: number;
    limit?: number;
};
export interface TlQuestions { // Ask about the file type ""
    id: string,
    question: string,
    description: string,
    section: string,
};

export interface QuestionsExcel {
    id: string,
    question: string,
    description: string,
    section: string,
    form: string,
};

export interface CreateOptionData {
    option: string;
    question: number;
    score: number;
};

export interface CreateQuestionData {
    question: string;
    description: string;
    section: number;

};

export interface Section{
    id: string,
    name: string,
    description: string,
    forms: string,
    complete: string,
};

export interface CreateRoleData {
    name: string;
    active: number;
};

export interface CreateRoleXUserData {
    id: number;
    user: number;
    role: number;
};

export interface CreateSectionData {
    name: string;
    description: string;
    forms: number;
    complete: string;
};

export interface UpdateSectionData {
    id: number;
    name: string;
    description: string;
    forms: number;
    complete: string;
};

export interface CreateSectionXUserData {
    id: number;
    section: number;
    user: number;
    complete: string;
};

export interface CreateUnitData {
    name: string;
    description: string;
};

export interface CreateUserData {
    name: string;
    second_name: string;
    surname: string;
    second_surname: string;
    email: string;
    phone_number: string;
    nickname: string;
    identification: string;
    department: number;
};



export interface Options {
    id: string;
    option: string;
    question: string | undefined;
    score: string;
    TlQuestions: TlQuestions;
};
export interface ParamOption {
    id: string;
    option: string;
    question: string;
    score: string;
};
export interface ParamOptionFetch {
    id: string;
    option: string;
    question: string;
    score: string;
    page?: number;
    limit?: number;
};
export interface ParamOption {
    id: string;
    option: string;
    question: string;
    score: string;
};
export interface graphicData {
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        hoverBackgroundColor: string;
        hoverBorderColor: string;
        pointBackgroundColor?: string;
        pointBorderColor?: string;
        pointHoverBackgroundColor?: string;
        pointHoverBorderColor?: string;
        borderDash?: number[];
        data: number[];
    }[];
};
export interface DepartXForms {
    departament: number;
    forms: number;
    id: number;
    TL_forms: Form;
};

export interface Field {
    titule: string;
    url: string;
    icon: string;
};

interface FormsTitle {
    title: string | undefined;
};

export interface ReportCardsProps {
    title : string;
    url: string;
    icon: string;
    callbackExcel: (userName: string) => Promise<void>;
};

export interface FieldQuestion {
    title: string;
    question: string;
    options: {
        id: string;
        option: string;
    }[];
    selected?: boolean;
    selectedOption: string | null;
    onButtonClick: (option: string) => void;
};

export interface ComponentProps<T> {
    filters: Partial<T>;
    setFilters: React.Dispatch<React.SetStateAction<Partial<T>>>;
    clearFilters: () => void;
};

export interface ParamQuestions {
    id: string;
    question: string;
    description: string;
    section: string;
};
export interface ParamQuestionsFetch {
    id: string;
    question: string;
    description: string;
    section: string;
    page?: number;
    limit?: number;
};
export interface Answers {
    user: string | undefined;
    option: string | null;
};

export interface ParamDepartmentStandardChoiceBox {
    id: string;
    name: string;
};

export interface StandardChoiceBoxProps {
    data: ParamDepartmentStandardChoiceBox[];
    selectData: string;
    onChange: (value: string) => void;
    titule: string;
}

export interface ParamQuestionStandardChoiceBox {
    id: string;
    question: string;
};

export interface StandardChoiceBoxPropsQuestion {
    data: ParamQuestionStandardChoiceBox[];
    selectData: string;
    onChange: (value: string) => void;
    titule: string;
}
export interface StandardChoiceBoxStates {
    data: string[];
    selectData: string;
    onChange: (value: string) => void;
    titule: string;
}
export interface paramsSection {
    id: string | undefined,
    name: string | undefined,
    description: string | undefined,
    forms: string | undefined,
    complete: string | undefined,
};
export interface ParamSection {
    id: string,
    name: string,
    description: string,
    forms: string,
    complete: string,
};
export interface Card {
    image: string;
    titule: string;
    subtitule: string;
};

export interface ParamDepartment {
    id: string;
    name: string;
    description: string;
    unit: string;
};
export interface ParamDepartmentfecth {
    id: string;
    name: string;
    description: string;
    unit: string;
    page?: number;
    limit?: number;
};
export interface departmentSelected {
     department:ParamDepartment;
     state:string;
};

export interface roleSelected {
    role:Role;
    state:string;
};
export interface paramsDepartXForms {
    department: string | undefined;
    forms: string;
    id: string;
};
export interface departXForms {
    department: string;
    forms: string;
    id: string;
};

export interface FecthAnswers {
    user: string | undefined;
    option: string | null;
    TL_Users:{
        id: string;
        name: string;
        second_name: string;
        surname: string;
        second_surname: string;
        email: string;
        phone_number: string;
        nickname: string;
        identification: string;
        department: string;
        TL_Departaments:{
            id: string;
            name: string;
            description: string;
            unit: string;
        }
    };
    TL_Options: {
        id: string
        option: string
        question: string | undefined;
        score: string;
        TL_Questions: {
            id: string;
            question: string;
            description: string;
            section: string;
            TL_Sections: {
                id: string,
                name: string,
                description: string,
                forms: string,
                TL_forms:{
                    id: string;
                    name: string;
                    state: string;
                    inicialperiod: string;
                    finalperiod: string;
                    complete: string
                },
                complete: string,
            }
        }
    };
};

export interface SectionXUser {
    id: string;
    section: string;
    user: string | undefined;
    complete: string;
};

export interface FormsXUser {
    id: string;
    Forms: string | undefined;
    User: string | undefined;
    complete: string;
};

export interface ParamUnit {
    id: string;
    name: string;
    description: string;
};

export interface Unit {
    id: string;
    name: string;
    description: string;
};
export interface ParamUnitFetch {
    id: string;
    name: string;
    description: string;
    page?: number;
    limit?: number;
};