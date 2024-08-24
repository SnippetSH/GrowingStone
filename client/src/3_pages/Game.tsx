import { useEffect, useRef, useState } from "react"
import GamePhScene from "../5_shared/hooks/GamePh";
import useGame from "../4_widgets/MainGame";
import { Types } from "phaser";



export default function Game() {
    const gameRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    const gameConfig: Types.Core.GameConfig = {
        width: '100%',
        height: '100%',
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        render: {
          antialias: false,
          pixelArt: true,
          roundPixels: true,
        },
        scene: GamePhScene,
    };

    useGame(gameConfig, gameRef);

    useEffect(() => {
      if(gameRef.current) {
        setWidth(gameRef.current.clientWidth);
      }
    }, [gameRef]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div id="main-game" style={{height: width * 1.618, maxHeight: "100%"}} ref={gameRef} className="flexible overflow-hidden"></div>
        </div>
    )
}