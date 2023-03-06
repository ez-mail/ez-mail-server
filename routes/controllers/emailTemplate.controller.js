const {
  getLastSentEmailTemplate,
  createNewEmailTemplate,
  getEmailTemplate,
  getEmailTemplates,
  updateEmailTemplate,
  deleteEmailTemplate,
} = require('../../services/emailTemplate.service');
const {
  getUserName,
  addEmailIdToUser,
  findUserByUserId,
  updateEmailIdToUser,
} = require('../../services/user.service');
const { sendMail } = require('../../nodeMailer');

exports.getEmailTemplates = async function (req, res, next) {
  try {
    const targetUser = await findUserByUserId(req.params.user_id);

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

exports.deleteEmailTemplate = async function (req, res, next) {
  try {
    await deleteEmailTemplate(req.params.email_template_id);

    await updateEmailIdToUser(req.params.user_id, req.params.email_template_id);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.sendEmailTemplate = async function (req, res, next) {
  try {
    const { emailTitle, emailContent, sender, recipients } =
      await getEmailTemplate(req.params.email_template_id);

    const { email } = await findUserByUserId(req.params.user_id);
    const userName = email.split('@')[0];

    const recipientsAddress = recipients.map(recipient => recipient.email);

    const result = await sendMail({
      emailTitle,
      emailContent,
      sender,
      recipientsAddress,
      userName,
    });

    const sendInfo = {
      totalSendCount: recipientsAddress.length,
      successSendCount: result.accepted.length,
    };

    await updateEmailTemplate(req.params.email_template_id, sendInfo);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
