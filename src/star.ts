import Phaser from 'phaser'

export class Star extends Phaser.Physics.Arcade.Image {
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'star')

		scene.add.existing(this)
		scene.physics.add.existing(this)
	}
}

export class Stars extends Phaser.Physics.Arcade.Group {
	constructor(scene: Phaser.Scene) {
		super(scene.physics.world, scene, {
			classType: Star
		})

		this.createMultiple({
			classType: Star,
			key: 'star',
			repeat: 11,
			setXY: {
				x: 12,
				y: 0,
				stepX: 70
			}
		})

		this.init()
	}

	private init() {
		this.children.iterate((star) => {
			const arcadeImage = star as Star
			arcadeImage.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
			arcadeImage.setCollideWorldBounds(true)
		})
	}
}
