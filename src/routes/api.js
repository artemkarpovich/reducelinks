import express from 'express';
import jwt from 'jsonwebtoken';
import Link from '../models/link';
import User from '../models/user';
import config from '../config';
import { getUniqueShortLink } from '../library/lib';

const router = express.Router();
const app = express();

app.set('superSecret', config.secret);

router.post('/users', function(req, res) {
  User.create({ name: req.body.name, password: req.body.password }, function(err, user) {
    if(err) {
      console.log(err);
    } else {
      res.send(user);
    }
  });
});

router.get('/users', function(req, res) {
  User.find({}, function(err, user) {
    if(err) {
      console.log(err);
    } else {
      res.send(user);
    }
  });
});

router.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign({name: user.name}, app.get('superSecret'), {
          expiresIn: '1d'
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

router.use(function(req, res, next) {
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

router.get('/', function(req, res) {
  res.send('Hello world');
});

router.get('/links', function(req, res) {
  User.findOne({ name: req.decoded.name })
    .populate('links')
    .exec(function (err, user) {
      if (err) return res.send(err);
      res.json(user.links);
    });
});

router.post('/links', function(req, res) {
  User.findOne({ name: req.decoded.name }).populate('links').exec(function(err, user) {
    var link = new Link({
      initialLink: req.body.initialLink,
      shortLink: getUniqueShortLink()
    });

    user.links.push(link);

    user.save(function (err) {
      if (err) return res.send(err);

      link.save(function (err) {
        if (err) return res.send(err);

        res.json({
          success: true,
          shortLink: link.shortLink
        });
      });
    })
  })
});

export default router;