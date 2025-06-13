'use client'
import { useState } from "react";

export default function NewPlaylistForm({ data }) {
    const [songIds, setSongIds] = useState(new Set());
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [totalDuration, setTotalDuration] = useState(0);
    const [error, setError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClick = (e, id, dur) => {
        e.preventDefault();
        const newSongIds = new Set(songIds);
        
        if (newSongIds.has(id)) {
            newSongIds.delete(id);
            setTotalDuration(prev => prev - dur);
        } else {
            newSongIds.add(id);
            setTotalDuration(prev => prev + dur);
        }
        
        setSongIds(newSongIds);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch('http://localhost:8080/api/playlist/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    duration: totalDuration,
                    songIds: Array.from(songIds)
                }),
            });

            if (!response.ok) {
                throw new Error('Error creating playlist');
            }

            // Reset form after successful submission
            setName("");
            setDescription("");
            setSongIds(new Set());
            setTotalDuration(0);
            setError(false);
            
            // Opcional: redirección o notificación
            // router.push('/playlists');
            
        } catch (err) {
            console.error('Error:', err);
            setError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="flex min-h-screen flex-col p-6 m-2" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">An error occurred!</p>}
            
            <label htmlFor="nameInput" className="font-serif text-base">Name: </label>
            <input 
                type="text" 
                id="nameInput" 
                className="bg-white border rounded-sm text-black" 
                value={name} 
                onChange={e => setName(e.target.value)}
                required
            />
            
            <label htmlFor="descInput" className="font-serif text-base">Description: </label>
            <input 
                type="text" 
                id="descInput" 
                className="bg-white border rounded-sm text-black" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
            />
            
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="p-4 m-4 bg-green-500 max-w-max self-center border rounded-sm text-gray-700
                transition-colors hover:text-gray-500 font-serif text-lg disabled:bg-gray-400"
            >
                {isSubmitting ? 'Creating...' : 'Create Playlist'}
            </button>
            
            <ul className="flex flex-col border rounded-sm border-gray-600">
                {data.result.map(({id, name, artist, duration}) => (
                    <li key={id} className="p-1 m-1 font-serif text-base content-center">
                        <p className="mx-1 px-2 h-8 border border-b-0 border-gray-600 align-middle text-lg">
                            {name}
                        </p>
                        <p className="mx-1 px-2 h-8 border border-b-0 border-gray-600 align-middle">
                            {artist}
                        </p>
                        <p className="mx-1 px-2 h-8 border border-gray-600 align-middle">
                            {new Date(duration * 1000).toISOString().slice(11, 19)}
                        </p>
                        <button 
                            onClick={(e) => handleClick(e, id, duration)} 
                            className="p-2 m-2 bg-blue-500 max-w-max self-center border rounded-sm text-gray-800
                            transition-colors hover:text-gray-200 font-serif text-lg"
                        >
                            {songIds.has(id) ? 'Remove from Playlist' : 'Add to Playlist'}
                        </button>
                    </li>
                ))}
            </ul>
        </form>
    );
}