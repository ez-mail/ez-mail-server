const userService = require('../../services/user.service');

exports.getEmailTemplates = async function (req, res, next) {
  try {
    const { user_id: userId } = req.params;

    if (req.query?.send_date === 'last') {
      const lastSentEmailTemplate = await userService.getLastSentEmailTemplate(
        userId,
        next,
      );

      res.json(lastSentEmailTemplate);
    } else {
      const emailTemplates = await userService.getEmailTemplates(userId, next);

      res.json(emailTemplates);
    }
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

exports.getSubscribersList = async function (req, res, next) {
  try {
    const subscribers = await userService.getSubscribersListByUserId(
      req.params.user_id,
    );

    res.json({
      subscribers,
    });
  } catch (error) {
    next(error);
  }
};

exports.addNewSubscribers = async function (req, res, next) {
  try {
    await userService.addNewSubscribersByUserId(
      req.params.user_id,
      req.body.subscribers,
    );

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
