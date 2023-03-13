const {
  getUserSendingInfo,
  updateUserSendingInfo,
  findUserByUserId,
  addUserOrigin,
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

exports.getUserOrigin = async function (req, res, next) {
  try {
    const { origin } = await findUserByUserId(req.params.user_id);

    res.json(origin);
  } catch (error) {
    next(error);
  }
};

exports.addUserOrigin = async function (req, res, next) {
  try {
    await addUserOrigin(req.params.user_id, req.body.origin);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
