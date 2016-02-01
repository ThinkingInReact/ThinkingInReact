# Using jQuery with React

There comes a time in every React developer's life when she must return to the old ways. When she must use imperative code to once again slay the dragons of web development. When she must load up her arsenal of jQuery plugins and set off again into the badlands. When she must join forces with a manic pixie dream boy and defeat the evil ape hybrids from a parallel dimension with the help of a quirky professor and a one hit wonder pop star.

React actually plays rather nicely with old imperative code. If you think about it this makes a lot of sense, React was built at a place still using PHP. They have to deal with a lot of ancient dusty ways of doing web dev at FB. If React didn't play well with old technologies it would have been developed at like Google.

The basic process for using an external library involves two steps;

1. Turn the handling of the DOM over to the external library in `componentDidMount` by passing the library a DOM node using `getDOMNode()``
2. Hook into lifecyle methods so that when setState is called you can update the library; and vice versa, when the library changes state you can inform React.

The second step often only needs to be a single callback, when the lib finishes its stuff we get the data from it and shut down the DOM it used.

## An Example

We have a component and we want to make it draggable with jQuery UI. The first thing we need to be able to do is grab our component's DOM and pass it off to jQuery draggable. We can get the component's DOM node by calling `this.getDOMNode()`. It looks like this:

```js
var Draggable = React.createClass({
  componentDidMount: function() {
    $(this.getDOMNode()).draggable();
  },
  render: function() {
    return <div>Hey! Drag me!/div>
  }
});
```

In some cases this would work fine but what happens if jQuery messes with our DOM node? If for example, it moved the node and appended it to the body. React would then have no idea what happened and would error. The trick to solving this is to only render our component after it has mounted. This tricks React into thinking everything is okay while jQuery does horrible things. It looks like this:

```js
var Draggable = React.createClass({
  render: function() {
    return <div/>;
  },

  componentDidMount: function() {
    var node = this.getDOMNode();
    var draggable = $(node).draggable();

    // Now we render things
    React.renderComponent(<div>{this.props.children}</div>, node):
  }
});
```

## Updating It

Now we have successfully tricked React but we have another unsolved problem, how do we update the jQuery DOM when state changes? It would be awesome to still be able to use setState and get the jQuery widget to change. For example, what if need to disable the widget based on new state? It is actually easy to do this, we just need to hook into `componentWillReceiveProps` and communicate with the widget there:

```js
var Draggable = React.createClass({
  render: function() {
    return <div/>;
  },
  componentDidMount: function() {
    // Store In this so we can call it later
    this.node = this.getDOMNode();
    this.draggable = $(node).draggable();

    // Now we render things
    React.renderComponent(<div>{this.props.children}</div>, this.node):
  },
  componentWillReceiveProps: function(newProps) {
    if(newProps.disable) {
      this.draggabl.disable();
    }
  },
});
```

This also makes it easy to destroy a widget on unmount:

```js
componentWillUnmount: function() {
  React.unmountComponentAtNode(this.node);
  this.draggable.destroy();
}
```

That is it!
