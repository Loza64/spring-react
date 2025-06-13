import { playlists } from "../../../mockup/playlist";
import { playlistxsong } from "../../../mockup/playlistxsong";
import { songs } from "../../../mockup/song";
import { Suspense } from "react";
import PlaylistDetail from "@/app/components/PlaylistDetail";

export default async function Id({params}){
    const {id} = await params
    let data
    try{
        data = await fetch(`http://localhost:8080/api/playlist/${id}`).then((res) => res.json())
    }
    catch(err){
        for(let obj of playlists){
            // console.log(obj)
            if(obj.id === id){
                data = obj
                break;
            }
        }
        try{
            // console.log(data);
            let {name, description, duration} = data
            let songlist = []
            let songIds = []
            for(let obj of playlistxsong){
                if(obj.playlist_id === id){
                    songIds.push(obj.song_id)
                }
            }
            // console.log(songIds);
            for(let obj of songIds){
                for(let obj2 of songs){
                    // console.log(obj2);
                    if(obj === obj2.id){
                        songlist.push(obj2);
                        break;
                    }
                }
            }
            // console.log(songlist);
            data = {name, description, duration, songlist}
        }
        catch(err){
            // console.log(err)
            data = {name: "", description: "", duration: 0, songlist: []}
        }
    }
    return(
        <main className="flex min-h-screen flex-col p-6 m-2">
            <Suspense fallback={<p>Loading...</p>}>
                <PlaylistDetail data={data}></PlaylistDetail>
            </Suspense>
        </main>
    );
}