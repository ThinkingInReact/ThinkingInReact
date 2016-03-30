# What You Need To Know

I wonder what happened to the guy that asked how to parse HMTL tags with regular expressions on [StackOverflow](https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags/1732454#1732454). Did he end up using a parser? Did he write a parser? Did he give up on his project? Did he use Regex anyway and end up punished by the code gods? Did all his living tissue become consumed by the one whose name cannot be expressed in our plane?

It easy to find the idea of parsing HTML with Regex ridiculous. Most of us at one time or another have learned what HTML is. We have learned that HTML is a full turing complete language with inconsistencies, peculiarities, and general hate towards its user. Once you truly grasp what HTML is, it is downright counterintuitive to parse it with Regex. No one would ever look at C code and be like "how can I use Regex to parse this?", because we understand that C code is a programming language.

Yet, somehow, questions like that get asked all the time. Head over to StackOverflow on any day and you can find similar questions being posted every hour. What causes this fundamental lack of understanding? [^x-and-y]

Knowledge is deceptive, we cant know what we don't know. We can think we have grasped something without having really grasped it all. In the case of HTML, we can think of it as just text with metadata and then ask some very wrong questions. That human (and hundreds of others like them) had encountered HTML in a context that made it appear nothing like a programming language; and they quickly thought, "yeah I get this, HTML is just text with metadata". Once you think of HTML as just text with metadata it is easy to think of Regex as a decent solution to grabbing what you need from it.

From the perspective of that Regex guy, it wasn't a silly question at all. In fact, it made perfect sense, the solution felt obvious to him and it would have felt obvious to you. Asking about parsing HTML would have felt like the silly question.

> A parser for HTML? That would be insane overkill, they'd laugh at me!

Flaws in thinking are a fundamental problem in all learning, especially in programming [^monads]. It is my hope to give you the tools ask to ask the right questions, to give you the means to learn React without heading down a bunch of wrong paths. This book is only one step on hopefully very long journey. But if you do quit in disgust and become a bike messenger; know we will understand, programming is the worst. At least when everyone is gathered around the impromptu game of hackey sack you will be able to say "I knew React once". It will make a great story for your friends!

What follows is the things you should know before diving into this book. The list is by no means exhaustive and it is quite possible that I will have missed something or will you have a fundamental flaw in your thinking (JS is a LISP not like a duck or a mongoose or a NoSQL DB) that will make you hate the way I wrote this book, but I hope that you will be able to take a lot from it.

*You should know the following;*

## 1. You need a full grasp of JavaScript (mostly just the good parts)

This book is heavily focused on ES6 and most if not all of ES6 features have a 1 to 1 relationship with ES5. Although not essential, it will be extremely helpful if you already have a solid grasp of JS going into this book. You can get through it without knowing JS but there are likely to be a few headaches along the way. If for example, you get frustrated by ES6 classes, it is tremendously helpfully to understand how they work in JS.

You will also need a grasp of how `this` and js scoping works, not in a superficial know how to use bind sort of way, but really truly grasp it. If you have never tackled `this` then now is the time to start. I highly recommend the [You Don't Know JS Series](https://github.com/getify/You-Dont-Know-JS)

## 2. Experience with your system's package managers

There is little in the way of explanations for installation commands in this book, so you will need to be completely comfortable running your package manager of choice `brew install` or `apt-get install` or `pacman` etc.

## 3. Experience with the JS ecosystem like NPM

I have tried to keep the workflows in this book as simple as possible and their dependencies few, but there will still be relatively a lot of them. You will need to be completely comfortable running `npm install -g` and debugging any potential problems. If like most JS developers you use npm on a daily basis then you will have no problem.

Some familiarity with build tools like grunt, gulp, webpack would be helpful but not too necessary. It was my goal to eliminate friction and [JavaScript Fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4) as much as possible so it is rare you will encounter a chapter that isn't pre-configured. My goal is to teach you React, not build tools.

[^monads]: Anyone that has tried to grasp monads knows what I am talking about. Monads, cant understand them, cant make them into [moleeds](https://www.ted.com/talks/charles_fleischer_insists_all_things_are_moleeds?language=en)
[^x-and-y]: Astute readers may recognize this as an [x and y problem](http://xyproblem.info)
