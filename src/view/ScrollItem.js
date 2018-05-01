import Phaser from 'phaser'
import PhaserNineSlice from '../lib/phaser-nineslice'

export default class ScrollItem extends Phaser.Group {
  constructor (game, itemData) {
    super(game)
    this.itemData = itemData
    this.initPanel()
    this.initImage()
  }

  initPanel () {
    this.panel = new PhaserNineSlice.NineSlice(
          this.game,           // Phaser.Game
          0,            // x position
          0,            // y position
          'ui',      // atlas key
          'popupBg', // Image frame
          170,            // expected width
          170,            // expected height
      { // And this is the framedata, normally this is passed when preloading. Check README for details
        top: 20,    // Amount of pixels for top
        bottom: 20, // Amount of pixels for bottom
        left: 20,   // Amount of pixels for left
        right: 20   // Amount of pixels for right
      }
      )
    this.add(this.panel)
  }

  initImage () {
    this.image = this.game.add.image(this.width / 2, this.height / 2, this.game.currentScene, this.itemData.image, this)

    this.image.inputEnabled = true
    this.image.events.onInputDown.add(this.onOut, this)

    const targetScale = 130 / Math.max(this.image.width, this.image.height)
    this.image.scale.set(targetScale, targetScale)
    this.image.anchor.set(0.5, 0.5)
  }

  onOut (data) {
    console.log('asd')
  }
}
