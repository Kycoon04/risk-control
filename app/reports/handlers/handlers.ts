import {User,Department, Form, QuestionsExcel, Section, TlQuestions, Unit} from "@/types";
import {generateExcelUsers, generateExcelForms, generateExcelDepartments, generateExcelQuestionsXsections} from '@/app/reports/generateExcel';



export const handlerUsers = async (userName : string)=>{
    console.log('Este es el users fetch');
    const usersFetch  = await fetch('/api/users/[id]', {
        cache: "no-store",
    });
    const departmentsFetch  = await fetch('/api/departments/[id]', {
        cache: "no-store",
    });
    
    const departmentsResponse = await departmentsFetch.json();
    const usersResponse = await usersFetch.json();
    
    const departments : Department[] = departmentsResponse.data;
    const users : User[] = usersResponse.data;

    users.forEach(user => {
        const department = departments.find(department => department.id === user.department);
        if(department){
            user.department = department.name;
        }
    });
    return generateExcelUsers(users,userName);

}

export const handlerDepartments = async (userName: string)=>{
    const departmentsFetch  = await fetch('/api/departments/[id]', {
        cache: "no-store",
    });
    const unitsFetch  = await fetch('/api/units/[id]', {
        cache: "no-store",
    });

    const unitsResponse = await unitsFetch.json();
    const departmentsResponse = await departmentsFetch.json();
    
    const units : Unit[] = unitsResponse.data;
    const departments : Department[] = departmentsResponse.data;

    departments.forEach(department => {
        const unit = units.find(unit => unit.id === department.unit);
        if(unit){
            department.unit = unit.name;
        }
    });
    return generateExcelDepartments(departments, userName);
}

export const handlerForms = async (userName : string )=>{
    const formsFetch  = await fetch('/api/forms', {
        cache: "no-store",
    });
    const forms: Form[] = await formsFetch.json();
    return generateExcelForms(forms, userName);
}

export const handlerQuestionsXsections = async (userName : string)=>{
    const questionsFetch  = await fetch('/api/questions/[id]', {
        cache: "no-store",
    });
    const sectionsFetch  = await fetch('/api/sections/[id]', {
        cache: "no-store",
    });
    const formsFetch  = await fetch('/api/forms', {
        cache: "no-store",
    });


    const sectionsResponse = await sectionsFetch.json();
    const questionsResponse = await questionsFetch.json();
    const forms:Form[] = await formsFetch.json();

    const questions : TlQuestions[] = questionsResponse.data;
    const sections : Section[] = sectionsResponse.data;
    
    const questionsXsections : QuestionsExcel[] = questions.map(question => {
        const section = sections.find(section => section.id === question.section);
        const form = forms.find(form => form.id === section?.forms);
        return{
            id: question.id,
            question: question.question,
            description: question.description,
            section: section?.name || "No section",
            form: form?.name || "No form"
        }

    });
    return generateExcelQuestionsXsections(questionsXsections, userName);
}