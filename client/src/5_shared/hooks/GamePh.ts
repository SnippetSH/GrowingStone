import * as Phaser from "phaser"
import { Basket, roundStone, squareStone, triangleStone } from "../img/img"

interface Basket {
    x: number;
    y: number;
    image: Phaser.GameObjects.Image;
}

class GamePhScene extends Phaser.Scene {
    private baskets: Basket[] = [];
    private stone: Phaser.GameObjects.Image | undefined;
    private isStoneMoving: boolean = false;
    private stoneTwin = false;
    private stoneTween: Phaser.Tweens.Tween | undefined;

    constructor() {
        super({
            key: "GamePh", active: true
        })
    }

    preload(): void {
        this.load.image("basket", Basket)
        this.load.image("roundStone", roundStone)
        this.load.image("squareStone", squareStone)
        this.load.image("triangleStone", triangleStone)
    }

    create(): void {
        const { width, height } = this.scale
        console.log(width, height)
        this.cameras.main.setBackgroundColor('#CCFFFF')

        const startX = width / 2 - 180;
        const startY = height / 2 + 120;
        let y = startY;
        let x = startX;
        for (let i = 1; i <= 20; i++) {
            // basket 이미지를 생성하여 화면에 추가하고 배열에 저장
            const basket = this.add.image(x, y, 'basket').setInteractive();
            basket.setDisplaySize(90, 90);
            this.baskets.push({ x, y, image: basket });
            
            basket.on('pointerdown', () => {
                if(this.isStoneMoving && this.stone) {
                    this.stone.setPosition(basket.x, basket.y);
                    this.isStoneMoving = false;
                    this.stopStoneEffect();
                }
            })

            x += 90;
            if(i % 5 === 0) {
                x = startX;
                y += 70;
            }
        }

        this.stone = this.add.image(this.baskets[0].x, this.baskets[0].y, "roundStone").setInteractive();
        this.stone.setTint(0x00ffff).setDisplaySize(80, 80); 
        this.stone.on('pointerdown', () => {
            console.log("pointerdown");
            this.isStoneMoving = true;
    
            if (this.isStoneMoving && this.stone && !this.stoneTwin) {
                // 효과를 적용
                const glow = this.stone.setScale(1.7).setAlpha(0.8);
                this.stoneTwin = true;
    
                // 트윈 애니메이션 생성 및 저장
                this.stoneTween = this.tweens.add({
                    targets: glow,
                    scaleX: 1,
                    scaleY: 1,
                    alpha: 1, // 원래 상태로 되돌리기 위해서 알파 값도 조정
                    duration: 1000,
                    yoyo: true,
                    repeat: -1,
                    onComplete: () => {
                        glow.clearTint().setScale(1).setAlpha(1);
                    }
                });
            }
        });        
    }

    stopStoneEffect(): void {
        if (!this.isStoneMoving && this.stone && this.stoneTween) {
            this.stoneTween.stop(); // 트윈 애니메이션 중지
            this.stone.setDisplaySize(80, 80).setAlpha(1); // 원래 상태로 복원
            this.stoneTween = undefined; // 트윈 애니메이션 참조 제거
            this.stoneTwin = false;
        }
    }

    update(time: number, delta: number): void {
        // console.log(time, delta)
    }

    destroy(): void {
        console.log("destroy")
    }
}

export default GamePhScene;