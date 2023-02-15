const express = require('express');

const {
  getEmailTemplates,
  getSubscribersTrend,
} = require('./controllers/user.controller');

const router = express.Router();

router.get('/:user_id/email-templates', getEmailTemplates);

router.get('/:user_id/subscribers/trend', getSubscribersTrend);

module.exports = router;
