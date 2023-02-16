const express = require('express');

const {
  getEmailTemplates,
  getSubscribersTrend,
  getSubscribersList,
} = require('./controllers/user.controller');
const {
  createNewEmailTemplate,
  getEditingOrCompleteEmailTemplate,
} = require('./controllers/emailTemplate.controller');

const router = express.Router();

router.get(
  '/:user_id/email-templates/:email_template_id',
  getEditingOrCompleteEmailTemplate,
);

router.get('/:user_id/email-templates', getEmailTemplates);

router.post('/:user_id/email-templates', createNewEmailTemplate);

router.get('/:user_id/subscribers/trend', getSubscribersTrend);

router.get('/:user_id/subscribers', getSubscribersList);

module.exports = router;
