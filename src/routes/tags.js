import express from 'express';
import Link from '../models/link';

const tagsRouter = express.Router();

tagsRouter.get('/:tagName', function (req, res) {
  const tag = req.params.tagName;
  Link.find({ tags: tag }, function (err, links) {
    if (err) return res.send(err);

    res.send(links);
  })
});

export default tagsRouter
