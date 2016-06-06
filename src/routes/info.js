import express from 'express';
import Link from '../models/link';

const infoRouter = express.Router();

infoRouter.get('/', function (req, res) {
  Link.find({}, function (err, links) {
    if (err) res.send(err);

    if (links) {
      res.send(links);
    } else {
      res.send({
        success: false,
        message: 'No links'
      });
    }
  })
});

infoRouter.get('/:short_link', function (req, res) {
  Link.find({ shortLink: req.params.short_link }, function (err, link) {
    if (err) res.send(err);

    if (link) {
      res.send(link);
    } else {
      res.send({
        success: false,
        message: 'No info by link'
      })
    }
  });
});

export default infoRouter;
