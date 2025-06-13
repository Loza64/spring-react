import { songs } from "../../mockup/song";
import Link from "next/link";
import { Suspense } from "react";
import SongList from "../components/SongList";

export default async function Home(){
    let data = []
    try{
        const _res = await fetch('http://localhost:8080/api/song/')
        data = await _res.json()
    }
    catch(err){
        data = songs
    }
    return(
        <main>
            <div className="flex flex-col items-center p-4 w-full">
                <Link href="/" className="hover:drop-shadow hover:bg-blue-600 transition bg-blue-500 content-center min-w-min max-w-max text-gray-200 text-base p-1
                    rounded-sm border border-gray-400 font-mono">
                    Return
                </Link>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
                <SongList data={data}></SongList>
            </Suspense>
        </main>
    );
}