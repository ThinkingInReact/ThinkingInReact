# Thinking In React

When I was little I had a ton of stuffed animals and action figures. First, I'd setup the stuffed animals by throwing them onto the floor into "strategic" locations. Then I'd dump the action figures out onto the floor. The stuffed animals were the mythical monsters and the action figures were the humans defending their land.

It was a perfect setting for conflict and deus ex machina powered plot lines. The stuffed animals served as a faceless horde and enemy that could not be empathized with. There is no better enemy than a gigantic stuffed lion.

Not all the drama was drawn from the conflict of stuffed animal vs human. The humans were fraught with internal conflicts that they would have to work through and resolve if they were to successfully defend their land. They were often lead by a king battling his inner demons from a time when his wife died at the hands of stuffed rabbitabunnysaurus. The king was hell bent on revenge and cared little for the effect his policies had on his citizens, he cared only to wipe out the monsters.

It was always up to an unlikely hero to save the day, to lead the humans to victory and in the process convince the king to believe in him and overcome his demons. A downtrodden knight born of peasant parents -- but through a combination anachronistic musical numbers and pretending to be Sir Ulrich von Liechtenstein he is able to become a knight. Together the knight and the king's daughter would save the kingdom from the great stuffed animals.

Playtime was great but pickup was horrible. I didn't even know where to begin. The room was too much of a disaster. I couldn't see through the mess; the fog of stranded stuffed and animals, action figures hanging from desks, pillow forts constructed from imminent domain seized pillows. Picking up was hard because I didn't know how to approach the problem.

Sometimes I'd sit in my room for hours just staring at the mess. Moving things into random spots, hoping somehow, even without me really making progress, that my room would clean itself. I hoped a pattern might reveal itself add suddenly without even trying really the stuffed animals would find their way off the floor and into places adequately satisfactory for Mom.

I eventually learned that I could put stuffed animals in buckets. And action figures could have spots not under beds. And that pillow forts could be deconstructed without toppling the couch onto my sister's head. I learned how to think about picking up. It became easy, no longer a chore, just part of the process of play. It became easy.

When you first encounter React it is like playing. We get hot reload, unidirectional data flow, inline styles, JSX and fancy demos that make everything seem awesome. But when we set out our own we can be quickly overwhelmed. Our heads quickly get filled with questions like; How do I use jQuery libs with this? How do I animate things? Do I use props or state for this? What is the difference between props and state anyway? Wait, why are my input values not changing? It is easily to feel like; "I'm just going back to Backbone and jQuery, forget this stuff"

I learned to program in 2004 on Macromedia Flash MX. Flash was amazing _\*shudders\*_ and easy! Everything I needed was right there; all I had to do was add a script and hit "run". In seconds, there would be action on my screen! I could make anything happen! I could build anything! WORLDS WITHIN WORLDS!

![Worlds within Worlds](assets/intro/worldsWithinWorlds.png)

Flash wasn't a simple tool; rich and complex applications took a herculean effort to create. What flash was, was easy. Flash let you instantly get up and running and to see what you were building. There were no task runners, no package managers to install, no frameworks to learn or build systems to master. You wrote code and then pressed "run"

Later on, I learned HTML, CSS, and JS. This was even easier! I could write my app in a simple text editor and open it any browser! With JavaScript, I could add all sorts of cool things! Buttons that clicked! Elements that toggled -- that flew around the page and generally drove users insane! It was all so easy and all it took was a browser and a text editor!

Somehow we lost that ease. Knowing your language is no longer enough, you have to become a master of your build tools, your editors, your package managers, your framework's abstractions. MVC, two-way bindings, class constructors, MVVM, compile to JS and Backbone collections and virtual DOMS and syncing engines and on and on. It is no wonder people become obsessed with their chosen stacks, it takes obsession to master them.

React is a philosophical rejection of all these abstractions. It is a realization that with the right technological foundations easy is possible. In React we simply declare what we want and React handles the rest! Patterns, abstractions, frameworks, and complicated libs replaced by better technology.

In the olden days of the web when we needed to update things with JS we just did stuff like this:

```js
document.write("<h1>Hello Earth!</h1><p>Have a nice day!</p>");

function changed(cats) {
  element.innerHTML = "<div>Numeber of cats: " + cats.count + "</div>";
}
```

This works surprisingly well for most cases but throw enough DOM updates fast enough at the browser and it will give up; and not before taking out your user's laptop in blazes of glorious heat sink failures. We quickly learned that the DOM wasn't designed to be updated like this. Instead, we learned to bind the data we needed to the exact element that changed. It looked like this:

```html
<h1 id="cats_count" data-bind="Cat:Count">
</h1>
```

```js
var Cats {
  count: ko.obseravable('catsCount')
};
ko.applyBindings(new Cats(), document.getElementById("cats_count"));
```

This worked great for awhile but the race of ever complicated apps pushed onward and before long our abstractions started to collapse. MVC patterns became Backbone became Marionette became Meteor became hell. React started with a simple question: What if we could just throw updates at the DOM? Wouldn't it be too slow? Wouldn't it be an engineering nightmare? Turns out, it can work.

React at its core is a revival of some very old ways of doing things. In React, you declare your view and React figures out how to render it. It looks like this:

```js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
```

With the simplicity of React, the abstractions we think of as just part of web development become unnecessary. Instead of binding our HTML elements through a bunch of ceremonial hookups, we can just continually pass our new data into React components and React figures out what changed. Instead of views, controllers, and models, we have just Components and State. Instead of being forced to spread state out across modules, functions, controllers, views, models and more; we get one central source.

React changes the way you think. React turns complex problems into non-issues and lets you get back to building things. Most of the ideas that React has spawned like unidirectional data flow, immutable data stores, redux etc, are not just an accident, they are the logical development of rendering things declaratively.

It is hard to think easy. It easy to fall back into old ways of thinking and do away with all the power that React gives us. Instead of unleashing the full potential of React, React becomes just a new fancy view layer we (often angrily) try to force into our old apps. Instead of being fun, React becomes a chore.

This book is about solving old problems in new React ways. You will learn how to implement all the things you have encountered a thousand times before but in dramatically simpler ways. You will learn how to build and implement everything from forms to sliders to dialogs to validation to server syncing and animated buttons. You will learn to _think in React_.
