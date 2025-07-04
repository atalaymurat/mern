const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentVersionSchema = new Schema(
  {
    document: { type: Schema.Types.ObjectId, ref: "Document", required: true }, // Hangi Document'a ait
    version: { type: Number, required: true }, // Versiyon numarası
    docDate: { type: Date, default: Date.now },
    validDate: Date,
    vd: String,
    vatNo: String,
    email: String,
    phone: String,
    customer: String,
    person: String,
    address: String,
    currency: String,
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
    paymentTerms: String,
    deliveryDate: String,
    deliveryTerms: String,
    warranty: String,
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
  },
  {
    timestamps: true,
  }
);

const defaultCompanyId = new mongoose.Types.ObjectId("67a4789d140cf1c1b6340a31");
const documentSchema = new Schema(
  {
    docCode: { type: String, required: true, unique: true }, // Belge kodu, anahtar
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    docType: String,
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      default: defaultCompanyId, // Burada default ObjectId atanıyor
    },
    version: { type: Number, default: 1 }, // Güncel versiyon numarası
    versions: [{ type: Schema.Types.ObjectId, ref: "DocumentVersion" }], // Versiyonlar referansı
  },
  {
    timestamps: true,
  }
);

documentSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  try {
    await DocumentVersion.deleteMany({ document: this._id });
    next();
  } catch(err) {
    next(err);
  }
});

const Document = mongoose.model("Document", documentSchema);
const DocumentVersion = mongoose.model(
  "DocumentVersion",
  documentVersionSchema
);

module.exports = { Document, DocumentVersion };
