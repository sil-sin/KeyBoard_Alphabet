import { Start } from './scenes/Start.js';
import { KeyboardGame } from './scenes/KeyboardGame.js';

const config = {
    type: Phaser.AUTO,
    title: 'Keyboard Alphabet Learning Game',
    description: 'Learn the keyboard alphabet in a fun way!',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Start,
        KeyboardGame
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            