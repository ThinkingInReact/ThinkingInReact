# Associative Data

Let's say you have some books and those books have authors and those authors have cats. It looks like this:

```js
{
  books: [
    {
      id: "911VCK168",
      title: "The Martin",
      description: "A depressed robot is forgotten about and left on Mars for a million years. He must survive stranded and all alone with only rocks for company",
      authors: [
        {
          id: "UVB-76.1",
          name: "Guy",
          cats: [
            {
              id: "A113",
              name: "Awesomeo",
              size: "too big"
            }
          ]
        }
      ]
    }
  ]
}
```

How do you represent this in a React app's state? The answer is you don't, you normalize this data and flatten it out like this:

```js
books: {"911VCK168": {}},
authors: {"UVB-76.1": {}},
cats: {"A113": {}},
```

And instead of embedding entire objects we embed the IDs like this:

```js
"UVB-76.1": {
  name: "Mysterious Russian Fellow",
  cats: ["A111"]
}
```

The hard part is wrapping your head around how this works in views. It is actually pretty simple. We just need to make sure entire app state should be accessible from every view so when we need to retrieve an association we simply look it up by ID. For example, let's  say have an author and this author has an associated cat, and we need to look up the cat for that author, we can simply do:

```js
var Author = React.createClass({
  render: function() {
    var catRows = [];

    this.props.author.cats.map((catId) => {
      catRows.push(<Cat {...this.props} cat={this.props.cats[catId]} />);
    });

    return(
      {catRows}
    );
  }
})
```

> **TIP**: Under most circumstances you can get away with passing the whole app state around with no performance issues. Don't prematurely optimize, it just makes your code more complicated and harder to change.

The advantage of passing all the app state as props is the components stay nice and dumb, the disadvantage is that you need to implement shouldComponentUpdate in your components if you don't want the diff engine checking things every time any part of the app state changes.

For example:

```js
shouldComponentUpdate: function(nextProps, nextState) {
  return nextProps.author.id !== this.props.author.id;
}
```

> **TIP**: If you are planning on using redux for your React projects then the standard redux libraries actually handle this check for you. Just use redux-connect and your life will be dramatically simpler http://rackt.org/redux/docs/basics/UsageWithReact.html

This approach is great if you have access to the backend and can make it conform to your app's needs but what about when you don't? How do you work with data that isn't normalized? The answer is that you normalize it before you consume it. Under no circumstances should you try to force nested structures onto your React components, it will be a massive pain in the future. Keep your components as dumb as possible and don't burden them with complex handling of nested data.

How you abstract away the data's problems is going to be a case by case thing. In some scenarios you are just going to want to build a function that normalizes data. But in many cases you will adopt a tool designed for it, something like [normalizr](https://github.com/gaearon/normalizr)
