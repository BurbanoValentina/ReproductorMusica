import './App.css';
import { SongForm } from './components/SongForm';
import { Playlist } from './components/Playlist';
import { CircularPlayer } from './components/CircularPlayer';
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

  const handlePlayPause = (playing: boolean) => {
    setIsPlaying(playing);
    if (audioRef.current) {
      if (playing) audioRef.current.play();
      else audioRef.current.pause();
    }
  };

  // 🔄 Combinar cola y playlist
  const combinedList = [
    ...queue.map(song => ({ ...song, isQueued: true })),
    ...playlist.map(song => ({ ...song, isQueued: false }))
  ];

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
          <div className="w-full px-2 mx-auto text-center sm:px-4">
            <h1 className="titulo-neon display-3 fw-bold">
              PequeMochi Song
            </h1>
          </div>
        </header>

        {/* Main layout */}
        <main className="flex-1 w-full px-2 mx-auto mt-4 sm:px-4 min-h-[60vh]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 min-h-[60vh]">
            {/* Left: SongForm */}
            <aside className="md:col-span-3">
              <div className="h-full card">
                <SongForm onAddSong={addSong} />
              </div>
            </aside>

            {/* Center: CircularPlayer */}
            <section id="c" className="flex flex-col items-center justify-center w-full">
              <div className="flex flex-rowv flex-grap items-center w-full">
                <CircularPlayer
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  progress={progress}
                  onPlayPause={handlePlayPause}
                  onNext={nextSong}
                  onPrevious={prevSong}
                />
              </div>
            </section>

            {/* Right: Playlist */}
            <aside className="md:col-span-3">
              <div className="h-full card">
                <h2 className="mb-2 font-semibold text-center text-pink-200">
                  Lista de Reproducción
                </h2>
                <Playlist
                  songs={combinedList}
                  currentSong={currentSong}
                  onPlay={playSong}
                  onRemove={removeSong}
                  onAddToQueue={addToQueue}
                />
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-2 text-base text-center text-pink-200 border-t-2 border-pink-300 border-opacity-40">
          <span>Fin de la aplicación</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
