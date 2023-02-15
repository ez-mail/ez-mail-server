const {
  createNewEmailTemplate,
  getEmailTemplateByEmailId,
} = require('../../services/emailTemplate.service');
const { getUserName } = require('../../services/user.service');

exports.createNewEmailTemplate = async function (req, res, next) {
  try {
    const userName = await getUserName(req.params.user_id);
    const newEmailTemplate = await createNewEmailTemplate(userName);

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
