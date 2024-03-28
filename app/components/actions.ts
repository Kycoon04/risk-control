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