import Phaser from 'phaser'
import PhaserNineSlice from '../lib/phaser-nineslice'

export default class ScrollItem extends Phaser.Group {
  constructor (game, itemData) {
    super(game)
    this.itemData = itemData
    this.init()
  }

  init () {
      this.panel = new PhaserNineSlice.NineSlice(
          this.game,           // Phaser.Game
          this.game.width / 2,            // x position
          this.game.height / 2,            // y position
          'ui',      // atlas key
          'popupBg', // Image frame
          200,            // expected width
          200,            // expected height
          { // And this is the framedata, normally this is passed when preloading. Check README for details
              top: 20,    // Amount of pixels for top
              bottom: 20, // Amount of pixels for bottom
              left: 20,   // Amount of pixels for left
              right: 20   // Amount of pixels for right
          }
      )
  }
}
