const Document = require('../models/document')

module.exports = {
    index: async (req, res, next) => {
        const documents = await Document.find()
        res.status(200).json({message: "success", doc: documents})
    },

    create: async (req, res, next) => {
        const data = req.body
        const document = new Document(data)
        await document.save()


        console.log('NEW DOCUMENT : ', document)
        res.status(200).json({ message: 'success', doc: document })
    },
}
