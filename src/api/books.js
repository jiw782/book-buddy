const API = import.meta.env.VITE_API;

export async function getBooks() {
  try {
    const response = await fetch(API + "/books");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getBook(id) {
  try {
    const response = await fetch(API + "/books/" + id);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
