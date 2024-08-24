import { useState, useEffect } from "react";
import { Game, Types } from 'phaser'

export default function useGame(config: Types.Core.GameConfig, containsRef: React.RefObject<HTMLDivElement>): Game | undefined {
    const [game, setGame] = useState<Game>();

    useEffect(() => {
        if (!game && containsRef.current) {
            console.log("game")
            const newGame = new Game({ ...config, parent: containsRef.current });
            setGame(newGame);
        }

        return () => {
            if (game) {
                game.destroy(true);
            }
        };
    }, [config, containsRef, game]);

    return game;
}