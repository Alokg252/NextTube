import { NextRequest, NextResponse } from "next/server";

let isRefreshing = false;

export async function middleware(req:NextRequest) {
    const url = req.nextUrl.clone();

    // ✅ Allow the refresh API to pass
    if (url.pathname === "/api/refresh") {

      //--------------------------------------------------------------------
      const authHeader = req.headers.get('authorization');

      if (!authHeader || !authHeader.startsWith('Basic ')) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf8');

      const [username, password] = credentials.split(':');

      const user:string = process.env.USER_NAME as string;
      const pass:string = process.env.PASSWORD as string;

      if (username == user && password == pass) {

        isRefreshing = true;
        setTimeout(() => {
          isRefreshing = false;
          console.log("refresh done")
        }, 15000);

      } 
      else {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }
      return NextResponse.next();
      //-----------------------------------------------------------------------

    }

    // ✅ Allow responses from YouTube API
    if (req.headers.get("server")?.includes("HTTPServer2")) {
        return NextResponse.next();
    }

    // 🚫 Redirect users during refresh
    if (isRefreshing && (url.pathname === "/" || url.pathname.startsWith("/api/"))) {
        console.log("caught " + url.pathname);
        url.pathname = "/404";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/api/:path*"],
};
