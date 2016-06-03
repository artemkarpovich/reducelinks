import Link from '../models/link';
import _ from 'lodash';

export function generateShortLink() {
  const chars = '123456789abcdfghjkmnpqrstvwxyzABCDFGHJKLMNPQRSTVWXYZ';
  let shortLink = '';

  for (let i = 0; i < 5; i++) {
    shortLink += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return shortLink;
}

export function getUniqueShortLink() {
  let shortLinks = [];
  
  Link.find({}, function(err, links) {
    if (err) {
      console.log(err)
    } else links.map(link => {
      shortLinks.push(link.shortLink);
    });
  });

  let newShortLink = generateShortLink();

  while (_.indexOf(shortLinks, newShortLink) > 0) {
    newShortLink = generateShortLink();
  }

  return newShortLink;
}