

export const fetchRoleXIdUser = async (userId: string) => {
    const res = await fetch(`/api/rolesxusers?user=${userId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
    
  }

  export const postRoleXUser = async (userId: number, roleId:number) => {
    try {
      const response = await fetch('/api/rolesxusers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: roleId,
          user: userId,
  
        })
      });
      return response;
    } catch (error) {
      console.error('Error de red', error);
    }
  }
  
  export const deleteRoleXUser = async (userId: number, roleId:number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/rolesxusers?user=${userId}&role=${roleId}`, {
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