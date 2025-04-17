import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./services/user-me-loader";

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  
  // Check if path requires authentication
  if (currentPath.startsWith("/dashboard") || currentPath.startsWith("/to-backend-dashboard")) {
    const userResponse = await getUserMeLoader();
    // console.log("Middleware user response:", userResponse);

    // Check if user is authenticated
    if (!userResponse.ok || !userResponse.data) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userData = userResponse.data;
    console.log("User data in middleware:", userData);

    // For /dashboard routes, require Auth-plus role
    if (currentPath.startsWith("/dashboard")) {
      if (!userData.role || (userData.role.id !== 3 && userData.role.type !== "auth-plus")) {
        return NextResponse.redirect(new URL("/upgrade", request.url));
      }
    }
    
    // For /to-backend-dashboard routes, only require authentication (which we already checked above)
    // No additional checks needed as we already verified the user is authenticated
  }

  return NextResponse.next();
}
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getUserMeLoader } from "./services/user-me-loader";

// export async function middleware(request: NextRequest) {
//   const user = await getUserMeLoader();
//   const currentPath = request.nextUrl.pathname;
//   console.log(user);

//   if (currentPath.startsWith("/dashboard") && user.ok === false) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }
