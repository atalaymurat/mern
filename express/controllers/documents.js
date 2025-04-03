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
        console.log('CREATE DOC *** : ', data)
        const document = new Document(data)
        await document.save()

        res.status(200).json({ message: 'success', doc: document })
    },
    show: async (req, res, next) => {
        try {
            console.log('REQUEST SHOW:', req.params)
            const { id } = req.params
            const document = await Document.findById(id).populate('user')
            console.log('Document Find : ', document)

            res.status(200).json({ message: 'success', doc: document })
        } catch (err) {}
    },
}
