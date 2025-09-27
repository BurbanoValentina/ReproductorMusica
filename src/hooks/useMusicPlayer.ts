import { useState, useRef, useEffect } from 'react';
import { DoublyLinkedList } from '../data-structures/DoublyLinkedList';
import { Queue } from '../data-structures/Queue';
import { Stack } from '../data-structures/Stack';
import type { Song, AddPosition } from '../types/Song';

export const useMusicPlayer = () => {
  const [playlist, setPlaylist] = useState(new DoublyLinkedList<Song>());
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const playedSongs = useRef(new Stack<Song>());
  const songQueue = useRef(new Queue<Song>());

  // Canciones de ejemplo
  const sampleSongs: Song[] = [
    {
      id: '1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      duration: '5:55',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    },
    {
      id: '2',
      title: 'Imagine',
      artist: 'John Lennon',
      duration: '3:04',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    },
    {
      id: '3',
      title: 'Hotel California',
      artist: 'Eagles',
      duration: '6:30',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
    }
  ];

  useEffect(() => {
    // Inicializar con canciones de ejemplo
    const newPlaylist = new DoublyLinkedList<Song>();
    sampleSongs.forEach(song => newPlaylist.addLast(song));
    setPlaylist(newPlaylist);
  }, []);

  // Agregar canción
  const addSong = (song: Song, position: AddPosition) => {
    const newPlaylist = new DoublyLinkedList<Song>();
    const currentArray = playlist.toArray();
    
    if (position === 'start') {
      newPlaylist.addFirst(song);
      currentArray.forEach(s => newPlaylist.addLast(s));
    } else if (position === 'end') {
      currentArray.forEach(s => newPlaylist.addLast(s));
      newPlaylist.addLast(song);
    } else {
      currentArray.forEach((s, index) => {
        if (index === position) {
          newPlaylist.addLast(song);
        }
        newPlaylist.addLast(s);
      });
    }
    
    setPlaylist(newPlaylist);
  };

  // Eliminar canción
  const removeSong = (index: number) => {
    const newPlaylist = new DoublyLinkedList<Song>();
    const currentArray = playlist.toArray();
    
    currentArray.forEach((song, i) => {
      if (i !== index) {
        newPlaylist.addLast(song);
      }
    });
    
    setPlaylist(newPlaylist);
    
    if (currentIndex === index) {
      nextSong();
    } else if (currentIndex > index) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Reproducir canción
  const playSong = (index: number) => {
    const song = playlist.getAt(index);
    if (song) {
      setCurrentSong(song);
      setCurrentIndex(index);
      setIsPlaying(true);
      setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  // Siguiente canción
  const nextSong = () => {
    if (currentIndex < playlist.getSize() - 1) {
      if (currentSong) playedSongs.current.push(currentSong);
      playSong(currentIndex + 1);
    }
  };

  // Canción anterior
  const prevSong = () => {
    if (!playedSongs.current.isEmpty()) {
      const previousSong = playedSongs.current.pop();
      if (previousSong) {
        const index = playlist.toArray().findIndex(s => s.id === previousSong.id);
        if (index !== -1) {
          setCurrentSong(previousSong);
          setCurrentIndex(index);
          setIsPlaying(true);
          setTimeout(() => audioRef.current?.play(), 100);
        }
      }
    } else if (currentIndex > 0) {
      playSong(currentIndex - 1);
    }
  };

  // Agregar a la cola
  const addToQueue = (song: Song) => {
    songQueue.current.enqueue(song);
    // Solo agregar a la cola, no reproducir automáticamente
  };

  // Reproducir siguiente de la cola
  const playNextFromQueue = () => {
    if (!songQueue.current.isEmpty()) {
      const nextSong = songQueue.current.dequeue();
      if (nextSong) {
        const newPlaylist = new DoublyLinkedList<Song>();
        const currentArray = playlist.toArray();
        
        currentArray.forEach((s, index) => {
          newPlaylist.addLast(s);
          if (index === currentIndex) {
            newPlaylist.addLast(nextSong);
          }
        });
        
        setPlaylist(newPlaylist);
      }
    }
  };

  // Manejar progreso de la canción
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(progress) ? 0 : progress);
    }
  };

  // Manejar fin de canción
  const handleEnded = () => {
    nextSong();
  };

  return {
    playlist: playlist.toArray(),
    currentSong,
    currentIndex,
    isPlaying,
    progress,
    audioRef,
    addSong,
    removeSong,
    playSong,
    nextSong,
    prevSong,
    setIsPlaying,
    setProgress,
    handleTimeUpdate,
    handleEnded,
    addToQueue,
    playNextFromQueue,
    queueSize: songQueue.current.size(),
    playedSongsSize: playedSongs.current.size(),
    queue: songQueue.current.toArray(),
    playedSongs: playedSongs.current.toArray(),
  };
};