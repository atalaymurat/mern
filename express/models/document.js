const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  docCode: String, // dokuman kodu
  docDate: { type: Date, default: Date.now }, // oluşturulduğu zaman
  validDate: Date, // otomatik hesaplanacak
  vd: String,
  vatNo: String,
  email: String,
  phone: String,
  docType: String, // preforma - teklif vb..
  customer: String, // müşteri direk giriş sonra company ile gelecek
  person: String,
  address: String,
  currency: String, // Teklif doviz birimi
  lineItems: [
    {
      position: Number,
      condition: String,
      origin: String,
      gtipNo: String,
      desc: String,
      caption: String,
      quantity: Number,
      price: Number,
      totalPrice: Number,
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  version: { type: Number, default: 1 }, // her yeni kayıtta numara değişecek
  paymentTerms: String, // ödeme şekli
  deliveryDate: String, // teslim zamanı
  deliveryTerms: String, // Teslim yeri ve şekli
  warranty: String, // Garanti
  totalPrice: Number,
  discountPrice: Number,
  netPrice: Number,
  kdvPrice: Number,
  grandTotal: Number,
  kdv: Number,
  discount: Number,
  showTotals: Boolean,
  isNewSign: Boolean,
  extraLine: String,
});

documentSchema.set("timestamps", true);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
