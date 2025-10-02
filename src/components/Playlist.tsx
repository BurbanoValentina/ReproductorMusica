import React from 'react';
import type { Song } from '../types/Song';
import { Play, Trash2, Clock } from 'lucide-react';

interface PlaylistProps {
  songs: (Song & { isQueued?: boolean })[];
  currentSong: Song | null;
  onPlay: (index: number) => void;
  onRemove: (index: number) => void;
  onAddToQueue: (song: Song) => void;
  onInsertAt?: (song: Song, position: number) => void;
}

export const Playlist: React.FC<PlaylistProps> = ({
  songs,
  onPlay,
  onRemove,
  onAddToQueue,
  onInsertAt
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto p-2 sm:p-4 md:p-6 lg:p-8">
      {songs.length === 0 ? (
        <p className="w-full py-4 text-center text-white bg-black rounded-md">No hay canciones en la lista</p>
      ) : (
        <div className="playlist-scroll w-full max-h-[320px] overflow-y-auto">
          <ul className="flex flex-col w-full gap-2 p-0 m-0">
            {songs.map((song, index) => (
              <li
                key={song.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-pink-300 to-gray-800 rounded-md px-2 py-2 sm:py-3 text-base sm:text-base w-full transition-all duration-200
                  ${index % 2 === 0 ? 'bg-opacity-80' : 'bg-opacity-60'}
                `}
              >
                <div className="flex flex-col min-w-0">
                  <span className="font-bold truncate text-gray-900 dark:text-gray-100">
                    {song.title}
                    {song.isQueued && (
                      <span className="ml-2 text-xs text-pink-300 font-semibold">(En cola)</span>
                    )}
                  </span>
                  <span className="text-base sm:text-base text-gray-700 dark:text-gray-300">
                    {song.artist} • {song.duration}
                  </span>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-1 mt-2 sm:mt-0">
                  <button type="button" className="bg-gray-900 text-white rounded px-2 py-1 hover:bg-pink-400 transition" onClick={() => onPlay(index)}>
                    <Play size={16} />
                  </button>
                  <button type="button" className="bg-gray-900 text-white rounded px-2 py-1 hover:bg-pink-400 transition" onClick={() => onRemove(index)}>
                    <Trash2 size={16} />
                  </button>
                  <button type="button" className="bg-gray-900 text-white rounded px-2 py-1 hover:bg-pink-400 transition" onClick={() => onAddToQueue(song)}>
                    <Clock size={16} />
                  </button>
                  {onInsertAt && (
                    <input
                      type="number"
                      min={0}
                      max={songs.length - 1}
                      defaultValue={index}
                      className="w-10 text-base rounded border border-gray-300 px-1 py-0.5"
                      onBlur={e => {
                        const pos = parseInt(e.target.value, 10);
                        if (!isNaN(pos) && pos >= 0 && pos < songs.length) {
                          onInsertAt(song, pos);
                        }
                      }}
                      title="Insertar en posición"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
