const express = require('express');

const {
  getSubscribersTrend,
  addNewSubscribers,
  getSubscribersList,
  deleteSubscribers,
} = require('./controllers/subscriber.controller');
const {
  getEmailTemplates,
  createNewEmailTemplate,
  getEditingOrCompleteEmailTemplate,
  editEmailTemplate,
  deleteEmailTemplate,
  sendEmailTemplate,
} = require('./controllers/emailTemplate.controller');
const {
  getUserSendingInfo,
  updateUserSendingInfo,
  getUserOrigin,
  addUserOrigin,
} = require('./controllers/user.controller');

const router = express.Router();

router.get(
  '/:user_id/email-templates/:email_template_id',
  getEditingOrCompleteEmailTemplate,
);

router.patch('/:user_id/email-templates/:email_template_id', editEmailTemplate);

router.delete(
  '/:user_id/email-templates/:email_template_id',
  deleteEmailTemplate,
);

router.get('/:user_id/email-templates', getEmailTemplates);

router.post('/:user_id/email-templates/:email_template_id', sendEmailTemplate);

router.post('/:user_id/email-templates', createNewEmailTemplate);

router.get('/:user_id/subscribers', getSubscribersList);

router.post('/:user_id/subscribers', addNewSubscribers);

router.delete('/:user_id/subscribers', deleteSubscribers);

router.get('/:user_id/sending-info', getUserSendingInfo);

router.patch('/:user_id/sending-info', updateUserSendingInfo);

router.get('/:user_id/subscribers/trend', getSubscribersTrend);

router.get('/:user_id/origin', getUserOrigin);

router.post('/:user_id/origin', addUserOrigin);

module.exports = router;
