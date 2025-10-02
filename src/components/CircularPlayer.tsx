// components/CircularPlayer.tsx
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import type { Song } from "../types/Song";

interface CircularPlayerProps {
    currentSong: Song | null;
    isPlaying: boolean;
    progress: number;
    onPlayPause: (playing: boolean) => void;
    onNext: () => void;
    onPrevious: () => void;
}

export const CircularPlayer: React.FC<CircularPlayerProps> = ({
    currentSong,
    isPlaying,
    progress,
    onPlayPause,
    onNext,
    onPrevious,
}) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-white">
            {currentSong ? (
                <>
                    {/* Título */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-pink-300"> Reproduciendo</h2>
                    </div>

                    {/* Disco circular */}
                    <div className="relative" style={{ width: 260, height: 260 }}>
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            <CircularProgressbar
                                value={progress}
                                strokeWidth={6}
                                styles={buildStyles({
                                    pathColor: "#ff9acb",
                                    trailColor: "#2c2c2c",
                                })}
                            />

                            {/* Imagen giratoria centrada */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "140px",
                                    height: "140px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    boxShadow: "0 0 18px #ff9acb, inset 0 0 10px #ff9acb",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    className={isPlaying ? "spin" : ""}
                                    style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                                >
                                    <img
                                        src="/moon-pink.jpg"
                                        alt="Moon Pink"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info de la canción */}
                    <div className="mt-4 text-center">
                        <div className="font-bold text-pink-200">{currentSong.title}</div>
                        <div className="text-base text-gray-400">{currentSong.artist}</div>
                    </div>

                    {/* Controles */}
                    <div className="flex items-center gap-4 mt-4 justify-center">
                        <button onClick={onPrevious} className="p-2 bg-gray-800 rounded hover:bg-pink-400">
                            <SkipBack size={20} />
                        </button>
                        <button
                            onClick={() => onPlayPause(!isPlaying)}
                            className="p-3 text-white bg-pink-500 rounded-full hover:bg-pink-600"
                        >
                            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                        </button>
                        <button onClick={onNext} className="p-2 bg-gray-800 rounded hover:bg-pink-400">
                            <SkipForward size={20} />
                        </button>
                    </div>
                </>
            ) : (
                <p>No hay canción seleccionada</p>
            )}

            {/* Animación CSS */}
            <style>
                {`
                    .spin {
                        animation: spinAnim 10s linear infinite;
                    }
                    @keyframes spinAnim {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};
