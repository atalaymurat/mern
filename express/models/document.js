const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    version: { type: Number, default: 1 }, // her yeni kayıtta numara değişecek
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


// Add pre-save hook to generate docCode
documentSchema.pre('save', async function(next) {
  if (!this.isNew) return next(); // Only run for new documents
  
  try {
    const year = new Date().getFullYear();
    
    // Get the count of documents this year to generate sequence number
    const count = await Document.countDocuments({
      docCode: new RegExp(`^${year}-\\d{3}-\\d{2}$`)
    });
    
    const sequence = String(count + 1).padStart(3, '0');
    const version = String(this.version || 1).padStart(2, '0');
    
    this.docCode = `${year}-${sequence}-${version}`;
    
    next();
  } catch (err) {
    next(err);
  }
});



documentSchema.pre('save', function (next) {
    console.log('DOC MODEL PRE SAVE', this)
    if (this.lineItems.length > 0) {
        this.lineItems.forEach((item) => {
            item.totalPrice = item.price * item.quantity
        })
    }

    // Calculate document totals
    const subtotal = this.lineItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
    )
    this.totalPrice = subtotal
    this.discountPrice = (subtotal * (this.discount || 0)) / 100
    this.netPrice = subtotal - this.discountPrice
    this.kdvPrice = (this.netPrice * (this.kdv || 0)) / 100
    this.grandTotal = this.netPrice + this.kdvPrice

    if (this.docDate && !this.validDate) {
    this.validDate = new Date(this.docDate);
    this.validDate.setDate(this.validDate.getDate() + 30);
  }


    next()
})

const Document = mongoose.model('Document', documentSchema)

module.exports = Document
