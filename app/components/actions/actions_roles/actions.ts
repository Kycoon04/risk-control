'use client'
import {RoleXUser} from '@/provider/types';

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
  const res = await fetch(`/api/roles/[id]?id=${param}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    props: {
      data,
    }
  }
}

export const postRoleXUser = async (param: RoleXUser): Promise<boolean> => {
  try {
    const response = await fetch('/api/rolesxusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: param.user,
        role: parseInt(param.role,10),
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
export const deleteRole = async (roleId: number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/roles/?id=${roleId}`, {
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