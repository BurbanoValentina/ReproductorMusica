import React, { useState, useRef } from 'react';
import type { Song, AddPosition } from '../types/Song';
import { Plus } from 'lucide-react';

interface SongFormProps {
  onAddSong: (song: Song, position: AddPosition) => void;
}

export const SongForm: React.FC<SongFormProps> = ({ onAddSong }) => {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<AddPosition>('end');
  const fileInputRef = useRef<HTMLInputElement>(null); // ✅ NUEVO

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    // ✅ Validación de tipo de archivo
    if (!file.type.startsWith('audio/')) {
      alert('Por favor selecciona un archivo de audio válido.');
      return;
    }

    const url = URL.createObjectURL(file);

    const newSong: Song = {
      id: Date.now().toString(),
      title: file.name,
      artist: "Desconocido",
      duration: "0:00",
      url
    };

    onAddSong(newSong, position);
    setFile(null);

    // ✅ Reiniciar visualmente el input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-fullwidth"
      style={{
        background: '#181818',
        color: '#fff',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        fontSize: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
      }}
    >
      {/* Input de archivo */}
      <div
        style={{
          background: '#241a22',
          borderRadius: '0.3rem',
          boxShadow: '0 1px 3px #e5a9bf',
          padding: '0.2rem',
          border: '1px solid #e5a9bf',
          display: 'flex',
          alignItems: 'center',
          color: '#fdd6dd',
          fontWeight: 'bold',
          fontSize: '1rem',
          position: 'relative'
        }}
      >
        <label
          htmlFor="file-upload"
          style={{
            background: '#241a22',
            color: '#e5a9bf',
            borderRadius: '2rem',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 1px 3px #372d36',
            border: 'none',
            padding: '0.2rem 0.7rem',
            cursor: 'pointer',
            marginRight: '0.5rem',
            display: 'inline-block',
            transition: 'background 0.2s, color 0.2s',
            position: 'relative'
          }}
        >
          Seleccionar archivo
          <input
            ref={fileInputRef} // ✅ NUEVO
            id="file-upload"
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
            required
          />
        </label>
        <span
          style={{
            marginLeft: '1rem',
            color: '#fdd6dd',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {file ? file.name : 'Ningún archivo seleccionado'}
        </span>
      </div>

      {/* Posición en lista */}
      <div className="mb-2">
        <h4
          style={{
            background: 'linear-gradient(90deg, #e5a9bf 60%, #372d36 100%)',
            color: '#241a22',
            fontSize: '1rem',
            fontWeight: 'bold',
            textShadow: '0 1px 3px #e5a9bf',
            marginBottom: '0.3rem',
            marginTop: '0.2rem',
            letterSpacing: '0.5px',
            textAlign: 'center',
            borderRadius: '0.3rem',
            padding: '0.2rem 0',
            boxShadow: '0 1px 3px #e5a9bf',
          }}
        >
          Posición en lista
        </h4>
        <div
          style={{
            background: 'linear-gradient(90deg, #e5a9bf 60%, #372d36 100%)',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px #e5a9bf',
            padding: '0.2rem',
            border: '1px solid #e5a9bf',
            marginTop: '0.1rem',
            marginBottom: '0.1rem',
            display: 'flex',
            gap: '0.7rem',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <label className="flex items-center">
            <input
              type="radio"
              value="start"
              checked={position === 'start'}
              onChange={() => setPosition('start')}
              className="mr-1"
              style={{ accentColor: '#e5a9bf' }}
            />
            Inicio
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="end"
              checked={position === 'end'}
              onChange={() => setPosition('end')}
              className="mr-1"
              style={{ accentColor: '#e5a9bf' }}
            />
            Final
          </label>
        </div>
      </div>

      {/* Botón de agregar */}
      <button
        type="submit"
        className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
        style={{
          background: 'linear-gradient(90deg, #e5a9bf 60%, #372d36 100%)',
          color: '#241a22',
          border: '1px solid #e5a9bf',
          boxShadow: '0 1px 3px #e5a9bf',
          width: '32px',
          height: '32px',
          transition: 'transform 0.2s',
          fontSize: '1rem',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="Agregar canción"
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Plus size={18} color="#fff" style={{ filter: 'drop-shadow(0 0 2px #c95ab6)' }} />
      </button>
    </form>
  );
};
