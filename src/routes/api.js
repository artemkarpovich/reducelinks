import express from 'express';
import jwt from 'jsonwebtoken';
import Link from '../models/link';
import User from '../models/user';
import config from '../config';
import { getUniqueShortLink, parseTags } from '../library/lib';

const apiRouter = express.Router();
const app = express();

app.set('superSecret', config.secret);

apiRouter.post('/users', function(req, res) {
  User.create({name: req.body.name, password: req.body.password}, function(err, user) {
    if(err){
      console.log(err);
    } else {
      var token = jwt.sign({ name: user.name }, app.get('superSecret'), {
        expiresIn: '1d'
      });
      res.status(201).send({ name: user.name, token });
    }
  });
});

apiRouter.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(400).send({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.status(400).send({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign({name: user.name}, app.get('superSecret'), {
          expiresIn: '1d'
        });

        res.status(200).send({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          name: user.name,
        });
      }
    }
  });
});

apiRouter.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

apiRouter.get('/users', function(req, res) {
  User.find({}, function(err, user) {
    if(err) {
      console.log(err);
    } else {
      res.send(user);
    }
  });
});

apiRouter.get('/links', function(req, res) {
  User.findOne({ name: req.decoded.name })
    .populate('links')
    .exec(function (err, user) {
      if (err) return res.send(err);
      res.json(user.links);
    });
});

apiRouter.post('/links', function(req, res) {
  User.findOne({ name: req.decoded.name }).populate('links').exec(function(err, user) {
    const tags = req.body.tags ? parseTags(req.body.tags) : [];
    var link = new Link({
      initialLink: req.body.initialLink,
      shortLink: getUniqueShortLink(),
      tags: tags,
      description: req.body.description,
      author: req.decoded.name,
    });

    user.links.push(link);

    user.save(function (err) {
      if (err) return res.send(err);

      link.save(function (err) {
        if (err) return res.send(err);

        res.status(200).json({
          success: true,
          shortLink: link.shortLink,
          link: link,
        });
      });
    })
  })
});

export default apiRouter;