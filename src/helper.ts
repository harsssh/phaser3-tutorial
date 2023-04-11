import Phaser from 'phaser'

export function createPlatforms(
	scene: Phaser.Scene
): Phaser.Physics.Arcade.StaticGroup {
	const platforms = scene.physics.add.staticGroup()

	platforms.create(400, 568, 'ground').setScale(2).refreshBody()
	platforms.create(600, 450, 'ground')
	platforms.create(50, 300, 'ground')
	platforms.create(720, 270, 'ground')

	return platforms
}
