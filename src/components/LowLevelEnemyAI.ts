
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class LowLevelEnemyAI extends UserComponent {

	constructor(gameObject: Phaser.Physics.Arcade.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__LowLevelEnemyAI"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.Physics.Arcade.Sprite): LowLevelEnemyAI {
		return (gameObject as any)["__LowLevelEnemyAI"];
	}

	private gameObject: Phaser.Physics.Arcade.Sprite;
	public heroKnight!: Phaser.Physics.Arcade.Sprite;

	/* START-USER-CODE */

	// Write your code here.
	private lowLevelEnemyHitCount: number = 18;


	update() {
		this.scene.physics.add.overlap(this.heroKnight, this.gameObject, (heroKnight, lowLevelEnemy) => {
			if (this.heroKnight.anims.currentAnim.key == "Attack1" && 
			    this.heroKnight.anims.currentFrame == this.heroKnight.anims.currentAnim.getLastFrame()) {
				this.lowLevelEnemyHitCount -= 1;  // BUG: DUE TO SOMETHING, A COUNTER SET TO 18 takes 3 HITS
				this.gameObject.anims.play("EWTakeHit", true);
				this.gameObject.anims.stopAfterRepeat(0);
				if (this.lowLevelEnemyHitCount < 0) {
					this.gameObject.anims.play("EWDeath");
					this.gameObject.anims.stopAfterRepeat(0);
				}
			} else if (this.gameObject.anims.currentAnim.key == "EWDeath" && 
			    this.gameObject.anims.currentFrame == this.gameObject.anims.currentAnim.getLastFrame()) {
				this.gameObject.destroy();
			} else {
				if (!this.gameObject.anims.isPlaying) {
					this.gameObject.anims.play("EWIdle");
				}
			}
		})
	}	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
