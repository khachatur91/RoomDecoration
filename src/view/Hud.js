import Phaser from 'phaser'
import ScrollableArea from '../lib/phaser-scrollable'
import ScrollItem from '../view/ScrollItem'

export default class Hud extends Phaser.Group {
  constructor (game, data) {
    super(game)

    this.itemsData = data
    this.init()
  }

  init () {
    this.scroller = this.add(new ScrollableArea(1400, 50, 300, 1000))
    this.categoryItems = this.itemsData.categories[0].items
    let lastY = 0
    for (var i = 0; i < this.categoryItems.length; i++) {
      console.log(this.categoryItems[i])
      var item = new ScrollItem(this.game, this.categoryItems[i])
      item.y = lastY
      item.x = 100
      lastY += 180

      this.scroller.addChild(item)
    }
    this.scroller.start()
  }
}
