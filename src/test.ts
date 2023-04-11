export abstract class Collectable {
	collected() {
		// 取得された時に何かする
	}
}

export class Star extends Collectable {
	collected() {}
}

export class Player {
	collect(obj: Collectable) {
		obj.collected()
		// ...
	}
}
