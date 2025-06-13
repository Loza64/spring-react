'use client'
import Link from "next/link";
import SongList from "./SongList";

export default function PlaylistDetail(params){
    const {data} = params
    // console.log(data)
    return(
    <main className="flex min-h-screen flex-col p-6 m-2">
        <div className="flex flex-col items-center p-4 w-full">
            <Link href="/" className="hover:drop-shadow hover:bg-blue-600 transition bg-blue-500 content-center min-w-min max-w-max text-gray-200 text-base p-1
                rounded-sm border border-gray-400 font-mono">
                Return to Main Menu
            </Link>
        </div>
        <div className="flex flex-col p-4 m-6">
            <div className="p-1 m-1 font-serif text-base">
                <p className="mx-1 px-2 h-8 border border-b-0 border-gray-600 align-middle text-lg">{data.result.name}</p>
                <p className="mx-1 px-2 h-8 border border-b-0 border-gray-600 align-middle">{data.result.description}</p>
                <p className="mx-1 px-2 h-8 border border-gray-600 align-middle">{new Date(data.result.duration * 1000).toISOString().slice(11, 19)}</p>
            </div>
        </div>
        <div className="flex flex-col p-4 m-6">
            <SongList data={data.result.songs}></SongList>
        </div>
    </main>
    );
}