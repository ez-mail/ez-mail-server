const userService = require('../../services/user.service');

exports.getLastSentEmailTemplate = async function (req, res, next) {
  try {
    const { user_id: userId } = req.params;

    const lastSentEmailTemplate = await userService.getLastSentEmailTemplate(
      userId,
      next,
    );

    res.json(lastSentEmailTemplate);
  } catch (error) {
    next(error);
  }
};

exports.getSubscribersTrend = async function (req, res, next) {
  try {
    const { user_id: userId } = req.params;

    const subscribersTrend = await userService.getSubscribersTrend(
      userId,
      next,
    );

    res.json(subscribersTrend);
  } catch (error) {
    next(error);
  }
};
