import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        name: "UI/UX Design",
        price: "Rp 350.000",
        image: "/resources/assets/ui.png",
        rating: 4,
      },
      {
        name: "Mobile Application",
        price: "Rp 499.000",
        image: "/resources/assets/app.png",
        rating: 5,
      },
      {
        name: "Development",
        price: "Rp 720.000",
        image: "/resources/assets/develo.png",
        rating: 5,
      },
      {
        name: "Video Editing",
        price: "Rp 230.000",
        image: "/resources/assets/video_edit_card.jpg",
        rating: 4,
      },
    ])
  }
}
