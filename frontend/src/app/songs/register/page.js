'use client'
import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Home(){
        let obj;
        const [name="", setName] = useState();
        const [artist="", setArtist] = useState();
        const [duration=0, setDuration] = useState();
        const [vis = false, setVis] = useState();
        const handleSubmit = (e) => {
            e.preventDefault()
            let f = isNaN(duration)
            if(f){
                setVis(true)
                setDuration(0)
            }
            else{
                obj = {artist, name, duration}
                let _res = fetch('http://localhost:8080/api/song/', {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(obj),
                })
                _res.then(res => setVis(!res.ok)).catch(err => setVis(true))
            }
        }
    return (
        <main className="flex min-h-screen flex-col p-6 m-2">
            <div className="flex flex-col items-center p-4 w-full">
                    <Link href="/" className="hover:drop-shadow hover:bg-blue-600 transition bg-blue-500 content-center min-w-min max-w-max text-gray-200 text-base p-1
                        rounded-sm border border-gray-400 font-mono">
                        Return
                    </Link>
                </div>
            <form className="flex min-h-screen flex-col p-6 m-2">
                {vis ? (<p id='errorText'>An error ocurred!</p>) : (<p></p>) }
                <label htmlFor="nameInput" className="font-serif text-base">Artist: </label>
                <input type="text" id="nameInput" className="bg-white border rounded-sm text-black" value={artist} onChange={e => setArtist(e.target.value)}></input>
                <label htmlFor="descInput" className="font-serif text-base">Name: </label>
                <input type="text" id="descInput" className="bg-white border rounded-sm text-black" value={name} onChange={e => setName(e.target.value)}></input>
                <label htmlFor="durInput" className="font-serif text-base">Duration in Seconds: </label>
                <input type="number" id="durInput" className="bg-white border rounded-sm text-black" value={duration} onChange={e => setDuration(e.target.value)}></input>
                <button onClick={(e) => handleSubmit(e)} className="p-4 m-4 bg-green-500 max-w-max self-center border rounded-sm text-gray-700
                    transition-colors hover:text-gray-500 font-serif text-lg">Submit</button>
            </form>
        </main>
    );
}