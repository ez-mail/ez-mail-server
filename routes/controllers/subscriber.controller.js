const {
  getSubscribersTrend,
  getSubscribersList,
  addNewSubscribers,
  deleteSubscribers,
  addValidExternalSubscriber,
  getUserOriginByAccessToken,
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

exports.addValidExternalSubscriber = async function (req, res, next) {
  try {
    const whiteOrigin = await getUserOriginByAccessToken(
      req.params.access_token,
    );

    if (whiteOrigin !== req.headers.origin) {
      return res.sendStatus(400);
    }

    const result = await addValidExternalSubscriber(
      req.params.access_token,
      req.body.subscriber,
    );

    res.setHeader('Access-Control-Allow-Origin', whiteOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    if (result) {
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteSubscribers = async function (req, res, next) {
  try {
    await deleteSubscribers(req.params.user_id, req.body.subscribers);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
