const Document = require('../models/document')

module.exports = {
    index: async (req, res, next) => {
        const documents = await Document.find()
            .populate({
                path: 'user',
                select: 'displayName',
            })
            .sort({ docDate: -1 })
        res.status(200).json({ message: 'success', doc: documents })
    },

    create: async (req, res, next) => {
        const data = req.body
        const document = new Document(data)
        await document.save()

        res.status(200).json({ message: 'Document Created', doc: document })
    },
    show: async (req, res, next) => {
        try {
            console.log('REQUEST SHOW:', req.params)
            const { id } = req.params
            const document = await Document.findById(id).populate('user')

            res.status(200).json({ message: 'Document Found', doc: document })
        } catch (err) {}
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const data = req.body

            console.log('DATA FROM FORM *** : ', data)

            const document = await Document.findById(id)

            if (!document) {
                return res.status(404).json({ message: 'Document not found', success: false })
            }
            // Update the document with the new data
            document.set(data)
            await document.save()
            
            res.status(200).json({ message: 'Document Updated', doc: document, success: true })
        } catch (err) {
            res.status(400).json({ message: 'error', error: err })
        }
    },
    destroy: async (req, res, next) => {
        try {
            let id = req.params.id
            const doc = await Document.findByIdAndDelete(id)
            res.status(200).json({ message: 'success', doc })
        } catch (err) {
            res.status(400).json({ message: 'error', error: err })
        }
    },
}
