export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('logo', 'assets/phaser.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        // Game title
        this.add.text(640, 100, 'Keyboard Alphabet', {
            fontSize: '64px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);

        this.add.text(640, 160, 'Learning Game', {
            fontSize: '32px',
            fill: '#cccccc',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);

        const logo = this.add.image(640, 280, 'logo').setScale(0.5);

        const ship = this.add.sprite(640, 400, 'ship');

        ship.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });

        ship.play('fly');

        // Start Game Button
        const startButton = this.add.rectangle(640, 500, 300, 60, 0x00aa00);
        startButton.setStrokeStyle(3, 0xffffff);
        
        const startText = this.add.text(640, 500, 'Start Game', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);

        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('KeyboardGame');
        });

        startButton.on('pointerover', () => {
            startButton.setFillStyle(0x00cc00);
            startText.setScale(1.1);
        });

        startButton.on('pointerout', () => {
            startButton.setFillStyle(0x00aa00);
            startText.setScale(1);
        });

        // Instructions
        this.add.text(640, 600, 'Learn your letters from A to Z! 🌈', {
            fontSize: '28px',
            fill: '#FFD700',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);

        this.add.text(640, 630, 'Press each letter when it appears on screen! 🎯', {
            fontSize: '22px',
            fill: '#FFA500',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: ship,
            x: 680,
            duration: 2000,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: -1
        });
    }

    update() {
        this.background.tilePositionX += 2;
    }
    
}
