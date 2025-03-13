import {VideoSet, PlaylistSet} from "@/database/SupaSet";
import sqlite3 from 'sqlite3';
import { open } from "sqlite";
import { vpdb } from "@/database/refresh";
import supabase from "@/database/supaClient";

const playlistSet = new PlaylistSet();
const videoSet = new VideoSet();

export default async function supaLoad() {

    const db = await open({
        filename: vpdb,
        driver: sqlite3.Database
    });
    
    const data1 = await db.all(`SELECT * FROM playlist`);
    data1.map(async (p)=>{
        playlistSet.add(p);
    })
    
    const data2 = await db.all(`SELECT * FROM video`);
    data2.map(async (v)=>{
        videoSet.add(v);
    })
    
    let {pdata, error1} = await supabase
    .from('playlist')
    .insert(playlistSet.getValues());
    
    if(error1){
        console.log(JSON.stringify(error1));
    }
    
    let {vdata, error2} = await supabase
    .from('video')
    .insert(videoSet.getValues());

    if(error2){
        console.log(JSON.stringify(error2));
    }
}