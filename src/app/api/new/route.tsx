import { NextResponse } from "next/server";
import supabase from "@/database/supaClient";

export async function GET(request:Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    console.log(`fetching query request for q=${query}`);
    const data = await supabase.from('video').select('vid, title, publish, duration').order('publish',{ascending:false}).limit((Number.parseInt(query as string)));
    console.log(data);
    return NextResponse.json(data.error ? [] : data.data);
}
