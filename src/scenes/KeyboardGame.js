export class KeyboardGame extends Phaser.Scene {
    constructor() {
        super('KeyboardGame');
        this.score = 0;
        this.currentLetterIndex = 0;
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.currentLetter = '';
        this.keyboardKeys = {};
    }

    preload() {
        this.load.image('space', 'assets/space.png');
        this.load.image('phaser-logo', 'assets/phaser.png');
    }

    create() {
        // Colorful background
        this.add.rectangle(640, 360, 1280, 720, 0x87CEEB); // Sky blue
        
        // Fun title
        this.add.text(640, 80, 'Learn Your ABCs!', {
            fontSize: '64px',
            fill: '#FF1493',
            fontFamily: 'Arial, sans-serif',
            stroke: '#FFFFFF',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Progress display - show which letter we're on
        this.progressText = this.add.text(640, 140, '', {
            fontSize: '28px',
            fill: '#000080',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);

        // Big letter display with colorful background
        this.letterDisplay = this.add.rectangle(640, 250, 200, 200, 0xFFFFFF);
        this.letterDisplay.setStrokeStyle(6, 0xFF69B4);
        
        this.letterText = this.add.text(640, 250, '', {
            fontSize: '120px',
            fill: '#FF0000',
            fontFamily: 'Arial, sans-serif',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Simple instruction
        this.add.text(640, 360, '👆 Press this letter on your keyboard! 👆', {
            fontSize: '32px',
            fill: '#000080',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);

        // Keyboard layout - bigger and more colorful
        this.createKeyboard();

        // Input handling
        this.input.keyboard.on('keydown', this.handleKeyPress, this);

        // Start with letter A
        this.showCurrentLetter();

        // Back to menu button
        const backButton = this.add.rectangle(100, 650, 200, 60, 0xFF69B4);
        backButton.setStrokeStyle(3, 0xFFFFFF);
        this.add.text(100, 650, 'Back to Menu', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start('Start');
        });
    }

    createKeyboard() {
        const keyboardLayout = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ];

        const startY = 450;
        const keySize = 60;
        const keySpacing = 70;
        const grayColor = 0x808080; // Gray color for all keys

        keyboardLayout.forEach((row, rowIndex) => {
            const rowWidth = row.length * keySpacing;
            const startX = 640 - (rowWidth / 2) + (keySpacing / 2);

            row.forEach((letter, keyIndex) => {
                const x = startX + keyIndex * keySpacing;
                const y = startY + rowIndex * keySpacing;

                // Gray key background
                const keyBg = this.add.rectangle(x, y, keySize, keySize, grayColor);
                keyBg.setStrokeStyle(3, 0xFFFFFF);

                // White text on gray keys
                const keyText = this.add.text(x, y, letter, {
                    fontSize: '32px',
                    fill: '#FFFFFF',
                    fontFamily: 'Arial, sans-serif'
                }).setOrigin(0.5);

                // Store key references for highlighting
                this.keyboardKeys[letter] = {
                    background: keyBg,
                    text: keyText,
                    originalColor: grayColor
                };
            });
        });
    }

    showCurrentLetter() {
        // Get current letter from alphabet in order
        this.currentLetter = this.alphabet[this.currentLetterIndex];
        this.letterText.setText(this.currentLetter);
        
        // Update progress display
        this.progressText.setText(`Letter ${this.currentLetterIndex + 1} of 26: ${this.currentLetter}`);
        
        // Highlight the key on keyboard
        this.highlightKey(this.currentLetter);
    }

    highlightKey(letter) {
        // Reset all keys to their original colors
        Object.values(this.keyboardKeys).forEach(key => {
            key.background.setFillStyle(key.originalColor);
            key.text.setColor('#FFFFFF'); // Reset text to white
        });

        // Make current letter key bright and glow
        if (this.keyboardKeys[letter]) {
            this.keyboardKeys[letter].background.setFillStyle(0xFFFF00); // Bright yellow
            this.keyboardKeys[letter].text.setColor('#000000'); // Black text
            
            // Add a gentle pulsing effect
            this.tweens.add({
                targets: this.keyboardKeys[letter].background,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 800,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }

    handleKeyPress(event) {
        const pressedKey = event.key.toUpperCase();
        
        // Only accept letter keys
        if (pressedKey.match(/[A-Z]/)) {
            if (pressedKey === this.currentLetter) {
                // Correct! Big celebration
                this.celebrateCorrectAnswer();
                
                // Move to next letter
                this.currentLetterIndex++;
                
                // Check if we've completed the alphabet
                if (this.currentLetterIndex >= 26) {
                    this.celebrateCompletion();
                } else {
                    // Show next letter after a short delay
                    this.time.delayedCall(1000, () => {
                        this.showCurrentLetter();
                    });
                }
            } else {
                // Wrong answer - gentle feedback, no punishment
                this.letterDisplay.setFillStyle(0xFFAAAA); // Light red
                this.time.delayedCall(300, () => {
                    this.letterDisplay.setFillStyle(0xFFFFFF); // Back to white
                });
            }
        }
    }
    
    celebrateCorrectAnswer() {
        // Big happy flash effect
        this.letterDisplay.setFillStyle(0x00FF00); // Green
        
        this.tweens.add({
            targets: this.letterDisplay,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 200,
            yoyo: true,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                this.letterDisplay.setFillStyle(0xFFFFFF); // Back to white
            }
        });
        
        // Make the letter text dance
        this.tweens.add({
            targets: this.letterText,
            angle: 10,
            duration: 100,
            yoyo: true,
            repeat: 3,
            ease: 'Power2'
        });
    }
    
    celebrateCompletion() {
        // Amazing! They completed the whole alphabet!
        const celebrationBg = this.add.rectangle(640, 360, 800, 500, 0xFFD700, 0.9); // Gold background
        celebrationBg.setStrokeStyle(8, 0xFF1493);
        
        this.add.text(640, 250, '🎉 AMAZING! 🎉', {
            fontSize: '64px',
            fill: '#FF1493',
            fontFamily: 'Arial, sans-serif',
            stroke: '#FFFFFF',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.add.text(640, 320, 'You know your ABCs!', {
            fontSize: '40px',
            fill: '#000080',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        
        this.add.text(640, 380, 'Great job! 🌟', {
            fontSize: '32px',
            fill: '#FF0000',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        
        // Play Again button
        const playAgainButton = this.add.rectangle(540, 480, 200, 60, 0x00AA00);
        playAgainButton.setStrokeStyle(3, 0xFFFFFF);
        this.add.text(540, 480, 'Play Again!', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        
        playAgainButton.setInteractive();
        playAgainButton.on('pointerdown', () => {
            this.scene.restart();
        });
        
        // Menu button
        const menuButton = this.add.rectangle(740, 480, 200, 60, 0xFF69B4);
        menuButton.setStrokeStyle(3, 0xFFFFFF);
        this.add.text(740, 480, 'Back to Menu', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif'
        }).setOrigin(0.5);
        
        menuButton.setInteractive();
        menuButton.on('pointerdown', () => {
            this.scene.start('Start');
        });
        
        // Make everything sparkle!
        this.tweens.add({
            targets: celebrationBg,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    update() {
        // No background scrolling needed for simple version
    }
}
