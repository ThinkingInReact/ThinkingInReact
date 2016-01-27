# Hello World

The best way to learn is by diving in. Instead of going over dev environments let's start out with a Hello World. Visit [jsfiddle](https://jsfiddle.net) and add the following to the HTML block:

```html
<script src="https://facebook.github.io/react/js/jsfiddle-integration.js"></script>

<div id="container">
  <!-- This will be replaced by React -->
</div>
```

Now we need a component in the JS field:

```js
var Hello = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.render(<Hello name="World" />, document.getElementById('container'));
```

Let's break this down. We have created a class named _Hello_ with a single function, _render_. What is _Hello_? Well, let's inspect it and find out. Add the following to your JS:

```js
console.log(Hello);
```

Hit "run" and then open your console. You should something like:

```js
function (props, context) {
  // This constructor is overridden by mocks. The argument is used
  // by mocks to assert on what gets mounted.
....
```

Hello is a constructor function. Let's click on the item in the console and take a look at the source:

```js
/**
 * Creates a composite component class given a class specification.
 *
 * @param {object} spec Class specification (which must define `render`).
 * @return {function} Component constructor function.
 * @public
 */
createClass: function(spec) {
  var Constructor = function(props, context) {
    // This constructor is overridden by mocks. The argument is used
    // by mocks to assert on what gets mounted.

    // ...
    // Wire up auto-binding
    if (this.__reactAutoBindMap) {
      bindAutoBindMethods(this);
    }

    this.props = props;
    this.context = context;
    this.state = null;

    // ReactClasses doesn't have constructors. Instead, they use the
    // getInitialState and componentWillMount methods for initialization.

    var initialState = this.getInitialState ? this.getInitialState() : null;
    this.state = initialState;
  };
  Constructor.prototype = new ReactClassComponent();
  Constructor.prototype.constructor = Constructor;

  injectedMixins.forEach(
    mixSpecIntoComponent.bind(null, Constructor)
  );

  mixSpecIntoComponent(Constructor, spec);

  // Initialize the defaultProps property after all mixins have been merged
  if (Constructor.getDefaultProps) {
    Constructor.defaultProps = Constructor.getDefaultProps();
  }

  // Reduce time spent doing lookups by setting these on the prototype.
  for (var methodName in ReactClassInterface) {
    if (!Constructor.prototype[methodName]) {
      Constructor.prototype[methodName] = null;
    }
  }

  return Constructor;
}
```

It is surprisingly simple. For the most part all it this is turn the object literal we pass into createClass into a constructor object. Beyond some mixin handling there is not much going on. It reminds me of the early days of classes in JS when it was usually done by hand, before libraries came along that gave us everything plus the kitchen sink.

> **Info** React strives to keep their classes implementation simple so that they can be compatible with native implementations in the future. Adding a bunch of fancy things would interfere with that goal. They even recommended that users avoid using Mixins because they are on their way out until a standard JS implementation is available

The next question is, what happens when we construct a Hello component. Let's do that now. Replace the loggin line with the following:

```js
console.log(new Hello());
```

When we look at our console we get the following:

```js
Constructor {
  getDOMNode: function (),
  props: undefined,
  context: undefined,
  state: null,
  __proto__: ReactClassComponent
}
```

> **Caution** If anything at this point is confusing make sure you understand _this_ and prototypal inheritance. Not just a bit but fully understand it. If you have never taken the time then go do it now. If you don't know where to start or explanations have never made sense; then I highly recommend the "You Don't Know JS" book on the subject. It is free to read on [Github]( https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)

Components are pretty straightforward objects with just a render function.

The next lines of our hello world call this component and render it to a DOM element.

```js
React.render(<Hello name="World" />, document.getElementById('container'));
```

You may have noticed that we mix and match HTML into our JS. This is called JSX and it lets you mix HTML markup into your React components. It can seem like a new language and bastardization of JS but it is really not. A JSX preprocessor takes your HTML markup and turns it into a series of nested React.createElement calls that look like this:

```js
React.createElement("div", null, React.createElement("h1", null, "Hello World"))
```

This keeps it close to the metal so to speak and allows you if you so desire to create markup with raw JS. For this reason, many developers prefer to craft their markup with a JS variant like CoffeeScript. With some convenience wrappers the code can look just as clean if not cleaner than the JSX version. For example, in CoffeeScript our component would look like:

```coffeescript
Hello = React.createClass
  render: ->
    div null,
      h1("Hello World!")
```

For this book we will use JSX and ES6. Mostly, because it is the standard way of doing things. However, the skills you will learn will be easily translatable to a variety of JS variants.

Mixing markup with JS seems strange at first and can feel like a massive violation of separation of concerns but once you get to used to it you will realize it makes sense.

One of the the things the creators of React realized was that views and code are intertwined. Separating the markup in modern web apps doesn't make sense anymore than egg-laying mammals or using XML [^sorry-mozilla-and-android] to build desktop or mobile apps. Separating markup made sense when pages where mostly static content but no longer makes sense when the browser is a platform full fledge apps.

React took some very old ideas and re-applied them to the web. Putting markup in views, declarative layouts, unidirectional data-flow; these are all ideas that have been around for awhile but they were used in different domains, it took some sane minds to realize the web was becoming like those domains, that their ways were suddenly applicable.

This brings us to the central problem that React is trying to solve. It makes declarative views possible on a platform where view updates are expensive. It gives us the power to express our intents without worrying about the how.

Before we dive into setting up a dev environment I'd like leave you with a couple more examples;

A component with children and data:

```js
var data = [
  {author: 'Peter Quill',  text: 'Come and Get Your Love!'},
  {author: 'Groot',        text: 'GROOT!'}
];

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);
```

A very complicated layout:

```js
render: function() {
  return (
    <ReactGridLayout className="layout" cols={12} rowHeight={30}>
      <div key={1} _grid={{x: 0, y: 0, w: 1, h: 2}}>1</div>
      <div key={2} _grid={{x: 1, y: 0, w: 1, h: 2}}>2</div>
      <div key={3} _grid={{x: 2, y: 0, w: 1, h: 2}}>3</div>
    </ReactGridLayout>
  )
}
```

[^sorry-mozilla-and-android]: Apologies to Mozilla and Android and to the platypus. Analogies should be victimless, I didn't think before I wrote.
