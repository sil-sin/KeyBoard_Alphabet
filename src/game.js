class PlayGame extends Phaser.Scene {
    constructor() {
        super('PlayGame');
        this.score = 0;
        this.currentLetter = '';
    }

    preload() {
        this.load.image('background', 'assets/background.png');
    }

    create() {
        // Set up background and UI
        this.add.rectangle(400, 300, 800, 600, 0x000000);
        
        // Score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });

        // Display letter text
        this.letterText = this.add.text(400, 300, '', {
            fontSize: '64px',
            fill: '#fff'
        });
        this.letterText.setOrigin(0.5);

        // Keyboard display
        this.displayKeyboard();

        // Start spawning letters
        this.spawnLetter();

        // Input handling
        this.input.keyboard.on('keydown', this.handleInput, this);
    }

    spawnLetter() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.currentLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        this.letterText.setText(this.currentLetter);
    }

    displayKeyboard() {
        const keys = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ];

        const startY = 400;
        keys.forEach((row, rowIndex) => {
            const startX = 400 - (row.length * 40) / 2;
            row.forEach((key, keyIndex) => {
                const keyBg = this.add.rectangle(
                    startX + keyIndex * 40,
                    startY + rowIndex * 40,
                    35,
                    35,
                    0x808080
                );
                const keyText = this.add.text(
                    startX + keyIndex * 40,
                    startY + rowIndex * 40,
                    key,
                    {
                        fontSize: '20px',
                        fill: '#ffffff'
                    }
                );
                keyText.setOrigin(0.5);
            });
        });
    }

    handleInput(event) {
        const pressedKey = event.key.toUpperCase();
        if (pressedKey === this.currentLetter) {
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            this.spawnLetter();
        }
    }

    update() {
        // Add any update logic here
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: PlayGame
};

const game = new Phaser.Game(config);
