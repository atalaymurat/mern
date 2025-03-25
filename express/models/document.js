const mongoose = require('mongoose')
const Schema = mongoose.Schema

const documentSchema = new Schema({
    docCode: String, // dokuman kodu
    docDate: Date, // oluşturulduğu zaman
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
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    version: Number, // her yeni kayıtta numara değişecek
    paymentTerms: String, // ödeme şekli
    deliveryDate: String, // teslim zamanı
    deliveryTerms: String, // Teslim yeri ve şekli
    warranty: String, // Garanti
    package: String, // Paketleme

    totalPrice: Number,
    discountPrice: Number,
    netPrice: Number,
    kdvPrice: Number,
    grandTotal: Number,
    kdv: Number,
    discount: Number,
})

documentSchema.set('timestamps', true)


documentSchema.pre('save', function(next) {
  console.log("DOC MODEL PRE SAVE", this)
  if (this.lineItems.length > 0) {
    this.lineItems.forEach((item) => {
      item.totalPrice = item.price * item.quantity;
    });
  }

  // Calculate document totals
  const subtotal = this.lineItems.reduce((sum, item) => sum + item.totalPrice, 0);
  this.totalPrice = subtotal;
  this.discountPrice = subtotal * (this.discount || 0) / 100;
  this.netPrice = subtotal - this.discountPrice;
  this.kdvPrice = this.netPrice * (this.kdv || 0) / 100;
  this.grandTotal = this.netPrice + this.kdvPrice;
  next();
});

const Document = mongoose.model('Document', documentSchema)

module.exports = Document
