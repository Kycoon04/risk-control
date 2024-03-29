'use client'

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

interface params {
  id: string,
  name: string,
  description: string,
  forms: number | undefined,
};

export const fectSections = async (param: params) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  console.log(`/api/sections/[id]?${queryParams}`)
  const res = await fetch(`/api/sections/[id]?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log("registros: ",data)
  return {
    props: {
      data,
    }
  }
}

interface paramsQuestion {
  id: string,
  question: string,
  description: string,
  section: string | undefined,
};

export const fectQuestion = async (param: paramsQuestion) => {
  const queryParams = new URLSearchParams(
    Object.entries(param)
      .filter(([_, value]) => value !== undefined && value !== "")
  ).toString();
  console.log(`/api/questions/[id]?${queryParams}`)
  const res = await fetch(`/api/questions/[id]?${queryParams}`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log("registros: ",data)
  return {
    props: {
      data,
    }
  }
}