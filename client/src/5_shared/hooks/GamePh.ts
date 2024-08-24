import * as Phaser from "phaser"
import { Basket, roundStone, squareStone, triangleStone } from "../img/img"

interface Basket {
    x: number;
    y: number;
    image: Phaser.GameObjects.Image;
}

interface StonePosition {
    x: number;
    y: number;
}

class GamePhScene extends Phaser.Scene {
    private baskets: Basket[] = [];
    private stone: Phaser.GameObjects.Image | undefined;
    private isStoneMoving: boolean = false;
    private stoneTwin = false;
    private stoneTween: Phaser.Tweens.Tween | undefined;

    private stoneInherit: boolean = false;
    private stonePositions: StonePosition[] = [];

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

            if(this.stoneInherit) {
                this.stonePositions.pop();
            }
        }); 
        
        const button = this.add.text(width/2, height - 100, 'Load Inherit', {
            fontSize: '32px',
            color: '#000',
        }).setOrigin(0.5).setInteractive();

        button.on('pointerdown', () => {
            const newW = width * 0.8;
            const newH = width * 0.7;
            const startX = width/2 - newW/2;
            const endX = startX + newW;
            const startY = height / 2 - (width * 0.35) - newH/2;
            const endY = startY + newH;

            const inherit = this.add.rectangle(width/2, height / 2 - (width * 0.35), newW, newH, 0x33ff99, 0.9).setInteractive();
            const parent1 = this.add.rectangle(startX + 100, startY + 100, 70, 70).setStrokeStyle(2, 0x000000, 0.9).setInteractive();
            const parent2 = this.add.rectangle(endX - 100, startY + 100, 70, 70).setStrokeStyle(2, 0x000000, 0.9).setInteractive();

            

            parent1.on('pointerdown', () => {
                if(this.isStoneMoving && this.stone) {
                    this.stonePositions.push({ x: this.stone.x, y: this.stone.y });
                    this.stone.setPosition(parent1.x, parent1.y);
                    this.stone.setDepth(10);
                    this.stoneInherit = true;
                    this.stopStoneEffect();
                }
            })

            parent2.on('pointerdown', () => {
                if(this.isStoneMoving && this.stone) {
                    this.stonePositions.push({ x: this.stone.x, y: this.stone.y });
                    this.stone.setPosition(parent2.x, parent2.y);
                    this.stone.setDepth(10);
                    this.stoneInherit = true;
                    this.stopStoneEffect();
                }
            })

            const returnButton = this.add.text(startX + newW / 2, endY - 100, 'Return', {
                fontSize: '32px',
                color: '#000',
            }).setOrigin(0.5).setInteractive();

            returnButton.on('pointerdown', () => {
                if(this.stonePositions.length > 0) {
                    this.stone?.setPosition(this.stonePositions[0].x, this.stonePositions[0].y);
                    this.stone?.setDepth(1);
                }
                inherit.destroy();
                parent1.destroy();
                parent2.destroy();
                returnButton.destroy();
            })  
        })
    }

    stopStoneEffect(): void {
        if (this.isStoneMoving && this.stone && this.stoneTween) {
            this.isStoneMoving = false;
            this.stoneTween.stop(); // 트윈 애니메이션 중지
            this.stone.setDisplaySize(80, 80).setAlpha(1); // 원래 상태로 복원
            this.stoneTween = undefined; // 트윈 애니메이션 참조 제거
            this.stoneTwin = false;
        }
    }

    // update(time: number, delta: number): void {
    //     // console.log(time, delta)
    // }

    destroy(): void {
        console.log("destroy")
    }
}

export default GamePhScene;