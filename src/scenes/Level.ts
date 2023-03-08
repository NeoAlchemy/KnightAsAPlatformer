
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import HeroKnightPrefab from "./HeroKnightPrefab";
import LowLevelEnemyAI from "../components/LowLevelEnemyAI";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// levelOne
		const levelOne = this.add.tilemap("LevelOne");
		levelOne.addTilesetImage("GrasslandTileset", "GrasslandTileset");

		// AttackKey
		const attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		// JumpKey
		const jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

		// RunRightKey
		const runRightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// levelOne_1
		const levelOne_1 = this.add.tilemap("LevelOne");
		levelOne_1.addTilesetImage("GrasslandTileset", "GrasslandTileset");

		// levelOne_2
		const levelOne_2 = this.add.tilemap("LevelOne");
		levelOne_2.addTilesetImage("GrasslandTileset", "GrasslandTileset");

		// RunLeftKey
		const runLeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// heroKnight
		const heroKnight = new HeroKnightPrefab(this, 100, 400);
		this.add.existing(heroKnight);

		// GroundLevel
		const groundLevel = levelOne_1.createLayer("Ground Level", ["GrasslandTileset"], 0, 536);

		// background_1
		levelOne_2.createLayer("Background", ["GrasslandTileset"], 0, 536);

		// clouds1
		this.add.image(169, 111, "clouds1");

		// clouds2
		this.add.image(502, 190, "clouds2");

		// clouds3
		this.add.image(795, 103, "clouds3");

		// heart
		const heart = this.physics.add.sprite(286, 521, "staticHeart");
		heart.body.setOffset(5, 5);
		heart.body.setSize(15, 15, false);

		// LivesStaticText
		const livesStaticText = this.add.text(15, 20, "", {});
		livesStaticText.text = "Lives Remaining:";

		// livesCountStaticText
		const livesCountStaticText = this.add.text(173, 21, "", {});
		livesCountStaticText.text = "0";

		// EvilWizard
		const evilWizard = this.physics.add.sprite(848, 382, "EvilWizard");
		evilWizard.flipX = true;
		evilWizard.body.velocity.y = 100;
		evilWizard.body.setOffset(75, 75);
		evilWizard.body.setSize(100, 90, false);

		// evilWizard (components)
		const evilWizardLowLevelEnemyAI = new LowLevelEnemyAI(evilWizard);
		evilWizardLowLevelEnemyAI.heroKnight = heroKnight;

		this.heroKnight = heroKnight;
		this.groundLevel = groundLevel;
		this.heart = heart;
		this.livesStaticText = livesStaticText;
		this.livesCountStaticText = livesCountStaticText;
		this.evilWizard = evilWizard;
		this.levelOne = levelOne;
		this.attackKey = attackKey;
		this.jumpKey = jumpKey;
		this.runRightKey = runRightKey;
		this.levelOne_1 = levelOne_1;
		this.levelOne_2 = levelOne_2;
		this.runLeftKey = runLeftKey;

		this.events.emit("scene-awake");
	}

	private heroKnight!: HeroKnightPrefab;
	private groundLevel!: Phaser.Tilemaps.TilemapLayer;
	private heart!: Phaser.Physics.Arcade.Sprite;
	private livesStaticText!: Phaser.GameObjects.Text;
	private livesCountStaticText!: Phaser.GameObjects.Text;
	private evilWizard!: Phaser.Physics.Arcade.Sprite;
	private levelOne!: Phaser.Tilemaps.Tilemap;
	private attackKey!: Phaser.Input.Keyboard.Key;
	private jumpKey!: Phaser.Input.Keyboard.Key;
	private runRightKey!: Phaser.Input.Keyboard.Key;
	private levelOne_1!: Phaser.Tilemaps.Tilemap;
	private levelOne_2!: Phaser.Tilemaps.Tilemap;
	private runLeftKey!: Phaser.Input.Keyboard.Key;

	/* START-USER-CODE */
	// Write your code here
	private facingLeft = false;
	private livesCount = 0;

	create() {

		this.editorCreate();

		this.setupCamera();

		this.setupEvil();		

		this.setupGround();

		this.setupAssets();


	}

	update() {	
		this.checkMovement();

	}

	setupCamera() {
		this.cameras.main.setBounds(0, 0, this.levelOne.widthInPixels, this.levelOne.heightInPixels);
   		// make the camera follow the player
    	this.cameras.main.startFollow(this.heroKnight);
		this.cameras.main.setBackgroundColor('#0a437a'); 
		this.livesStaticText.scrollFactorX = 0;
		this.livesCountStaticText.scrollFactorX = 0;		
	}

	setupEvil() {
		this.evilWizard.depth = 99;
		this.evilWizard.anims.play("EWIdle");
		this.physics.add.existing(this.evilWizard, true)
	}

	setupGround() {
		this.physics.add.collider(this.groundLevel, this.heroKnight)
		this.physics.add.collider(this.groundLevel, this.evilWizard)
		this.groundLevel.setCollisionByExclusion([-1])
	}

	setupAssets() {
		this.heart.anims.play("heart")
		this.physics.add.collider(this.heart, this.heroKnight, (heart, heroKnight) => {
			this.livesCount++
			this.livesCountStaticText.text = String(this.livesCount)
			heart.destroy();
		})
	}

	checkMovement() {
		if (this.attackKey.isDown) {
			if (this.attackKey.ctrlKey) {
				this.heroKnight.anims.play("Attack2");
			} else {
				this.heroKnight.anims.play("Attack1");
			}
			this.heroKnight.anims.stopAfterRepeat(0);
		} else if (this.jumpKey.isDown) {
			if (this.groundLevel.y - 200 < this.heroKnight.y) {
				this.heroKnight.y -= 15
				this.heroKnight.anims.play("Jump");
				this.heroKnight.anims.stopAfterDelay(150);
			}
		} else if (this.runRightKey.isDown) {
			this.heroKnight.x += 2;
			if (this.facingLeft) {
				this.heroKnight.flipX = false;
				this.facingLeft = false;
			}
			this.heroKnight.anims.play("Run", true);
			this.heroKnight.anims.stopAfterDelay(150);
		} else if (this.runLeftKey.isDown) {
			this.heroKnight.x -= 2;
			if (!this.facingLeft) {
				this.heroKnight.flipX = true;
				this.facingLeft = true;
			}
			this.heroKnight.anims.play("Run", true);
			this.heroKnight.anims.stopAfterDelay(150);
		} else if (this.heroKnight.y + 9 < this.groundLevel.y) {  // TODO: MAGIC NUMBER OF 9
			this.heroKnight.anims.play("Fall", true);
			this.heroKnight.anims.stopAfterDelay(50);
		} else {
			if (!this.heroKnight.anims.isPlaying) {
				this.heroKnight.anims.play("Idle");
			}
		}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
