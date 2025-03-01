import { NextResponse } from "next/server";
import { Database } from 'sqlite3';
import { open } from "sqlite";
import { vpdb } from "@/database/refresh";

const db = await open({
    filename: vpdb,
    driver: Database
});

export async function GET(request:Request) {
    const url = new URL(request.url);
    const pid = url.searchParams.get('pid');
    if(pid && pid.startsWith("PL") && pid.length<=34){
        const data = await db.all(`SELECT vid, title, publish, duration FROM video WHERE pid = '${pid}'`);
        
        return NextResponse.json(data);
    }
    
    return NextResponse.json([]);
}