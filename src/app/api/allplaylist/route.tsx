
import { NextResponse } from "next/server";
import supabase from "@/database/supaClient";


export async function GET(request:Request) {
    const url = new URL(request.url);
    const pid = url.searchParams.get('pid');
    if(pid){
        const data = await supabase.from('playlist').select('title').eq('pid',pid);
        return NextResponse.json(data.error ? [] : data.data);
    }
    const data = await supabase.from('playlist').select('pid,title,desc');
    return NextResponse.json(data.error ? [] : data.data);
}