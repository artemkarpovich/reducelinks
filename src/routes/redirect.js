import express from 'express';
import Link from '../models/link';

const redirectRouter = express.Router();

redirectRouter.get('/:short_link', function(req, res) {
  Link.findOne({ shortLink: req.params.short_link }, function (err, link) {
    if (err) {
      console.log(err);
    } else {
      if (link){
        const initialLink = link.initialLink;
        res.redirect(initialLink);
      } else {
        return res.status(400);
      }
    }
  });
});

export default redirectRouter;
