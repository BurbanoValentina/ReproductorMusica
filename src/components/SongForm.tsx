import React, { useState } from 'react';
import type { Song, AddPosition } from '../types/Song';
import { Plus } from 'lucide-react';

interface SongFormProps {
  onAddSong: (song: Song, position: AddPosition) => void;
}

export const SongForm: React.FC<SongFormProps> = ({ onAddSong }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    duration: '',
    file: null as File | null
  });
  const [position, setPosition] = useState<AddPosition>('end');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = '';
    if (formData.file) {
      url = URL.createObjectURL(formData.file);
    }
    const newSong: Song = {
      id: Date.now().toString(),
      title: formData.title,
      artist: formData.artist,
      duration: formData.duration,
      url
    };
    onAddSong(newSong, position);
    setFormData({ title: '', artist: '', duration: '', file: null });
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
    fontSize: '0.85rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  }}
>
  {/* inputs con style width: '100%' si quieres */}

      <h3 className="w-full mb-4 text-lg font-semibold" style={{
        background: 'linear-gradient(90deg, #e5a9bf 60%, #372d36 100%)',
        color: '#241a22',
        textShadow: '0 1px 3px #e5a9bf',
        borderRadius: '0.3rem',
        padding: '0.2rem 0',
        boxShadow: '0 1px 3px #e5a9bf',
        textAlign: 'center',
        fontSize: '1rem',
      }}>Agregar Canción</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div style={{
          background: '#181818',
          borderRadius: '0.3rem',
          boxShadow: '0 1px 6px #fdd6dd',
          padding: '0.3rem',
          border: '1px solid #c95ab6',
          marginTop: '0.2rem',
          marginBottom: '0.2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem',
          fontSize: '0.85rem',
        }}>
          <input
            type="text"
            placeholder="Título"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{
              background: 'linear-gradient(90deg, #e5a9bf 60%, #372d36 100%)',
              color: '#241a22',
              border: '1px solid #372d36',
              borderRadius: '0.3rem',
              padding: '0.2rem',
              boxShadow: '0 1px 3px #e5a9bf',
              fontWeight: 'bold',
              fontSize: '0.85rem',
            }}
            required
          />
          <input
            type="text"
            placeholder="Artista"
            value={formData.artist}
            onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
            style={{ background: 'linear-gradient(90deg, #372d36 60%, #e5a9bf 100%)', color: '#fdd6dd', border: '1px solid #e5a9bf', borderRadius: '0.3rem', padding: '0.2rem', boxShadow: '0 1px 3px #372d36', fontSize: '0.85rem' }}
            required
          />
          <input
            type="text"
            placeholder="Duración (ej: 3:45)"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            style={{ background: 'linear-gradient(90deg, #fdd6dd 60%, #e5a9bf 100%)', color: '#241a22', border: '1px solid #e5a9bf', borderRadius: '0.3rem', padding: '0.2rem', boxShadow: '0 1px 3px #fdd6dd', fontSize: '0.85rem' }}
            required
          />
          <div style={{
            background: '#241a22',
            borderRadius: '0.3rem',
            boxShadow: '0 1px 3px #e5a9bf',
            padding: '0.2rem',
            border: '1px solid #e5a9bf',
            display: 'flex',
            alignItems: 'center',
            color: '#fdd6dd',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            position: 'relative'
          }}>
            <label htmlFor="file-upload" style={{
              background: '#241a22',
              color: '#e5a9bf',
              borderRadius: '2rem',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              boxShadow: '0 1px 3px #372d36',
              border: 'none',
              padding: '0.2rem 0.7rem',
              cursor: 'pointer',
              marginRight: '0.5rem',
              display: 'inline-block',
              transition: 'background 0.2s, color 0.2s',
              position: 'relative'
            }}>
              Seleccionar archivo
              <input
                id="file-upload"
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFormData({ ...formData, file });
                }}
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
            <span style={{ marginLeft: '1rem', color: '#fdd6dd', fontSize: '0.95rem', fontWeight: 'bold' }}>
              {formData.file ? formData.file.name : 'Ningún archivo seleccionado'}
            </span>
          </div>
        </div>
      </div>

  <div className="mb-2">
        <h4
          style={{
            background: 'linear-gradient(90deg, #e5a9bf 60%, #372d36 100%)',
            color: '#241a22',
            fontSize: '0.95rem',
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
        <div style={{
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
        }}>
          <label className="flex items-center">
            <input
              type="radio"
              value="start"
              checked={position === 'start'}
              onChange={() => setPosition('start')}
              className="mr-1"
              style={{ accentColor: '#e5a9bf', background: 'linear-gradient(90deg, #e5a9bf 60%, #372d36 100%)', border: '1px solid #e5a9bf', fontSize: '0.85rem' }}
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
              style={{ accentColor: '#e5a9bf', background: 'linear-gradient(90deg, #e5a9bf 60%, #372d36 100%)', border: '1px solid #e5a9bf', fontSize: '0.85rem' }}
            />
            Final
          </label>
        </div>
      </div>

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
          fontSize: '1.2rem',
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
