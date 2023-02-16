const {
  getSubscribersTrend,
  getSubscribersList,
  addNewSubscribers,
} = require('../../services/user.service');

exports.getSubscribersTrend = async function (req, res, next) {
  try {
    const { user_id: userId } = req.params;
    const subscribersTrend = await getSubscribersTrend(userId);

    res.json(subscribersTrend);
  } catch (error) {
    next(error);
  }
};

exports.getSubscribersList = async function (req, res, next) {
  try {
    const subscribers = await getSubscribersList(req.params.user_id);

    res.json({
      subscribers,
    });
  } catch (error) {
    next(error);
  }
};

exports.addNewSubscribers = async function (req, res, next) {
  try {
    await addNewSubscribers(req.params.user_id, req.body.subscribers);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
