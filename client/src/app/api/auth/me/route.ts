import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  console.log(cookieStore);
  const token = cookieStore.get("jwt"); // Obtener el JWT de la cookie

  if (!token) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

  const res = await fetch(`${backendUrl}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: res.status }
    );
  }

  const user = await res.json();
  //const user = null;
  return NextResponse.json(user);
}
// import { cookies } from "next/headers";

// export const dynamic = "force-dynamic"; // defaults to auto

// export async function GET(
//   request: Request,
//   { params }: { params: { provider: string } } // <-- Corrección aquí
// ) {
//   const { searchParams } = new URL(request.url);
//   const token = searchParams.get("access_token");

//   if (!token) return

//   const provider = params.provider; // <-- Corrección aquí
//   const backendUrl =
//     process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";
//   const path = `/api/auth/${provider}/callback`;

//   const url = new URL(backendUrl + path);
//   url.searchParams.append("access_token", token);

//   const res = await fetch(url.href);
//   const data = await res.json();

//   (await cookies()).get("jwt");
// }
