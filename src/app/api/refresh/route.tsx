import { NextResponse } from "next/server";
export async function GET(request: Request) {
    console.log(request.url)
    console.log("request reached destination");

    setTimeout(()=>{
        console.log("refreshing data coming soon...");
    },1000);

    return NextResponse.json({ message: "refreshing data" });
}