import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true }, // e.g., AB12345
  name: { type: String,  }, // e.g., Meeranshi Bandhani Printed Cotton Kurta
  rating: { type: Number,  min: 0, max: 5 }, // e.g., 4.3
  reviews: { type: String, }, // e.g., 2.3K
  price: { type: Number, required: true }, // e.g., 599
  mrp: { type: Number, required: true }, // e.g., 1999
  discount: { type: Number, required: true }, // e.g., 70
  inclusiveOfTaxes: { type: Boolean, default: true },
  

  stock: {
    XS: { type: Number, default: 0 },
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
    XXL: { type: Number, default: 0 }
  },

  category: { type: String, default: "Kurta" }, // e.g., Kurta
  color: { type: String, }, // e.g., Green
  print: { type: String,  }, // e.g., Bandhani printed
  neck: { type: String, }, // e.g., Round neck
  pockets: { type: Boolean, }, // e.g., Has 2 pockets -> true
  sleeves: { type: String,  }, // e.g., Sleeveless, regular sleeves
  shape: { type: String, }, // e.g., A-line shape with regular style
  length: { type: String,  }, // e.g., Calf length with flared hem
  material: { type: String,  }, // e.g., Machine weave regular cotton
  fit: { type: String, }, // e.g., The model (height 5'8) is wearing a size S

  // Six image fields as strings
  imageOne: { type: String,  },
  imageTwo: { type: String, },
  imageThree: { type: String, },
  imageFour: { type: String, },
  imageFive: { type: String, },
  imageSix: { type: String, },

  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
