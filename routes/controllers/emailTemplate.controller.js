const {
  createNewEmailTemplate,
  getEmailTemplateByEmailId,
  updateEmailTemplate,
} = require('../../services/emailTemplate.service');
const {
  getUserName,
  addEmailIdToUser,
} = require('../../services/user.service');

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
    const emailTemplate = await getEmailTemplateByEmailId(
      req.params.email_template_id,
    );

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
