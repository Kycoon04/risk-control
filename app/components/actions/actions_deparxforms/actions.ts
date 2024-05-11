import {paramsDepartXForms} from '@/types';

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
export const fetchDepartXIdForms = async (formId: string) => {
  const res = await fetch(`/api/deparxforms/[id]?forms=${formId}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
  
}
export const postDepartXForm = async (formId: number, departmentId:number) => {
  try {
    const response = await fetch('/api/deparxforms/[id]', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        department: departmentId,
        forms: formId,

      })
    });
    return response;
  } catch (error) {
    console.error('Error de red', error);
  }
}

export const deleteDepartXIdForms = async (formId: number, departmentId:number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/deparxforms/[id]?forms=${formId}&department=${departmentId}`, {
      method: 'DELETE',
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
