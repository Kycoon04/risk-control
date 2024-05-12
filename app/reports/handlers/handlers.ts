import {User,Department, Form, QuestionsExcel, Section, TlQuestions} from "@/types";
import {generateExcelUsers, generateExcelForms, generateExcelDepartments, generateExcelQuestionsXsections} from '@/app/reports/generateExcel';



export const handlerUsers = async (userName : string)=>{
    const usersFetch  = await fetch('/api/users/[id]', {
        cache: "no-store",
    });
    const departmentsFetch  = await fetch('/api/departments/[id]', {
        cache: "no-store",
    });

    const departments: Department[] = await departmentsFetch.json();
    const users: User[] = await usersFetch.json();

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

    const units: Department[] = await unitsFetch.json();
    const departments: Department[] = await departmentsFetch.json();

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


    const sections : Section[] = await sectionsFetch.json();
    const questions : TlQuestions[] = await questionsFetch.json();
    const forms: Form[] = await formsFetch.json();
    
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