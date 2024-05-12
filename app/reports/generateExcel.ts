import * as XLSX from "xlsx";
import {User,Form, Department, QuestionsExcel} from "@/types";

let amountRows = 0;

export const generateExcelUsers = async (users: User[], userName:string) => {
  amountRows = users.length + 3;
  const lengths = [20, 45, 20, 20, 20, 40, 20, 20, 30, 20];
  const handleDownload = () => {
    let table = [
      {
        A: "Risks-Control Users Report:",
        B: "",
        C: "",
        D: "",
        E: "",
        F: "",
        G: "",
        H: "",
        I: "",
        J: "",
      },
      {
        A: "Id",
        B: "Name",
        C: "Second Name",
        D: "Surname",
        E: "Second Surname",
        F: "Email",
        G: "Phone number",
        H: "Nickname",
        I: "Identification",
        J: "Department",
      },
    ];
    
    users.forEach((user) => {
         table.push({
          A: user.id,
          B: user.name,
          C: user.second_name,
          D: user.surname,
          E: user.second_surname,
          F: user.email,
          G: user.phone_number,
          H: user.nickname,
          I: user.identification,
          J: user.department,
        });
    });

    table.push({
      A: "Total of users:",
      B: users.length.toString(),
      C: "",
      D: "",
      E: "",
      F: "",
      G: "",
      H: "",
      I: "",
      J: "",
    });

    table.push({
      A: `This report was generated on Risk-Control Platform by the user ${userName}  on  ${ new Date().toLocaleDateString()}`,
      B: "",
      C:"",
      D: "",
      E: "",
      F: "",
      G: "",
      H: "",
      I: "",
      J: "",
    });
    
    const dataFinal = [...table];
    setTimeout(() => {
      createFile(dataFinal, "Users Report", "usersReport.xlsx", lengths);
    }, 100);
  };
  handleDownload();
};



export const generateExcelForms = async (forms: Form[], userName : string) => {
  amountRows = forms.length + 2;
  const lengths = [20, 20, 20, 25, 25, 20];
  const handleDownload = () => {
    let table = [
      { 
        A: "Risks-Control forms Report:",
        B: "",
        C: "",
        D: "",
        E: "",
        F: "",
    },
      {
        A: "Id",
        B: "Name",
        C: "State",
        D: "Initial Date",
        E: "Final Date",
        F: "Complete",
      },
    ];
    
    forms.forEach((form) => {
         table.push({
          A: form.id,
          B: form.name,
          C: form.state,
          D: form.inicialperiod,
          E: form.finalperiod,
          F: form.complete,
        });
    });
    table.push({
      A: `This report was generated on Risk-Control Platform by the user ${userName}  on ${new Date().toLocaleDateString()}`,
      B: "",
      C: "",
      D: "",
      E: "",
      F: "",
    });
    const dataFinal = [...table];
    setTimeout(() => {
      createFile(dataFinal, "Forms Report", "formsReport.xlsx", lengths);
    }, 100);
  };

  handleDownload();
};

export const generateExcelDepartments = async (departments: Department[], userName : string)  => {
  amountRows = departments.length + 2;
  const lengths = [20, 25, 100, 20];
  const handleDownload = () => {
    let table = [
      {
        A: "Risks-Control Departments Report:",
        B: "",
        C: "",
        D: "",
      },
      {
        A: "Id",
        B: "Name",
        C: "Description",
        D: "Unit",
      },
    ];
    departments.forEach((department) => {
         table.push({
          A: department.id,
          B: department.name,
          C: department.description,
          D: department.unit,
        });
    });
    table.push({
      A: `This report was generated on Risk-Control Platform by the user ${userName}  on ${new Date().toLocaleDateString()} `,
      B: "",
      C: "",
      D: "",
    });
    const dataFinal = [...table];
    setTimeout(() => {
      createFile(dataFinal, "Departments Report", "departmentsReport.xlsx", lengths);
    }, 100);
  };

  handleDownload();
};

export const generateExcelQuestionsXsections = async (questions: QuestionsExcel[], userName : string) => {
  amountRows = questions.length + 3;
  const lengths = [25, 100, 100, 25, 25];
  const handleDownload = () => {
    let table = [
      {
        A: "Risks-Control Questions per section and form Report:",
        B: "",
        C: "",
        D: "",
        E: "",
      },
      {
        A: "Id",
        B: "Question",
        C: "Description",
        D: "Section",
        E: "Form",
      },
    ];
    questions.forEach((question) => {
         table.push({
          A: question.id,
          B: question.question,
          C: question.description,
          D: question.section,
          E: question.form,
        });
    });
    table.push({
      A: "Total of questions per section:",
      B: questions.length.toString(),
      C: "",
      D: "",
      E: "",
    });
    table.push({
      A: `This report was generated on Risk-Control Platform by the user ${userName}  on ${new Date().toLocaleDateString()}`,
      B: "",
      C: "",
      D: "",
      E: "",
    });
    const dataFinal = [...table];
    setTimeout(() => {
      createFile(dataFinal, "QuestionsXsectionsXforms", "questionsXSectionXForm.xlsx", lengths);
    }, 100);
  };

  handleDownload();
};

const createFile = (dataFinal: any, sheetName:string, fileName:string, lengths:number[]) => {
  const book = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true});

  sheet["!merges"] =[{
    s: { r: 0, c: 0 },
    e: { r: 0, c: 9 },
  },
  {
    s: { r: amountRows, c: 0 },
    e: { r: amountRows, c: 9 },
  }];

  let properties: any = [];
  lengths.forEach((col) => {
    properties.push({
      width: col,
    });
  });
  sheet["!cols"] = properties;
  XLSX.utils.book_append_sheet(book, sheet, sheetName);

  XLSX.writeFile(book, fileName);
};