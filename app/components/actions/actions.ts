'use client'
import {
  User, RoleXUser, Answers, paramsSection, ParamQuestions, Options,
  ParamDepartment, paramsDepartXForms, FecthAnswers
} from '@/types';

export async function fetchForms() {
  const res = await fetch('/api/forms', {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}
export const postAnswer = async (param: Answers): Promise<boolean> => {
  try {
    const response = await fetch('/api/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: param.user,
        option: param.option,
      })
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error de red', error);
    return false;
  }
}
export const putSection = async (param: paramsSection): Promise<boolean> => {
  try {
    const response = await fetch('/api/sections/[id]', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: param.id,
        name: param.name,
        description: param.description,
        forms: param.forms,
        complete: param.complete
      })
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error de red', error);
    return false;
  }
}
export const fetchSections = async (param: paramsSection) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  const res = await fetch(`/api/sections/[id]?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data: data.data,
      pagination: data.pagination,
    }
  }
}
export const fetchQuestion = async (param: ParamQuestions) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  const res = await fetch(`/api/questions/[id]?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data: data.data,
      pagination: data.pagination,
    }
  }
}
export const fetchOptions = async (param: Options) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  const res = await fetch(`/api/options?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data: data.data,
      pagination: data.pagination,
    }
  }
}
export const fetchDepartment = async (param: ParamDepartment) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  const res = await fetch(`/api/departments?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}
export const postUser = async (department: string, name: string, second_name: string, surname: string, second_surname: string, email: string, identification: string, nickname: string, phone_number: string) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        department: department,
        name: name,
        second_name: second_name,
        surname: surname,
        second_surname: second_surname,
        email: email,
        identification: identification,
        nickname: nickname,
        phone_number: phone_number
      })
    });
    return response;
  } catch (error) {
    console.error('Error de red', error);
  }
}
export const fetchUsers = async (param: User) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  const res = await fetch(`/api/users/[id]?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data: data.data,
      pagination: data.pagination,
    }
  }
}
export const fetchUserRole = async (param: RoleXUser) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  console.log(queryParams)
  const res = await fetch(`/api/rolesxusers?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}
export const fetchRole = async (param: string) => {
  const res = await fetch(`/api/roles?id=${param}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}
export const fetchDepartXForms = async (param: paramsDepartXForms) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  const res = await fetch(`/api/deparxforms/[id]?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}
export const fetchAnswers = async (param: FecthAnswers) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  const res = await fetch(`/api/answers?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}
