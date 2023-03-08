
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface HeroKnightPrefab {

	 body: Phaser.Physics.Arcade.Body;
}

export default class HeroKnightPrefab extends Phaser.Physics.Arcade.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 92, y ?? 92, texture || "HeroKnight", frame);

		scene.physics.add.existing(this, false);
		this.body.velocity.x = 1;
		this.body.velocity.y = 100;
		this.body.gravity.y = 300;
		this.body.collideWorldBounds = true;
		this.body.setOffset(50, 50);
		this.body.setSize(80, 65, false);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.depth = 100;
		this.anims.play("Idle"); 
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
