import React from 'react';
import type { Song } from '../types/Song';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface PlayerControlsProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  onPlayPause: (playing: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onProgressChange: (progress: number) => void;
}

// PlayerControls.tsx (parte relevante)
export const PlayerControls: React.FC<PlayerControlsProps> = ({
  currentSong,
  isPlaying,
  progress,
  onPlayPause,
  onNext,
  onPrevious,
  onProgressChange
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2" style={{ maxWidth: '340px', margin: '0 auto', padding: '0.25rem' }}>
      {currentSong ? (
        <>
          <div className="text-center">
            <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.2rem' }}>Reproduciendo</h3>
            <div style={{ color: '#fff', fontSize: '1rem', lineHeight: 1.1 }}>{currentSong.title}</div>
            <div style={{ color: '#ddd', fontSize: '1rem' }}>{currentSong.artist}</div>
          </div>

          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#e5a9bf', fontSize: '1rem', minWidth: '36px', textAlign: 'center' }}>{formatTime((progress / 100) * 180)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => onProgressChange(parseFloat(e.target.value))}
              className="form-range"
              style={{ width: '100%', height: '12px', padding: 0 }}
            />
            <span style={{ color: '#e5a9bf', fontSize: '1rem', minWidth: '36px', textAlign: 'center' }}>{currentSong.duration}</span>
          </div>

          <div className="flex items-center justify-center gap-2" style={{ marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-dark btn-sm" onClick={onPrevious} style={{ padding: '4px 6px' }}>
              <SkipBack size={14} />
            </button>
            <button type="button" className="btn btn-dark btn-sm" onClick={() => onPlayPause(!isPlaying)} style={{ padding: '6px 8px' }}>
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button type="button" className="btn btn-dark btn-sm" onClick={onNext} style={{ padding: '4px 6px' }}>
              <SkipForward size={14} />
            </button>
          </div>
        </>
      ) : (
        <p style={{ color: '#e0e0e0' }}>No hay canción seleccionada</p>
      )}
    </div>
  );
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};