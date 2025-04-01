import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me", {
        credentials: "include", // Asegura que las cookies sean enviadas
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };

    fetchUser();
  }, []);

  return { user };
}
// import { useEffect, useState } from "react";

// export function useAuth() {
//   const [user, setUser] = useState(null);

//   const backendUrl =
//     process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await fetch(`${backendUrl}/api/users/me`, {
//         headers: {
//           Authorization: `Bearer ${document.cookie.replace("jwt=", "")}`,
//         },
//       });

//       //console.log(`Bearer ${document.cookie.replace("jwt=", "")}`);
//       //console.log(document.cookie);

//       if (res.ok) {
//         const data = await res.json();
//         console.log("JWT Token:", data.jwt);
//         setUser(data);
//       }
//     };

//     fetchUser();
//   }, []);

//   return { user };
// }
