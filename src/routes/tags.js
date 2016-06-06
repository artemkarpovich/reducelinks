import express from 'express';
import Link from '../models/link';

const tagsRouter = express.Router();

tagsRouter.get('/tags/:tagName', function (req, res) {
  const tagName = req.params.tagName;
  Link.find({ tags: { $all: [tagName] }}, function (err, links) {
    if (err) return res.send(err);

    res.send(links);
  })
});

export default tagsRouter
