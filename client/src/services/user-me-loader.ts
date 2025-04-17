import { getAuthToken } from "./get-auth-token";
export async function getUserMeLoader() {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
  const path = "/api/users/me?populate=*";

  const url = new URL(path, baseUrl);

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    
    if (!response.ok) {
      console.error('Error fetching user:', response.status, response.statusText);
      return { ok: false, data: null, error: 'Failed to fetch user data' };
    }

    const rawData = await response.json();
    console.log('Raw Strapi response:', rawData);
    
    if (rawData.error) return { ok: false, data: null, error: rawData.error };
    return { ok: true, data: rawData, error: null };
  } catch (error) {
    console.error('Error in getUserMeLoader:', error);
    return { ok: false, data: null, error: error };
  }
}
// import { getAuthToken } from "./get-auth-token";
// export async function getUserMeLoader() {
//   const baseUrl =
//     process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
//   const path = "/api/users/me?populate=*";  // Change to populate all relations

//   const url = new URL(path, baseUrl);

//   const authToken = await getAuthToken();
//   if (!authToken) return { ok: false, data: null, error: null };

//   try {
//     const response = await fetch(url.href, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${authToken}`,
//       },
//       cache: "no-cache",
//     });
//     const rawData = await response.json();
//     console.log('Raw Strapi response:', rawData);  // Debug log
    
//     if (rawData.error) return { ok: false, data: null, error: rawData.error };
//     return { ok: true, data: rawData, error: null };
//   } catch (error) {
//     console.log(error);
//     return { ok: false, data: null, error: error };
//   }
// }
