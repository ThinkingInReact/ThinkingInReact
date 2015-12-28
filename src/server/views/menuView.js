// TODO: do this in a perfomant way. it cant be good to load so many things for a menu.

import React from 'react';
import Menu from 'components//Menu';
import { renderToString } from 'react-dom/server';
import cheerio from 'cheerio';

export default function menuView(req, res) {
  let html = renderToString(<Menu isLoggedIn={req.user != undefined} />);
  return html;
}
