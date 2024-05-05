import {ParamDepartment} from '@/types';

export const fetchDepartment = async (param: ParamDepartment) => {
    const queryParams = new URLSearchParams(
      Object.entries(param)
        .filter(([_, value]) => value !== undefined && value !== "")
    ).toString();
    const res = await fetch(`/api/departments/[id]?${queryParams}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      props: {
        data,
      }
    }
  }
  export const deleteDepartment = async (departmentId: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/departments/[id]?id=${departmentId}`, {
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

  export const postUpdateDepartment = async (id:string,name: string, description: string, unit:string) => {
    try {
      const response = await fetch('/api/departments/[id]', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:id,
          name: name,
          description:description,
          unit:unit,
        })
      });
      return response;
    } catch (error) {
      console.error('Error de red', error);
    }
  }
  export const postDepartment = async (name: string, description: string, unit:string): Promise<boolean> => {
    try {
      const response = await fetch('/api/departments/[id]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description:description,
          unit:parseInt(unit, 10),
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