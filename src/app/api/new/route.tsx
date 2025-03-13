import { NextResponse } from "next/server";
import supabase from "@/database/supaClient";

export async function GET(request:Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const data = await supabase.from('video').select('vid, title, publish, duration').order('publish',{ascending:false}).limit((Number.parseInt(query as string)));
    return NextResponse.json(data.data);
}
