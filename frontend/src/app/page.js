import Link from "next/link";

export default function Home() {
  /*
  TODO:
    Menu with options:
      Get all playlists
      Make playlist
      Browse songs
      Register song
    Playlist list
    Song list
    Playlist Details screen
    Song details screen
  */
  return (
    <main className="flex min-h-screen flex-col p-6 m-2">
      <div className="flex flex-col p-1">
        <h2 className="p-2 m-2 text-xl font-serif">Main Menu</h2>
        <Link href='/playlists' className="p-2 m-1 pl-5 text-base font-serif text-gray-200 transition-colors hover:text-blue-500">Browse Playlists</Link>
        <Link href='/songs' className="p-2 m-1 pl-5 text-base font-serif text-gray-200 transition-colors hover:text-blue-500">Browse Songs</Link>
        <Link href='/playlists/create' className="p-2 m-1 pl-5 text-base font-serif text-gray-200 transition-colors hover:text-blue-500">Create Playlist</Link>
        <Link href='/songs/register' className="p-2 m-1 pl-5 text-base font-serif text-gray-200 transition-colors hover:text-blue-500">Register Song</Link>
      </div>
    </main>
  );
}
