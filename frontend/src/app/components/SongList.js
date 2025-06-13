'use client'
import Link from "next/link";

export default function SongList(params){
    const {data} = params
    console.log(data)
    return(
        <div className="flex flex-col p-4 m-6">
            <ul className="flex flex-col border rounded-sm border-gray-600">
                    {data.result.map( ({id, artist, name, duration}) =>{
                        return (<li key={id} className="p-1 m-1 font-serif text-base">
                            <Link href={`/songs/`} className="mx-1 px-2 h-8 border border-b-0 border-gray-600 align-middle text-lg">
                            {name}
                            </Link>
                            <p className="mx-1 px-2 h-8 border border-b-0 border-gray-600 align-middle">{artist}</p>
                            <p className="mx-1 px-2 h-8 border border-gray-600 align-middle">{new Date(duration * 1000).toISOString().slice(11, 19)}</p>
                        </li>)
                    })}
                </ul>
        </div>
    );
}