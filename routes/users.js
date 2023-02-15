const express = require('express');

const {
  getLastSentEmailTemplate,
  getSubscribersTrend,
} = require('./controllers/user.controller');

const router = express.Router();

router.get('/:user_id/email-templates', getLastSentEmailTemplate);

router.get('/:user_id/subscribers/trend', getSubscribersTrend);

module.exports = router;
