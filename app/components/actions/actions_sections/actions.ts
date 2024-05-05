import {ParamSection, paramsSection} from '@/types';
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
        data,
      }
    }
  }

  export const deleteSection = async (sectionId: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/sections/[id]?id=${sectionId}`, {
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
  export const fetchedSections = async (param: ParamSection) => {
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