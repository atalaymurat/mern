const Document = require("../models/document");
const {
  generateDocCode,
  calculateLineItemsAndTotals, updateDocCodeVersion
} = require("./helpers/documentUtils");

module.exports = {
  index: async (req, res, next) => {
    const documents = await Document.find()
      .populate({
        path: "user",
        select: "displayName",
      })
      .sort({ docDate: -1 });
    res.status(200).json({ message: "success", doc: documents });
  },

  create: async (req, res, next) => {
    let data = req.body;

    data.docCode = await generateDocCode(Document, data.version || 1);
    // lineItems ve toplamları hesapla
    data = calculateLineItemsAndTotals(data);

    const document = new Document(data);
    await document.save();

    res.status(200).json({ message: "Document Created", doc: document });
  },
  show: async (req, res, next) => {
    try {
      console.log("REQUEST SHOW:", req.params);
      const { id } = req.params;
      const document = await Document.findById(id).populate("user");

      res.status(200).json({ message: "Document Found", doc: document });
    } catch (err) {}
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      let data = req.body;

      const document = await Document.findById(id);

      if (!document) {
        return res
          .status(404)
          .json({ message: "Document not found", success: false });
      }
      // Update the document with the new data
      document.set(data);
      document.version = (document.version || 1) + 1;
      document.docCode = updateDocCodeVersion(document.docCode, document.version);

      // Güncellenmiş document objesini plain objeye çevir, işlem için
      let docObj = document.toObject();

      // Hesaplamaları yap (lineItems ve toplamlar)
      docObj = calculateLineItemsAndTotals(docObj);

      // document objesine hesaplanan değerleri set et
      document.lineItems = docObj.lineItems;
      document.totalPrice = docObj.totalPrice;
      document.discountPrice = docObj.discountPrice;
      document.netPrice = docObj.netPrice;
      document.kdvPrice = docObj.kdvPrice;
      document.grandTotal = docObj.grandTotal;
      document.validDate = docObj.validDate;

      await document.save();

      res
        .status(200)
        .json({ message: "Document Updated", doc: document, success: true });
    } catch (err) {
      res.status(400).json({ message: "error", error: err });
    }
  },
  destroy: async (req, res, next) => {
    try {
      let id = req.params.id;
      const doc = await Document.findByIdAndDelete(id);
      res.status(200).json({ message: "success", doc });
    } catch (err) {
      res.status(400).json({ message: "error", error: err });
    }
  },
};
