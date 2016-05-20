import express from 'express';
import Link from '../models/link';

const router = express.Router();

router.get('/', function(req, res) {
  res.send('Hello world');
});

router.post('/links', function(req, res) {
  Link.create({initialLink: req.body.initialLink}, function(err, link) {
    if(err) {
      console.log(err);
    } else {
      res.send(link);
    }
  });
});

router.get('/links', function(req, res) {
  Link.find({}, function(err, links) {
    if(err) {
      console.log(err);
    } else {
      res.send(links);
    }
  });
});

export default router;