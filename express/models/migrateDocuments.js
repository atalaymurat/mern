const mongoose = require("mongoose");
const { Document, DocumentVersion } = require("./document"); // Yeni modeller
const defaultCompanyId = new mongoose.Types.ObjectId("67a4789d140cf1c1b6340a31");

async function migrateDocuments() {
  try {
    const oldDocuments = await Document.find({}).lean();

    for (const oldDoc of oldDocuments) {
      // Eğer hali hazırda versiyonlar varsa atla (tekrar çalıştırmayı engellemek için)
      if (oldDoc.versions && oldDoc.versions.length > 0) {
        console.log(`Skipping migrated document ${oldDoc._id}`);
        continue;
      }

      const newDocData = {
        docCode: oldDoc.docCode,
        user: oldDoc.user,
        docType: oldDoc.docType,
        company: oldDoc.company || defaultCompanyId,
        version: 1,
        versions: [],
      };

      const newDoc = new Document(newDocData);
      await newDoc.save();

      const versionData = {
        document: newDoc._id,
        version: 1,
        docDate: oldDoc.docDate,
        validDate: oldDoc.validDate,
        vd: oldDoc.vd,
        vatNo: oldDoc.vatNo,
        email: oldDoc.email,
        phone: oldDoc.phone,
        customer: oldDoc.customer,
        person: oldDoc.person,
        address: oldDoc.address,
        currency: oldDoc.currency,
        lineItems: oldDoc.lineItems,
        paymentTerms: oldDoc.paymentTerms,
        deliveryDate: oldDoc.deliveryDate,
        deliveryTerms: oldDoc.deliveryTerms,
        warranty: oldDoc.warranty,
        totalPrice: oldDoc.totalPrice,
        discountPrice: oldDoc.discountPrice,
        netPrice: oldDoc.netPrice,
        kdvPrice: oldDoc.kdvPrice,
        grandTotal: oldDoc.grandTotal,
        kdv: oldDoc.kdv,
        discount: oldDoc.discount,
        showTotals: oldDoc.showTotals,
        isNewSign: oldDoc.isNewSign,
        extraLine: oldDoc.extraLine,
      };

      const newVersion = new DocumentVersion(versionData);
      await newVersion.save();

      newDoc.versions.push(newVersion._id);
      await newDoc.save();

      console.log(`Migrated document ${oldDoc._id} -> new document ${newDoc._id}`);
    }

    console.log("Migration completed!");
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB bağlandı, migration başlıyor...");
    return migrateDocuments();
  })
  .catch((err) => {
    console.error("DB bağlantı hatası:", err);
  });
