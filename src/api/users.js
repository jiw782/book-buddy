const API = import.meta.env.VITE_API;

export async function getAccount(token) {
  if (!token) throw Error("You are not logged in.");

  try {
    const response = await fetch(API + "/users/me", {
      headers: { Authorization: "Bearer " + token },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
