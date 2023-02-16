const {
  getUserSendingInfo,
  updateUserSendingInfo,
} = require('../../services/user.service');

exports.getUserSendingInfo = async function (req, res, next) {
  try {
    const userSendingInfo = await getUserSendingInfo(req.params.user_id);

    res.json(userSendingInfo);
  } catch (error) {
    next(error);
  }
};

exports.updateUserSendingInfo = async function (req, res, next) {
  try {
    await updateUserSendingInfo(req.params.user_id, req.body);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
