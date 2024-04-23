import {FormsXUser} from '@/provider/types';

export const fetchFormXUser= async (param: FormsXUser) => {
    const queryParams = new URLSearchParams(
      Object.entries(param)
        .filter(([_, value]) => value !== undefined && value !== "")
    ).toString();
    const res = await fetch(`/api/formsxuser?${queryParams}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      props: {
        data,
      }
    }
  }

  export const putFormsXUser = async (param: FormsXUser): Promise<boolean> => {
    try {
      const response = await fetch('/api/formsxuser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: param.id,
          User: param.User,
          Forms: param.Forms,
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