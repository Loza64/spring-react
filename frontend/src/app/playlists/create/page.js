import { Suspense } from "react";
import NewPlaylistForm from "../../components/NewPlaylistForm";
import { songs } from "../../../mockup/song";
import Link from "next/link";

export default async function Home(){
    let data = []
    try{
        data = await fetch('http://localhost:8080/api/song/').then(res => res.json())
    }
    catch(err){
        data = songs
    }
    return(
        <main className="flex min-h-screen flex-col p-6 m-2">
            <div className="flex flex-col items-center p-4 w-full">
                <Link href="/" className="hover:drop-shadow hover:bg-blue-600 transition bg-blue-500 content-center min-w-min max-w-max text-gray-200 text-base p-1
                    rounded-sm border border-gray-400 font-mono">
                    Return
                </Link>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
                <NewPlaylistForm data={data}></NewPlaylistForm>
            </Suspense>
        </main>
    );
}