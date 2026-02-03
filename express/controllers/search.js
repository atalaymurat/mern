const { Document } = require("../models/document");

module.exports = {
  documents: async (req, res, next) => {
    try {
      const { q = "" } = req.query;
      const hasSearch = q && q.trim().length > 1;

      const escapeRegex = (text) =>
        text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const regex = hasSearch
        ? new RegExp(escapeRegex(q), "i")
        : null;

      const pipeline = [
        // 🔹 versions lookup (index ile AYNI)
        {
          $lookup: {
            from: "documentversions",
            localField: "versions",
            foreignField: "_id",
            as: "versions",
          },
        },

        // 🔹 latestVersion hesapla (index ile AYNI)
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

        // 🔍 SADECE BURASI SEARCH
        ...(hasSearch
          ? [
              {
                $match: {
                  $or: [
                    { docCode: regex },
                    { docType: regex },
                    { "latestVersion.customer": regex }, // ✅ doğru alan
                    { "latestVersion.address": regex },
                  ],
                },
              },
            ]
          : []),

        // 🔹 sıralama (index ile AYNI)
        {
          $sort: {
            "latestVersion.docDate": -1,
          },
        },
      ];

      const documents = await Document.aggregate(pipeline);

      // 🔹 user populate (index ile AYNI)
      await Document.populate(documents, {
        path: "user",
        select: "displayName",
      });

      res.status(200).json({
        message: "success",
        doc: documents,
      });
    } catch (err) {
      next(err);
    }
  },
};
