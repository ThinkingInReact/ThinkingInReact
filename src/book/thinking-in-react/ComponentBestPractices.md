# Component Best Practices

React gives you tools to solve problems in a huge variety of ways. This gives you a lot of power but also gives you a lot of ways to walk into invisible sliding glass doors. A lot of what React provides is for rare edge cases. It is easy to think your app is one of those edge cases but trust me it isn't. Most likely, you are just missing the correct approach to your problem and it just looks like your app is an edge case.

Problems occur when we hit dead ends. When we are stuck we look for the closest solutions but often the closest solutions are the wrong ones. When we hit dead ends our first inclination is to look for the nearest way out, not to turn around and go back the way we came. Usually we have some idea that our solution is not idiomatic but starting over seems like more work so we choose the non-idiomatic solution and push ahead.

We can avoid this trap by adopting rigid constraints that we do not violate. Most problems start gradually with little violations here and there and eventually we find ourselves with a mess. With constraints and best practices we can avoid the gradual creep towards a dead end, we can see we are heading the wrong way long before it gets too hard to turn back.

## Keep Your Components Pure

These are the methods a React component can implement:

- componentDidMount
- componentDidUpdate
- componentWillMount
- componentWillReceiveProps
- componentWillUnmount
- componentWillUpdate
- displayName
- forceUpdate
- getDefaultProps
- getDOMNode
- getInitialState
- isMounted
- mixins
- propTypes
- render
- replaceProps
- replaceState
- setProps
- setState
- shouldComponentUpdate
- statics

That is a lot we can implement. The vast majority of a component's API deals with the management of state. We can do away with worrying about 90% of it if we decide that all our components will be pure. A component is pure when it returns the same result give them same state. This makes checking to see if the component should re-render dead simple, the previous state and next state are simply compared. If immutable objects are used the comparison is near instantaneous.

There are two ways to make a pure react component;

1. You can create a stateless component https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
2. You can create component a that uses the pure render mixing Checkout https://facebook.github.io/react/docs/pure-render-mixin.html for details

## Never store values on this: They will explode

If you come from many other frameworks you are used to using stuff like:

```js
this.text = "Current field's text";
```

The biggest mistake you can ever make with React is storing a value on `this`. I cant emphasize _this_ enough, don't do it. React expects you to pass everything through either setState or props. If you bypass React, at best you will not get re-renders when you expect them, and at worst you will lose values unpredictably.

## Use props not state

There are many examples floating around out there that will have you manage local state in a component. The idea is that you keep all a component's state inside of it, a separation of concerns, but for state. A simple example looks like this:

```js
var TextInput = React.createClass({
  handleChange: function(event) {
    this.setState({text: event.target.value});
  },
  render: function() {
    return(
      <input type="text" value={this.state.text} onChange={this.handleChange}/>
    );
  }
});
```

A large faction of developers like working this way, but it has one major drawback, it makes restoring state much harder.

Imagine the case of a form, if a user were to suddenly close their browser window, all the state would be gone. They'd have to start over again. If we wanted to keep track of the form's data we'd have to add separate hooks to push the state:

```js
handleChange: function(event) {
  this.setState({text: event.target.value});
  this.dispatch({type});
},
```

In almost all cases you are going to want the ability to keep track of a component's internal state because it makes for a better user experience. And once you start adding callbacks that push state globally you have defeated the entire purpose of using setState, so you might as well be using props.

When you use props you can rewind/playback and keep track of state anyway you like. If a user closes his browser window in the middle of a form, it can be restored exactly the way it was.

The bigger point of using props is that it gets you to think about your app's state. When you think, about for example, a text field, it can seem like its text will be used in isolation. But when you think about a text field in the context of your app it is extremely rare it will be used in isolation, its state will have greater meaning. It might be the current todo being edited, the name field on a registration form for your daughter's first soccer team, or an inscription field for a headstone on your mother's grave. Using properties instead of internal state forces you to think about the context in which your component is being used, instead of thinking of it as just a component.

## Functions not Mixins

Mixins are awesome but like many awesome things they come with a lot of magic. It is hard to know what they are doing to your component. And although they are very easy to compose in other components they are hard to use outside of that context. There are two alternatives you should pursue before using a mixin;

1. Using plain functions

Plain functions are vastly underutilized. They are the easiest containers of functionality to pass around and compose. If you make sure they are side-effect free and pure then their APIs are incredibly simple; pass in arguments, get back results. Instead of mixing-in things, just make a function, and call it.

2. Higher-Order Components. Wat? Higher-Order components are components that wrap other components. Instead of including a mixin we wrap our component in another component. It looks like this:

```js
return(
  <AwesomeComponent onClick={this.clickHandler}>
  // our stuff
  </AwesomeComponent>
);
```

See the chapter on composition for more examples

## Do more in render

JSX is a bit of a mind warp, it can be hard to get comfortable pushing so much through what feels like a view. There is a tendency to use naming schemes like ViewController or ViewModel to get one more comfortable with the idea of large views. It is a mistake to start inventing jargon out of anxiety. There is nothing wrong with large views, in declarative code, large views are not a code smell. Declarative views can be as big as you need them to be as long they only handle one thing. A component should take state and return a representation of it. It can be as complicated as it wants as long as it only does that one thing.

If you find yourself preparing your views by setting properties or state outside of render you are likely over abstracting. A typical example looks like:

```js
componentWillMount: function () {
  this.setState({
    filteredTodos: filterTodos(this.props.todos)
  });
},
```

This is not necessary, we can move this into our render function no problem:

```js
render: function() {
  var todos = this.props.todos.filter((todo) => {});
  var rows  = [];
  todos.map((todo) => {
    rows.push(<Todo todo={todo} />);
  });

  return (
    {rows}
  );
}
```

Most of this stuff has its origins in premature optimization. We think that somehow a filter or map will be slow so we make sure to precompute everything. The reality is that plain javascript is extraordinarily fast, you can loop through and filter millions of items in a few hundred milliseconds.

In the rare case you do encounter performance issues, don't move your computations to state just yet. First attempt to wrap the filtering into pure functions that return the filtered results. If these functions are pure you can cache them internally using:

## Memoization For CPU Intensive Tasks

Memoization is when you take the result of call to a function and record the result in a cache. It is a simple solution for computation intensive operations that doesn't require you to pollute a data store with precalculated state. It works best when functions are pure and given the same arguments they return the same results. It looks like this:

```js
var upperCase = _.memoize(function(string) {
  return string.toUpperCase();
});
```

You can tell how useful something is by the examples they give for it. If examples are easy to think of they will make their way into the docs but if they are hard you'll find doc examples for cases you should never ever use something for. You should never never never ever cache the result to toUpperCase, the performance of that call will never exceed the overhead of remembering the call. Yet there it is as the defacto example.

I tried to think of some better examples for memoization while writing this section and I couldn't think of any simple scenarios where memoization would be useful. I think that is a sign. Chances are anytime memoization is useful you will have bigger problems, so don't worry about it now.
