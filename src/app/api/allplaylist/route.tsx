
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
    if(pid){
        const data = await db.all(`SELECT title FROM playlist WHERE pid='${pid}'`);
        
        return NextResponse.json(data);
    }
    const data = await db.all("SELECT pid,title,desc FROM playlist");
    
    return NextResponse.json(data);
}