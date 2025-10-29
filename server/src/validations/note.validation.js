const { body } = require('express-validator')
exports.createNoteValidation = [
    body('title').trim().notEmpty().withMessage('Title required').isLength({ max: 100 }),
    body('content').trim().notEmpty().withMessage('Content required').isLength({ max: 1000 })
]