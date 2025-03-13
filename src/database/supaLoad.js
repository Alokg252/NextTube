import supabase from "@/database/supaClient";

// channels
const MYchannelId = process.env.CHANNEL_ID; // @FlareFlies
const channelId = MYchannelId;
const apiKey = process.env.API_KEY;
const base_url = process.env.BASE_URL;

// duration vars
let videos = [];
let vid = "";

// execution
export default async function refreshData(){
    db.serialize(() => {

        // create playlist table
        db.run(
            `CREATE TABLE IF NOT EXISTS playlist(
                id INTEGER PRIMARY KEY,
                pid TEXT UNIQUE,
                title TEXT,
                desc TEXT,
                first TEXT,
                publish DATE
            )`,(err)=>{
                if(err)
                    log(err.message);

                // create video table
                db.run(
                    `CREATE TABLE IF NOT EXISTS video(
                        id INTEGER PRIMARY KEY,
                        vid TEXT,
                        pid TEXT,
                        title TEXT,
                        duration TEXT,
                        publish DATE,
                        FOREIGN KEY (pid) REFERENCES playlist (pid)
                        UNIQUE (vid, pid)
                    )`,async (err)=>{
                        if(err)
                            log(err.message)

                        // delete videos
                        db.run("DELETE FROM video WHERE vid != 'null'", async ()=>{

                            db.run("DELETE FROM playlist WHERE pid != 'null'", async ()=>{

                                db.run(`PRAGMA journal_mode = WAL`, async ()=>{

                                    db.run("BEGIN")
                                    // getting playlists
                                    await getChannelPlaylists(channelId, null);

                                });
                            });
                        });
                    }
                )
            }
        )
    });
}

// ----------------------------------- Playlist -----------------------------------
async function getChannelPlaylists(channelId, token) {
    let requestUrl = `${base_url}/playlists?part=contentDetails,snippet&key=${apiKey}&maxResults=50&channelId=${channelId}`;
    if(token)
        requestUrl = `${requestUrl}&pageToken=${token}`

    fetch(requestUrl)
        .then(response => response.json())
        .then(async data => {
            const playlists = data.items;
            for (let playlist of playlists) {
                log("getting " + playlist.id);
                await storePlaylist(playlist);
                await getPlaylistItems(playlist.id, null);
            }
            
            if("nextPageToken" in data)
                await getChannelPlaylists(channelId, data.nextPageToken);
            else{
                db.run("COMMIT")
                log("getting durations")
                // getting video durations
                setTimeout(async()=>{
                    await get50Duration();
                },5000);
            } 
        })
        .catch(error => console.error('Error fetching playlists:', error));
}

// ----------------------------------- Playlist Items -----------------------------------
async function getPlaylistItems(playlistId, token) {

    let requestUrl = `${base_url}/playlistItems?part=snippet&key=${apiKey}&maxResults=50&playlistId=${playlistId}`;
    if(token)
        requestUrl = `${requestUrl}&pageToken=${token}`

    fetch(requestUrl)
        .then(response => response.json())
        .then(async data => {
            const videosData = data.items;
            for(let video of videosData)
                await storeVideo(video,playlistId);

            if("nextPageToken" in data)
                await getPlaylistItems(playlistId, data.nextPageToken);
            
        })
        .catch(error => console.error('Error fetching playlist items:', error));
}

// ----------------------------------- Thumbnail -----------------------------------
async function setThumbnail(url){
    if(!((url).endsWith("no_thumbnail.jpg")))
        return url.replace("https://i.ytimg.com/vi/","").replace("/default.jpg","");
    return null;
}

// ----------------------------------- Store Playlist -----------------------------------
async function storePlaylist(data){
    let snippet = data.snippet;
    let values = [
        data.id,
        snippet.title,
        snippet.description,
        await setThumbnail(snippet.thumbnails.default.url),
        snippet.publishedAt
    ]
    const insertSql = `INSERT INTO playlist(pid, title, desc, first, publish) VALUES(?, ?, ?, ?, ?)`;
    db.run(insertSql, values);
}

// ----------------------------------- Store Video -----------------------------------
async function storeVideo(data,pid){
    let snippet = data.snippet;
    let values = [
        snippet.resourceId.videoId,
        pid,
        snippet.title,
        snippet.publishedAt
    ]

    if(snippet.title !== "Private video" && snippet.title !== "Deleted video"){
        const insertSql = `INSERT INTO video(vid, pid, title, publish) VALUES(?, ?, ?, ?)`;
        db.run(insertSql, values);
    }
}

// ----------------------------------- Duration -----------------------------------
async function load(data){
    data.map((p,i)=>{
       vid = vid + p.vid + ",";
       if(i%49 == 0 || i == data.length-1){
           videos.push(vid);
           vid = "";
       }
    })
}

async function getVideoDuration(v){
    const apiKey = process.env.API_KEY;
    const base_url = process.env.BASE_URL;
    const url = `${base_url}/videos?part=contentDetails&key=${apiKey}&id=${v}`;
    await fetch(url).then(res => res.json()).then(res => {
        res.items.map((p)=>{
            db.run("UPDATE video SET duration = ? WHERE vid = ?", [p.contentDetails.duration, p.id]);
        })
    })
    .catch(error => console.error('Error fetching playlists:', error));
}

async function get50Duration(){    
    // open database
    let dbms = await open({
        filename: vpdb,
        driver: sqlite3.Database
    });

    const data = await dbms.all("SELECT vid FROM video WHERE duration IS NULL");
    await load(data);
    videos.map(async (v)=>{
        await getVideoDuration(v);
    })
}
