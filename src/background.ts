import "phaser";

export function renderDusk(graphics: Phaser.GameObjects.Graphics) {
  graphics.fillGradientStyle(0x0093ff, 0x0093ff, 0xff938f, 0xff938f, 1);
  graphics.fillRect(0, 0, 1200, 720);
}
