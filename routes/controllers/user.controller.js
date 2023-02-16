const { getUserSendingInfo } = require('../../services/user.service');

exports.getUserSendingInfo = async function (req, res, next) {
  try {
    const userSendingInfo = await getUserSendingInfo(req.params.user_id);

    res.json(userSendingInfo);
  } catch (error) {
    next(error);
  }
};
