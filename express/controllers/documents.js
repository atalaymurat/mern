const { Document, DocumentVersion } = require("../models/document");
const {
  generateDocCode,
  calculateLineItemsAndTotals,
  updateDocCodeVersion,
} = require("./helpers/documentUtils");

module.exports = {
  index: async (req, res, next) => {
    const documents = await Document.aggregate([
      {
        $lookup: {
          from: "documentversions",
          localField: "versions",
          foreignField: "_id",
          as: "versions",
        },
      },
      {
        $addFields: {
          latestVersion: {
            $arrayElemAt: [
              {
                $slice: [{ $reverseArray: "$versions" }, 1],
              },
              0,
            ],
          },
        },
      },
      {
        $sort: {
          "latestVersion.docDate": -1,
        },
      },
    ]);

    await Document.populate(documents, { path: "user", select: "displayName" });

    res.status(200).json({ message: "success", doc: documents });
  },
  create: async (req, res, next) => {
    try {
      let data = req.body;

      // docCode oluştur
      const docCode = await generateDocCode(Document, 1);

      // Ana Document oluştur
      const newDoc = new Document({
        docCode,
        docType: data.docType,
        user: data.user,
        company: data.company, // frontend gönderiyorsa yoksa default olur
        version: 1,
        versions: [],
      });
      await newDoc.save();

      // Hesaplamaları yap
      const versionData = calculateLineItemsAndTotals({
        ...data,
        document: newDoc._id,
        version: 1,
      });

      // İlk versiyonu oluştur
      const newVersion = new DocumentVersion(versionData);
      await newVersion.save();

      // Versiyon referansını Document içine yaz
      newDoc.versions.push(newVersion._id);
      await newDoc.save();

      res.status(200).json({
        message: "Document Created",
        doc: newDoc,
        version: newVersion,
      });
    } catch (error) {
      res.status(400).json({ message: "error", error: error.message });
    }
  },

  show: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("REQUEST SHOW:", id);

      const document = await Document.findById(id)
        .populate("user", "displayName") // sadece gerekli alanlar
        .populate({
          path: "versions",
          options: { sort: { createdAt: 1 } }, // versiyonları eski → yeni sırala
        });

      if (!document) {
        return res
          .status(404)
          .json({ message: "Document not found", success: false });
      }

      res.status(200).json({ message: "Document Found", doc: document });
    } catch (err) {
      console.error("SHOW ERROR:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      let data = req.body;
      console.log("DATA FROM FORM", data);

      const document = await Document.findById(id);
      if (!document) {
        return res
          .status(404)
          .json({ message: "Document not found", success: false });
      }

      const newVersionNumber = (document.version || 1) + 1;
      const newDocCode = updateDocCodeVersion(
        document.docCode,
        newVersionNumber
      );
      data = calculateLineItemsAndTotals(data);

      const { _id, createdAt, updatedAt, __v, ...cleanedData } = data;

      if (cleanedData.lineItems && Array.isArray(cleanedData.lineItems)) {
        cleanedData.lineItems = cleanedData.lineItems.map(
          ({ _id, ...item }) => item
        );
      }

      const versionData = {
        ...cleanedData,
        document: document._id,
        version: newVersionNumber,
        docDate: new Date(),
      };

      const newVersion = new DocumentVersion(versionData);
      await newVersion.save();

      document.versions.push(newVersion._id);
      document.version = newVersionNumber;
      document.docCode = newDocCode;
      await document.save();

      res.status(200).json({
        message: "Document updated with new version",
        doc: document,
        newVersion,
        success: true,
      });
    } catch (err) {
      console.error("Update error:", err);
      res.status(400).json({ message: "Update failed", error: err });
    }
  },
  destroy: async (req, res, next) => {
    try {
      const id = req.params.id;
      const doc = await Document.findById(id);
      if (!doc) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Remove hook tetiklenir
      await doc.deleteOne();

      res.status(200).json({ message: "success", doc });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(400).json({ message: "error", error: err.message || err });
    }
  },
};
