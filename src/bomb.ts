import Phaser from 'phaser'

export class Bomb extends Phaser.Physics.Arcade.Image {
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'bomb')

		scene.add.existing(this)
		scene.physics.add.existing(this)
	}

	static getRandomX(playerX: number): number {
		return playerX < 400
			? Phaser.Math.Between(400, 800)
			: Phaser.Math.Between(0, 400)
	}
}

export class Bombs extends Phaser.Physics.Arcade.Group {
	constructor(scene: Phaser.Scene) {
		super(scene.physics.world, scene, {
			classType: Bomb,
			maxSize: 5
		})
	}

	spawn(playerX: number) {
		const x = Bomb.getRandomX(playerX)
		const y = 16
		const newBomb = new Bomb(this.scene, x, y)
		this.add(newBomb)

		newBomb.setBounce(1)
		newBomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
		newBomb.setCollideWorldBounds(true)
	}
}
