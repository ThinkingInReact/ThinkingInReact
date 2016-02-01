# Internationalization

Has it ever occurred to you that internationalization is a rather long word? Surely, there is some language where it is shorter? Wouldn't it be nice to not make every user of every language suffer through a word so long that it makes you love autocomplete?

Internationalization in React can seem quite complicated but it is essentially the same as in any other framework. The only difference is that in React we must be a little more explicit about what and where we localize things.

First choose a library, in our case we will choose [i18next](http://i18next.com/), then install it, and simply call it in your views like this:

```js
var Hello = React.createClass({
  render: function() {
    return(
      <div>
        {i18n.t('hello')} {i18n.t('world')}
      </div>
    );
  }
});
```

And you thought this was going to be complicated!
