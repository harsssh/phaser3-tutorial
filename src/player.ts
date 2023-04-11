import Phaser from 'phaser'
import { Star } from './star'

export class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'dude')

		scene.add.existing(this)
		scene.physics.add.existing(this)

		this.setBounce(0.1)
		this.setCollideWorldBounds(true)

		scene.anims.create({
			key: 'left',
			frames: scene.anims.generateFrameNumbers('dude', {
				start: 0,
				end: 3
			}),
			frameRate: 10,
			repeat: -1
		})

		scene.anims.create({
			key: 'turn',
			frames: [{ key: 'dude', frame: 4 }],
			frameRate: 20
		})

		scene.anims.create({
			key: 'right',
			frames: scene.anims.generateFrameNumbers('dude', {
				start: 5,
				end: 8
			}),
			frameRate: 10,
			repeat: -1
		})
	}

	updateMovement(cursor: Phaser.Types.Input.Keyboard.CursorKeys): void {
		if (cursor.left.isDown) {
			this.setVelocityX(-250)
			this.anims.play('left', true)
		} else if (cursor.right.isDown) {
			this.setVelocityX(250)
			this.anims.play('right', true)
		} else {
			this.setVelocityX(0)
			this.anims.play('turn')
		}

		if (cursor.up.isDown && this.body.touching.down) {
			this.setVelocityY(-420)
		}
	}

	collectStar(star: Star) {
		star.disableBody(true, true)
		this.scene.events.emit('scoreChanged', 10)
	}

	hitBomb() {
		this.scene.physics.pause()
		this.setTint(0xff0000)
		this.anims.play('turn')
		this.scene.events.emit('playerHitBomb')
	}
}
