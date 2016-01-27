# Setting up a Dev Environment

The biggest hurdle learning anything is getting to the point where you can see things happen. React is much like any other modern framework, the initial hurdle to see things can be quite extreme. If you have the prerequisites mastered, getting up and running with React.js is easy, it is just a shell command or two. But if you lack mastery in any of the foundational technologies that a React workflow depends on it can be a frustrating experience. It takes developers many months of playing with their tech stack every day to reach a point where they comfortable.

In light of this, I encourage you to avoid any temptation to fully control your workflow. Dive in learn React learn with the starter kits, templates, generators and the one line commands that get you up and running in minutes. Resist the urge to fully understand the systems and focus on learning what you set out to learn _React_. The biggest frictions in learning come from the problems we create for ourselves; when we get caught up tackling the wrong things, trying to create the perfect environment, build script, or most proudctive workflow. Keep it easy, you'll thank yourself later.

For all our projects we will use a starter kit called [nwb](https://github.com/insin/nwb). Every example we tackle will begin with a call to this generator. This leaves fewer places to get tripped up when setting up an example project. Fewer places to go wrong means less frustration while learning. And there will be frustration. There will be curse words, mysterious bugs, problems getting going and problems continuing to move.

But there will be discovery and wonderful moments when things finally click and it will make all the frustration worth it. The momentum of discovery will carry you through the frustration. The less frustration there is to overcome the more likely you will be carried through it by new discoveries, by new "Ah HA!" moments.

## The Prerequisites

Before we get setup with our React workflow we will need to get some stuff installed. We will need; nvm, node.js, npm, and MongoDB (for later backend examples).

### OS X

First let's install nvm:

```sh
brew install nvm
```

> **Info** You will need xcode installed for most of this to work

And node:

```sh
nvm install v4.2.0
```

Then MongoDB

```sh
brew update && brew install mongodb
```

### Ubuntu

First make sure you have build-essential and libssl-dev installed:

```sh
sudo apt-get install build-essential libssl-dev
```

Then install nvm:

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
```

And node:

```sh
nvm install v4.2.0
```

Then MongoDB

```sh
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### Arch

First install nvm:

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
```

And node:

```sh
nvm install v4.2.0
```

Then MongoDB

```sh
pacman -S mongodb
```

## An Intro to the Generator

Now that we have our prerequisites installed lets install nwb:

```sh
npm upgrade
npm install -g nwb
```

Then lets make a new project folder and cd into it:

```sh
nwb new react-app cats
```

And test everything is working:

```sh
cd cats
nwb serve --auto-install
```

## Resources for Learning More

In this book I will avoid covering a lot of the innards of the tech stack, we will focus on React and rely on standard ways of doing things. That said, it is very beneficial for you dive into your build tools and learn them. I highly recommend the following;

* [webpack-howto](https://github.com/petehunt/webpack-howto): A recipe oriented guide to webpack
* [react-docs](https://facebook.github.io/react/docs/getting-started.html): The canon React api docs
* [awesome-react](https://github.com/enaqx/awesome-react): A list of awesome react Resources
* [You Don't Know JS Series](https://github.com/getify/You-Dont-Know-JS): Awesome series on JS
