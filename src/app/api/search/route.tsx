import { NextResponse } from "next/server";
import supabase from "@/database/supaClient";


export async function GET(request:Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const pattern = `%${query?.replace(" ","%")}%`;

    const data = await supabase.from('video').select('vid,title,publish,duration').ilike('title',pattern);
    return NextResponse.json(data.data);
}