const {
  getLastSentEmailTemplate,
  createNewEmailTemplate,
  getEmailTemplate,
  getEmailTemplates,
  updateEmailTemplate,
} = require('../../services/emailTemplate.service');
const {
  getUserName,
  addEmailIdToUser,
  getTargetUser,
} = require('../../services/user.service');

exports.getEmailTemplates = async function (req, res, next) {
  try {
    const targetUser = await getTargetUser(req.params.user_id);

    if (req.query.send_date === 'last' && req.query.count === '1') {
      const lastSentEmailTemplate = await getLastSentEmailTemplate(targetUser);

      return res.json(lastSentEmailTemplate);
    }

    const emailTemplates = await getEmailTemplates(targetUser);

    res.json(emailTemplates);
  } catch (error) {
    next(error);
  }
};

exports.createNewEmailTemplate = async function (req, res, next) {
  try {
    const userName = await getUserName(req.params.user_id);
    const newEmailTemplate = await createNewEmailTemplate(userName);
    await addEmailIdToUser(req.params.user_id, newEmailTemplate._id);

    res.status(201).json({
      emailTemplateId: String(newEmailTemplate._id),
    });
  } catch (err) {
    next(err);
  }
};

exports.getEditingOrCompleteEmailTemplate = async function (req, res, next) {
  try {
    const emailTemplate = await getEmailTemplate(req.params.email_template_id);

    res.json(emailTemplate);
  } catch (err) {
    next(err);
  }
};

exports.editEmailTemplate = async function (req, res, next) {
  try {
    await updateEmailTemplate(req.params.email_template_id, req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
