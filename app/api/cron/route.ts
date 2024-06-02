import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { isSameDay } from 'date-fns';
import nodemailer from 'nodemailer';
import { FormCron, DepartXFormCron, UserCron, DepartmentCron } from "@/types";

async function GetallUsers() {
    let response = await prisma.tL_Users.findMany();
    return response;
}

async function GetallForms() {
    let response = await prisma.tL_forms.findMany();
    return response;
}

async function GetallDepartmentsXForms() {
    let response = await prisma.tL_DeparXforms.findMany();
    return response;
}

async function GetallDepartments() {
    let response = await prisma.tL_Departaments.findMany();
    return response;
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

function getDepartmentName(departmentId : number, departments : DepartmentCron[]) {
    const department = departments.find((department) => department.id === departmentId);
    return department?.name ?? '' ;

}

function getFormName(formId : number, forms : FormCron[]) {
    const formName = forms.find((form) => form.id === formId);
    return formName?.name ?? '';
}

function getDepartmentId(departmentName : String, departments : DepartmentCron[]) {
    const department = departments.find((department) => department.name === departmentName);
    return department?.id;
}

function getUsersInDepartment(users : any[], departments : DepartmentCron[], departmentName : String) {
    const departmentId = getDepartmentId(String(departmentName), departments);
    return users.filter((user) => user.department === departmentId);
}

async function sendEmailInit(username : string, department : string, form : string, destinationEmail : string) {
    try {
          const mailOptions = {
            from: process.env.GMAIL_USER,
            to: destinationEmail,
            subject: 'Start of an evaluation period in a form related with your department',
            html: `<h1>Hi ${username}</h1>
            <p>The beginning of the evaluation process of the form ${form} is about to begin, please fill it out as soon as possible.</p>
            <p>Click the link bellow to go to the Risk-Control page.</p>
            <a href="https://risk-control.vercel.app/">Risk-Control platform</a>
            <p>Is mandatory to fill the form before the final period for every member of the department ${department}.</p>
            <p>Best,</p>
            <p>The Risk-Control team</p>`,
            text: '', 
          };
        const info = await transporter.sendMail(mailOptions);
      
          return "Email sent" + info;
        } catch (error) {
            console.log(error);
            return "Error while sending the email";
        }
    }

async function sendEmailEnd(username : string, department : string, form : string, destinationEmail : string) {
        try {
              const mailOptions = {
                from: process.env.GMAIL_USER,
                to: destinationEmail,
                subject: 'End of an evaluation period in a form related with your department',
                html: `<h1>Hi ${username}</h1>
                <p>The end of the evaluation process of the form ${form} is about to begin, please fill it out before 23:59 hrs.</p>
                <p>Click the link bellow to go to the Risk-Control page.</p>
                <a href="https://risk-control.vercel.app/">Risk-Control platform</a>
                <p>Is mandatory to fill the form before the final period for every member of the department ${department}.</p>
                <p>Best,</p>
                <p>The Risk-Control team</p>`,
                text: '', 
              };
            const info = await transporter.sendMail(mailOptions);
          
              return "Email sent" + info;
            } catch (error) {
                console.log(error);
                return "Error while sending the email";
            }
        }

export async function GET() {
    // if (request.headers.get('Authorization') !== `${process.env.CRON_SECRET}`) {
    //     return new Response('Unauthorized', {status: 401,});
    // }
    try {
        let forms : FormCron[] = await GetallForms();
        let departXForms : DepartXFormCron[] = await GetallDepartmentsXForms();
        const users : UserCron[] = await GetallUsers();
        const departments : DepartmentCron[] = await GetallDepartments();
        const today = new Date();

        const formsInit = forms.filter((form) => {
            const initialPeriod = new Date(form.inicialperiod);
            return isSameDay(today, initialPeriod);
        });

        const formsEnd = forms.filter((form) => {
            const finalPeriod = new Date(form.finalperiod);
            return isSameDay(today, finalPeriod);
        });

        if(formsInit.length === 0 && formsEnd.length === 0) {
           //return new Response('No forms to start or end today', {status: 200,});
           return NextResponse.json('No forms to start or end today')
        }

        const matchingDepartmentsEnd: DepartXFormCron[] = departXForms.filter((department) => {
            return formsEnd.some(form => form.id === department.forms);
        });
        for (let i = 0; i < matchingDepartmentsEnd.length; i++) {
            matchingDepartmentsEnd[i].department = getDepartmentName(Number(matchingDepartmentsEnd[i].department), departments);
            matchingDepartmentsEnd[i].forms = getFormName(Number(matchingDepartmentsEnd[i].forms), formsEnd);
        }   
        for (let i = 0; i < matchingDepartmentsEnd.length; i++) {
            let usersInDepartment = getUsersInDepartment(users, departments, String(matchingDepartmentsEnd[i].department));
            for (let j = 0; j < usersInDepartment.length; j++) {
                console.log("Sending email to notifiy end :", usersInDepartment[j].name, usersInDepartment[j].email, matchingDepartmentsEnd[i].department, matchingDepartmentsEnd[i].forms);
                await sendEmailEnd(usersInDepartment[j].nickname, String(matchingDepartmentsEnd[i].department), String(matchingDepartmentsEnd[i].forms), usersInDepartment[j].email);
            }
        }

        const matchingDepartmentsInit: DepartXFormCron[] = departXForms.filter((department) => {
            return formsInit.some(form => form.id === department.forms);
        });
        for (let i = 0; i < matchingDepartmentsInit.length; i++) {
            matchingDepartmentsInit[i].department = getDepartmentName(Number(matchingDepartmentsInit[i].department), departments);
            matchingDepartmentsInit[i].forms = getFormName(Number(matchingDepartmentsInit[i].forms), formsInit);
        }   
        for (let i = 0; i < matchingDepartmentsInit.length; i++) {
            let usersInDepartment = getUsersInDepartment(users, departments, String(matchingDepartmentsInit[i].department));
            for (let j = 0; j < usersInDepartment.length; j++) {
                console.log("Sending email to notify starting:", usersInDepartment[j].name, usersInDepartment[j].email, matchingDepartmentsInit[i].department, matchingDepartmentsInit[i].forms);
                await sendEmailInit(usersInDepartment[j].nickname, String(matchingDepartmentsInit[i].department), String(matchingDepartmentsInit[i].forms), usersInDepartment[j].email);
            }
        }

        return NextResponse.json('Emails sent to users in departments with forms that start or end today')
    } catch (error) {
        return new Response(`error while executing cron job ${error}`, {status: 500,});
    }
}