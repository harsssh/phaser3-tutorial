import './style.css'
import Phaser from 'phaser'
import { Player } from './player'
import { Star, Stars } from './star'
import { Bombs } from './bomb'
import { createPlatforms } from './helper'

export class MainScene extends Phaser.Scene {
	// Objects
	player!: Player
	stars!: Stars
	bombs!: Bombs
	// Meta
	cursor!: Phaser.Types.Input.Keyboard.CursorKeys
	score!: number
	scoreText!: Phaser.GameObjects.Text
	gameOver!: boolean

	constructor() {
		super('main')
	}

	preload() {
		this.load.image('sky', '/assets/sky.png')
		this.load.image('ground', '/assets/platform.png')
		this.load.image('star', '/assets/star.png')
		this.load.image('bomb', '/assets/bomb.png')
		this.load.spritesheet('dude', '/assets/dude.png', {
			frameWidth: 32,
			frameHeight: 48
		})
	}

	create() {
		// Create Background
		this.add.image(400, 300, 'sky')

		// Create Meta
		this.cursor = this.input.keyboard.createCursorKeys()
		this.score = 0
		this.scoreText = this.add.text(16, 16, 'score: 0', {
			fontSize: '32px',
			color: '#000'
		})
		this.gameOver = false

		// Add Event Listener
		this.events.on('scoreChanged', this.updateScore, this)
		this.events.on('playerHitBomb', this.handlePlayerHitBomb, this)

		// Create Platforms
		const platforms = createPlatforms(this)

		// Create Player
		this.player = new Player(this, 100, 450)

		// Create Stars
		this.stars = new Stars(this)

		// Create Bombs
		this.bombs = new Bombs(this)

		// Set Collider and Overlap
		this.physics.add.collider(this.player, platforms)
		this.physics.add.collider(this.stars, platforms)
		this.physics.add.collider(this.bombs, platforms)

		this.physics.add.overlap(
			this.player,
			this.stars,
			(player, star) => {
				const arcadePlayer = player as Player
				const arcadeStar = star as Star
				arcadePlayer.collectStar(arcadeStar)
			},
			undefined,
			this
		)

		this.physics.add.collider(
			this.player,
			this.bombs,
			(player, _) => {
				const arcadePlayer = player as Player
				arcadePlayer.hitBomb()
			},
			undefined,
			this
		)
	}

	update() {
		this.player.updateMovement(this.cursor)

		if (this.stars.countActive(true) === 0) {
			this.stars.children.iterate(
				(child: Phaser.GameObjects.GameObject) => {
					const arcadeImage = child as Phaser.Physics.Arcade.Image
					arcadeImage.enableBody(true, arcadeImage.x, 0, true, true)
				}
			)

			this.bombs.spawn(this.player.x)
		}
	}

	updateScore(amount: number): void {
		this.score += amount
		this.scoreText.setText('Score: ' + this.score)
	}

	handlePlayerHitBomb(): void {
		this.gameOver = true
	}
}

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: [MainScene],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 550 }
		}
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
}

new Phaser.Game(config)
