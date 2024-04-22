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