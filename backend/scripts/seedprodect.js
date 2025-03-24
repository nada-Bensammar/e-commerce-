require('dotenv').config();
const mongoose = require('mongoose');
const Product = require(path.join(__dirname, 'models', 'Product'));
const path = require('path');

const products = [
  {
    category: "Cell phones",
    name: "iphone 12 pro max",
    price: "1009$",
    image: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg"
  },
  {
    category: "Laptops",
    name: "DELL XPS 13",
    price: "999$",
    image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9350/media-gallery/graphite/notebook-xps-13-9350-t-oled-gy-gallery-5.psd?fmt=pjpg&pscan=auto&scl=1&wid=3509&hei=2071&qlt=100,1&resMode=sharp2&size=3509,2071&chrss=full&imwidth=5000",
  },
  {
    category: "Desktop computers",
    name: "Desktop computer ",
    price: "600$",
    image: "https://i.pcmag.com/imagery/reviews/02hQ4XTQl2pvwMEPmbc88qk-1..v1730134122.jpg",
  },
  {
    category: "Tablets",
    name: "Amazon Fire 7 ",
    price: "50$",
    image: "https://hotspotelectronics.co.ke/wp-content/uploads/2024/03/Amazon-Fire-7-Tab-black.png "
  },
  {
    category: "Accessories",
    name: "Logitech K270 ",
    price: "30$",
    image: "https://logitech.onlinesalestore.pk/cdn/shop/products/logitech-k270-wireless-keyboard-01-logitech-pakistan.jpg?v=1639228107 "
  },
  {
    category: "Monitors",
    name: "MSI MPG 321URX QD-OLED ",
    price: "950$",
    image: "https://asset.msi.com/resize/image/global/product/product_1703740517dd560f186d6303a9bfd79c9b904dea3a.png62405b38c58fe0f07fcef2367d8a9ba1/600.png "
  }
];


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  
    return Product.insertMany(products);
  })
  .then(() => {
    console.log('Products seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error seeding products:', err);
    process.exit(1);
  });