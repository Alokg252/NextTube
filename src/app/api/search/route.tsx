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
    const query = url.searchParams.get('q');
    const data = await db.all(`SELECT vid, title, publish, duration FROM video WHERE title LIKE '%${query?.replace(" ","%")}%'`);
    
    return NextResponse.json(data);
}