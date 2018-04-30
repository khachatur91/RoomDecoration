import Phaser from 'phaser'

import AudioManager from '../AudioManager'
import Hud from '../view/Hud'
import RestartPopup from '../view/RestartPopup'

export default class GameState extends Phaser.State {
  static STATE_IN_GAME = 0
  static STATE_LEVEL_COMPLETE = 1
  static STATE_PAUSED = 2
  static STATE_INIT = 3

  init () {
      this.game.stage.disableVisibilityChange = true
      // default settings
      this.settings = {
          enableVoice: true,
          enableLabel: true,
          enablePinyin: false
      }

      this.stage.backgroundColor = '#9df6e4'

      this.locale = this.game.cache.getJSON('locale')

      this.audioManager = AudioManager.instance

      this.gameContainer = this.game.add.group()
      this.hud = new Hud(this.game, this.items)

      this.createBackground()

      this.gameState = GameState.STATE_INIT
  }

  screenshot (addLabel) {
    if (!this.settings.enableVoice) {
      this.gameState = GameState.STATE_PAUSED
    }
    this.audioManager.play('photo')
    const pos = this.game.input.activePointer.position

    const tweenPalaroid = this.game.add.tween(this.palaroidFrame)
    tweenPalaroid.to({rotation: (Math.random() - 0.5) * Math.PI / 6 + Math.PI * 6, x: this.game.width / 2, y: this.game.height / 2}, 700, Phaser.Easing.Quadratic.In, true, 300)
    tweenPalaroid.onStart.add(() => {
      this.palaroidFrame.visible = true
      this.palaroidFrame.scale.set(0.2, 0.2)
      const tween = this.game.add.tween(this.palaroidFrame.scale)
      tween.to({x: 1, y: 1}, 700)
      tween.start()
    })
    tweenPalaroid.start()

    tweenPalaroid.onComplete.add(() => {
      setTimeout(() => {
        this.palaroidFrame.visible = false
        this.palaroidFrame.rotation = 0
        this.palaroidFrame.position.set(0, 0)
        this.createPhotoFrame()
        if (!this.settings.enableVoice) {
          this.gameState = GameState.STATE_IN_GAME
        }
      }, 2000)
    })

    window.requestAnimationFrame(() => {
      let x = Math.min(Math.max(0, pos.x - 256), this.game.width - 512)
      let y = Math.min(Math.max(0, pos.y - 256), this.game.height - 512)

      const data = this.game.context.getImageData(x, y, 512, 512)

      this.palaroidBitmapData.ctx.putImageData(data, 0, 0)

      const pic = this.game.add.image(0, -50, this.palaroidBitmapData.texture)
      pic.anchor.set(0.5, 0.5)
      this.palaroidFrame.addChild(pic)
      if (addLabel) {
        const key = this.animalsList[this.currentAnimalIndex].key
        const animalName = this.game.add.text(0, this.palaroidFrame.height / 2.5, ' ' + this.animalsLocale[key].name.toUpperCase() + ' ')
        animalName.font = 'Luckiest Guy'
        animalName.fontSize = 60
        // animalName.setShadow(-2, 2, 'rgba(0,0,0,0.5)', 4)
        animalName.fill = '#d8ab25'
        animalName.stroke = '#000000'
        animalName.strokeThickness = 4
        animalName.anchor.set(0.5, 0.5)
        this.palaroidFrame.addChild(animalName)
      }

      const flashTween = this.game.add.tween(this.flash)
      flashTween.to({alpha: 1}, 100)
        .to({alpha: 0}, 100)
      flashTween.start()
    })
  }

  playSound (key, callback) {
    if (this.settings.enableVoice) {
      this.currentSound = this.audioManager.play(key)
      this.currentSound.onStop.addOnce(callback, this)
    }
  }

  createBackground () {
    this.gameContainer.create(0, 0, 'amusementPark1', 'Background', true)
  }
}
