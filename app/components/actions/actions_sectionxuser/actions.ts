import {SectionXUser} from '@/provider/types';

export const fetchSectionXUser= async (param: SectionXUser) => {
    const queryParams = new URLSearchParams(
      Object.entries(param)
        .filter(([_, value]) => value !== undefined && value !== "")
    ).toString();
    const res = await fetch(`/api/sectionxuser?${queryParams}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      props: {
        data,
      }
    }
  }

  export const putSectionXUser = async (param: SectionXUser): Promise<boolean> => {
    try {
      const response = await fetch('/api/sectionxuser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: param.id,
          user: param.user,
          section: param.section,
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