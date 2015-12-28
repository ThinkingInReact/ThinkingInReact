# Thinking In React

A book about react

## Building

### HTML

HTML builds are handled using docpress, so first install it:

```sh
$ npm install -g docpress
```

and then:

```sh
$ npm run build:html
```

To boot up a dev server run:

```sh
$ npm run start:dev
```

Currently server.js does not use docpress as middleware, which means docpress and the node server will run simultaneously. Docpress will serve up ebook builds from localhost:3000 and the server will serve up the docpress builds from \_docpress. This isn't ideal, but it works for now.

The express server simply acts as a permissions layer; if a user is logged out it serves up excerpts, login links etc, but if the user is logged in it serves up a logout link, download links etc. This is accomplished by processing the html using cheerio, it is hacky but works.

### Other Formats

To build the other formats first install gitbook-cli and ebook-convert. On OSX that can be done with the following:

```sh
$ brew cask install calibre
$ npm install -g gitbook-cli
```

Then to build run:

```sh
$ npm run build:$format
```

e.g:

```sh
$ npm run build:pdf
```

Gitbook can build pdf, epub and mobi

If you want to build all the formats run:

```sh
$ npm run build
```

## Deployment

The book is meant to be deployed with modulus.io and it is all wrapped up into one command:

```sh
$ npm run deploy
```

This will build the html of the book, a new server and client js, and then finally push it to modulus.io

## Contributing

1. Fork. it
2. Create. a new branch (git checkout -b cat-evolver)
3. Commit. your changes (git commit -am 'Add Cat Evolution')
4. Test. your changes (always be testing) (you can skip this step for content changes, or if there weren't tests to begin with)
5. Push. to the branch (git push origin cat-evolver)
6. Pull. Request. (for extra points include funny gif and or pun in comments)

To remember this you can use the easy to remember and totally not tongue-in-check initialism: _FCCTPP_.

I don't want any of these steps to scare you off. If you don't know how to do something or are struggle getting it to work feel free to create a pull request or issue anyway. I'll be happy to help you get your contributions up to code and into the repo!

## License

Everything in this repo (including the book) is licensed under ISC (basically MIT with less lines). Fork it, quote from it, reuse it, remix etc in any way you like. Just don't claim it as your own. And don't use it to be a jerk towards others.
