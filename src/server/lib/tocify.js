import fs from 'fs';
import slugify from 'slug';
import marked from 'marked';
import mdExtract from 'markdown-extract';
import path from 'path';
import { normalize } from 'path';
import toc from '../../toc.js'
import markdownIt from './md';
import tocifyPage from './tocifyPage.js';

function stripMarkdown (original) {
  let text = original

  do {
    text = text
      // code
      .replace(/`([^`]+)`/g, '$1')
      // bold/italic
      .replace(/\*\*([^\*]+)\*\*/g, '$1')
      .replace(/\*([^\*]+)\*/g, '$1')
      .replace(/\*([^\*]+)\*/g, '$1')
      .replace(/(?:^|\s)([\(\[]?)_([^`]*)_([\)\]]?[\.\!\?]?)(?:$|\s)/g, '$1$2$3')
      // links and images
      .replace(/!?\[([^\]]*)\]\([^\)]*\)/g, '$1')
      .replace(/!?\[([^\]]*)\]\[[^\)]*\]/g, '$1')
      // html
      .replace(/<[^>]*>/g, '')
    if (text === original) break
    original = text
  } while (true)

  text = text
    .replace(/!?\[([^\]]*)\]/g, '$1')

  return text
}

function tocify (md, req = {}) {
  var tokens = marked.lexer(md)

  var re = { sections: [] }
  var crumbs = [scope]
  var current = re
  var scope
  var i = 0

  tokens.forEach((token) => {
    switch (token.type) {
      case 'list_start':
        scope = current.sections = []
        crumbs.push(scope)
        break

      case 'text':
        current = itemify(token.text, i++, req)
        scope.push(current)
        break

      case 'list_end':
        crumbs.pop()
        scope = crumbs[crumbs.length - 1]
        break
    }
  })

  return re
}

/**
 * Internal: turns a token text (like `[README](../README.md)`) into an item in
 * the table of contents. Used by `tocify()`.
 *
 * Sets:
 *
 * - `title`
 * - `source`
 */

function itemify (text, i, req = {}) {
  const current = {
    title: '',
    source: '',
    slug: '',
    preview: false,
    finished: false,
    url: '',
    content: ''
  }

  // Parse things
  let m, title, source
  if (m = text.match(/^\[([^\]]*)\]\((.*)\)$/)) {
    title = stripMarkdown(m[1])
    source = m[2]
  } else if (m = text.match(/^(?:__|\*\*)\[([^\]]*)\]\((.*)\)(?:__|\*\*)$/)) {
    title = stripMarkdown(m[1])
    source = m[2]
    current.expand = true
  } else {
    title = stripMarkdown(text)
  }

  let url

  if (source) {
    if (m = source.match(/^([^#]*)(#.*)$/)) {
      source = m[1]
      current.anchor = m[2]
    }
    if (source.substr(0, 1) !== '/') source = normalize(source)
    source = source.replace(/^\//, '')

    if (i === 0) {
      url = 'index.html'
    } else {
      let withOutMd = source.replace(/\.md$/, '');
      url = withOutMd.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
  }

  current.title = title
  if (source) current.source = source

  // Add slug
  if (url) {
    current.url = url;
    current.slug = slugify(title).toLowerCase();

    if(toc.finished[current.slug]) {
      current.finished = true;
    }

    let content = '';

    try {
      content = fs.readFileSync('./src/book/' + current.source, { encoding: 'utf-8'});
    } catch(err) {
      current.finished = false;
    }

    if(toc.authenticatedOnly[current.slug]) {
      if (!req.user) {
        current.preview = true;
        current.content = markdownIt.render(mdExtract({type: /paragraph/, text: content, depth: 1}).join('\n'))
      }
    }

    if(!current.content) {
      current.content = markdownIt.render(content);
    }
  }


  // Add headings
  if (source) {
    fs.readFile(path.join(__dirname, '../', source), "utf-8", function(err, data) {
      if(!err) {
        const headings = tocifyPage(data);
        if (headings) current.headings = headings
      }
    });
  }

  return current
}

module.exports = tocify;
