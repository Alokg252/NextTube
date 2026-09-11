import { NextResponse } from "next/server";
import supabase from "@/database/supaClient";

export async function GET(request:Request) {
    const url = new URL(request.url);
    const pid = url.searchParams.get('pid');
    if(pid && pid.startsWith("PL") && pid.length<=34){
        console.log("fetching all videos...");
        const data = await supabase.from('video').select('vid, title, publish, duration').eq('pid',pid).order('publish',{ascending:false});   
        console.log("res:" + data);
        return NextResponse.json(data.error ? [] : data.data);
    }    
    return NextResponse.json([]);
}