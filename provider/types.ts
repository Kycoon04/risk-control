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
}
export interface Form {
    id: number;
    name: string;
    state: number;
    inicialperiod: Date;
    finalperiod: Date;
}
export interface Section {
    id: string,
    name: string,
    description: string,
    forms: string,
    complete: string
};
export interface RoleXUser {
    id: string;
    user: string;
    role: string;
};
export interface Role {
    id: string;
    name: string;
    active: string;
};
export interface Options {
    id: string;
    option: string;
    question: string | undefined;
    score: string;
    TL_Questions: {
        id: "",
        question: "",
        description: "",
        section: "",
    };
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
export interface Logger {
    usuario: string,
    transaction_type: string,
    role: string,
    transaction: string,
    ip: string,
    date: string,
};
export interface Field {
    titule: string;
    url: string;
    icon: 'RiUserSettingsFill' | 'SiGoogleforms' | 'BsFillQuestionSquareFill' | 'SiGooglemarketingplatform' | 'FaNetworkWired' | 'MdOutlineWorkOutline';
}
export interface FieldQuestion {
    titule: string;
    question: string;
    options: {
        id: string;
        option: string;
    }[];
    selected?: boolean;
    selectedOption: string | null;
    onButtonClick: (option: string) => void;
}
export interface ParamQuestions {
    id: string;
    question: string;
    description: string;
    section: string;
}
export interface Answers {
    user: string | undefined;
    option: string | null;
}
export interface paramsSection {
    id: string | undefined,
    name: string | undefined,
    description: string | undefined,
    forms: string | undefined,
    complete: string | undefined,
};
export interface paramsOptions {
    id: string
    option: string
    question: string | undefined;
    score: string;
    TL_Questions: ParamQuestions;
};
export interface ParamDepartment {
    id: string;
    name: string;
    description: string;
    unit: string;

}
export interface paramsDepartXForms {
    departament: number;
    forms: number;
    id: number;
};
export interface FecthAnswers {
    user: string | undefined;
    option: string | null;
    TL_Options: {
      id: string
      option: string
      question: string | undefined;
      score: string;
      TL_Questions: ParamQuestions;
    };
  }