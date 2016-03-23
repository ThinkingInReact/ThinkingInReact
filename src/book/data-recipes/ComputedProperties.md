# Computed Properties

Imagine you are on the edge of your galaxy, hurling around a nuclear inferno at 30 kilometers per second, every day an astronomical amount of radiation is hurled at your spaceship, this radiation could kill you, but the magnetic generator inside your big blue rocky wet spaceship keeps all the radiation out. Imagine that one day, your boss, a man that has circled through this part of the galaxy a mere 32 times, but is considered old in these sectors of your spaceship, a sector once used for growing apples but now used for housing humans that stare at screens all day. Your boss has a problem, the users of a new app for keeping track of what humans do while staring at screens is having trouble displaying First Names and Last Names.

In the past they had a model with a function that returned a first and last name, it looked like this:

```js
fullName: function() {
  return this.get('firstName') + ' ' + this.get('lastName');
}
```

They aren't sure how to do this now that they have adopted Redux and there is no model around.

> Stuff like this really doesn't belong in models.

I say, while contemplating the futility of life, the universe, and computed properties.

It is more of a presentation helper and can be put in the view itself. Like the following:  

```js
return <div>{this.props.firstName + this.props.lastName}</div>;
```

If it is complicated enough you can split things up into separate functions and just use it sorta like a view helper e.g:

```js
const joinName = firstName, lastName => {
  return `${firstName} ${lastName}`
}

render() {
  return <div>joinName(this.props.firstName, this.props.lastName)
}
```

> Of course some people don't have names that fit that model and you should accommodate them

you say.

> It is fine man, we don't have any like Indian customers or weird nerds with numbers in their name

Your boss, smacks you on the shoulder while saying something about how he is skipping lunch for soylent today. "Thanks bro!", he says, and walks away to the desk next to you.

You look at your screen and contemplate whether or not you should have told him about not putting computed properties as state and how that is an anti-pattern. You add a new section to the style guide and hope someone reads it, even though you know no one will, not on this spaceship.

Your style guide looks like this:

## Best Practices

Use getters to compute properties:

```js
// bad
firstAndLastName() {
  return `${this.props.firstName} ${this.props.lastname}`;
}

// good
get fullName() {
  return `${this.props.firstName} ${this.props.lastname}`;
}
```

Don't cache state in render:

```js
// bad
render() {
  let name = `Mr FancyPants. ${this.props.name}`;

  return <div>{name}</div>;
}

// good
render() {
  return <div>{`Mr FancyPants. ${this.props.name}`}</div>;
}

// best
get fancyPants() {
  return `Mr fancyPants. ${this.props.name}`;
}

render() {
  return <div>{this.fancyPants}</div>;
}
```
