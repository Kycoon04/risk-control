import {Form} from '@/types';
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
        id: param.id,
        name: param.name,
        state: param.state,
        inicialperiod: param.inicialperiod,
        finalperiod: param.finalperiod,
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