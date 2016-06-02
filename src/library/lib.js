export function shortLink() {
  const chars = '123456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
  let shortLink = '';

  for (let i = 0; i < 5; i++) {
    shortLink += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return shortLink;
};
