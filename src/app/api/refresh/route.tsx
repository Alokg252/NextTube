import { NextResponse } from "next/server";
import refreshData from "@/database/refresh";
import supaLoad from "@/database/executorClient";

export async function GET(request: Request) {
    console.log(request.url)
    console.log("request reached destination");

    setTimeout(()=>{
        // refreshData();
        // supaLoad();
        console.log("refreshing data");
    },1000);

    return NextResponse.json({ message: "refreshing data" });
}