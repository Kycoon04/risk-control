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
  export const putSection = async (param: ParamSection): Promise<boolean> => {
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
          forms: parseInt(param.forms, 10),
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

  export const postSection = async (name: string, description: string,forms:string,complete:string): Promise<boolean> => {
    try {
      const response = await fetch('/api/sections/[id]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description:description,
          forms: parseInt(forms, 10),
          complete: complete
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