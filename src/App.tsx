// App.tsx (reemplaza el contenido del archivo)
// import React from 'react';
import './App.css';
import { SongForm } from './components/SongForm';
import { Playlist } from './components/Playlist';
import { PlayerControls } from './components/PlayerControls';
import { useMusicPlayer } from './hooks/useMusicPlayer';

function App() {
  const {
    currentSong,
    playlist,
    queue,
    addSong,
    playSong,
    isPlaying,
    nextSong,
    prevSong,
    setIsPlaying,
    setProgress,
    progress,
    audioRef,
    removeSong,
    addToQueue,
  } = useMusicPlayer();

  const handleProgressChange = (newProgress: number) => {
    setProgress(newProgress);
    if (audioRef.current) {
      const newTime = (newProgress / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const handlePlayPause = (playing: boolean) => {
    setIsPlaying(playing);
    if (audioRef.current) {
      if (playing) audioRef.current.play();
      else audioRef.current.pause();
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen px-2 py-4 text-white bg-black sm:px-4 md:px-8 lg:px-16">
      <div className="w-full flex-1 flex flex-col justify-between items-center border-l-4 border-r-4 border-pink-300 border-opacity-60 shadow-xl rounded-xl mx-auto max-w-4xl min-h-[90vh] bg-gradient-to-b from-black via-gray-900 to-black">
        <audio
          ref={audioRef}
          src={currentSong?.url || ''}
          style={{ display: 'none' }}
          onTimeUpdate={() => {
            if (audioRef.current) {
              const progress =
                (audioRef.current.currentTime / audioRef.current.duration) * 100;
              setProgress(isNaN(progress) ? 0 : progress);
            }
          }}
          onEnded={nextSong}
          autoPlay={isPlaying}
        />

        {/* Header */}
        <header className="w-full pt-4 pb-2 border-b-2 border-pink-300 border-opacity-40">
          <div className="w-full px-2 mx-auto sm:px-4">
            <h1 className="text-2xl font-bold text-center text-pink-300 sm:text-3xl">
              Reproductor de Música
            </h1>
          </div>
        </header>

        {/* Main layout */}
        <main className="flex-1 w-full px-2 mx-auto mt-4 sm:px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {/* Left: SongForm */}
            <aside className="md:col-span-3">
              <div className="h-full card">
                <h2 className="mb-2 text-sm font-semibold text-center text-pink-200">Agregar Canción</h2>
                <SongForm onAddSong={addSong} />
              </div>
            </aside>

            {/* Center: PlayerControls */}
            <section className="flex items-center justify-center md:col-span-6">
              <div className="w-full max-w-md">
                <PlayerControls
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  progress={progress}
                  onPlayPause={handlePlayPause}
                  onNext={nextSong}
                  onPrevious={prevSong}
                  onProgressChange={handleProgressChange}
                />
              </div>
            </section>

            {/* Right: Playlist */}
            <aside className="md:col-span-3">
              <div className="h-full card">
                <h2 className="mb-2 text-sm font-semibold text-center text-pink-200">Lista de Reproducción</h2>
                <Playlist
                  songs={playlist}
                  currentSong={currentSong}
                  onPlay={playSong}
                  onRemove={removeSong}
                  onAddToQueue={addToQueue}
                  queue={queue}
                />
              </div>
            </aside>
          </div>
        </main>


        {/* Footer/Límite inferior visual */}
        <footer className="w-full py-2 text-xs text-center text-pink-200 border-t-2 border-pink-300 border-opacity-40">
          <span>Fin de la aplicación</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
