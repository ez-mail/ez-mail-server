const {
  getSubscribersTrend,
  getSubscribersList,
  addNewSubscribers,
  deleteSubscribers,
} = require('../../services/user.service');

exports.getSubscribersTrend = async function (req, res, next) {
  try {
    const subscribersTrend = await getSubscribersTrend(req.params.user_id);

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

exports.deleteAndGetSubscribers = async function (req, res, next) {
  try {
    await deleteSubscribers(req.params.user_id, req.body.subscribers);

    const subscribers = await getSubscribersList(req.params.user_id);

    res.json({
      subscribers,
    });
  } catch (error) {
    next(error);
  }
};
