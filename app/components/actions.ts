'use client'
import {User,RoleXUser} from '@/provider/store';

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

interface params {
  id: string,
  name: string,
  description: string,
  forms: number | undefined,
};

export const fetchSections = async (param: params) => {
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
      data,
    }
  }
}

interface paramsQuestion {
  id: string,
  question: string,
  description: string,
  section: string | undefined,
};

export const fetchQuestion = async (param: paramsQuestion) => {
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
      data,
    }
  }
}

interface paramsOptions {
  id: string
  option:string
  question:string | undefined;
};

export const fetchOptions = async (param: paramsOptions) => {
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
      data,
    }
  }
}
export const postUser = async (name:string,second_name:string,surname:string,second_surname:string,email:string,identification:string,nickname:string, phone_number:string): Promise<boolean> =>{
  try {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            second_name: second_name,
            surname:surname,
            second_surname:second_surname,
            email:email,
            identification:identification,
            nickname:nickname, 
            phone_number:phone_number
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
      data,
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