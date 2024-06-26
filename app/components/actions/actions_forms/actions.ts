import {Form} from '@/types';
export async function fetchForms(param: Form) {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  const res = await fetch(`/api/forms/[id]?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data)
  return {
    props: {
      data: data.data,
      pagination: data.pagination,
    }
  }
}
export const deleteForms = async (formsId: number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/forms/[id]?id=${formsId}`, {
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
export const putForms = async (param: Form): Promise<boolean> => {
  try {
    const response = await fetch('/api/forms/[id]', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: parseInt(param.id,10),
        name: param.name,
        inicialperiod: new Date(param.inicialperiod),
        finalperiod: new Date(param.finalperiod),
        complete: param.complete,
        state: parseInt(param.state,10)
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

export const postForm = async (param: Form): Promise<boolean> => {
  try {
    const response = await fetch('/api/forms/[id]', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: param.name,
        inicialperiod: new Date(param.inicialperiod),
        finalperiod: new Date(param.finalperiod),
        complete: param.complete,
        state: parseInt(param.state,10)
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