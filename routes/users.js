const express = require('express');

const { getLastSentEmailTemplate } = require('./controllers/user.controller');

const router = express.Router();

router.get('/:user_id/email-templates', getLastSentEmailTemplate);

module.exports = router;
