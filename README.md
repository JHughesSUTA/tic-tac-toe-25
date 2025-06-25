# Frontend Mentor - Tic Tac Toe solution

This is a solution to the [Tic Tac Toe challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the game either solo vs the computer or multiplayer against another person
- **Bonus**: Instead of having the computer randomly make their moves, try making it clever so it’s proactive in blocking your moves and trying to win

### Links

- Live Site URL: [Add live site URL here](https://jhughessuta.github.io/tic-tac-toe-25/)

## My process

### Built with

- React
- SASS

### What I learned

The trickiest part of this app was working out the logic for the computer to calculate their move and how that impacts state. Working on this forced me to really understand React lifecycle and how/when the page renders.

This was also my first time building a modal component (using an HTML dialog) within a React app. It did require some extra steps to toggle the modal on and off than it would on a vanilla web app, mainly that I had to useRef in order to run .close() or .showModal()

```js
const gameWonModalRef = useRef(null);

const toggleGameWonModal = () => {
  if (!gameWonModalRef.current) return;
  if (gameWonModalRef.current.open) {
    gameWonModalRef.current.close();
  } else {
    gameWonModalRef.current.showModal();
  }
};
```

Because of my component structure and where I was triggering the modal, I initially used useForwardRef() - however it looks like useForwardRef is no longer necessary in React 19+ and will soon be deprecated.

This was also my first time using Sass within a React project. Vite makes it pretty simple, but I did have to determine folder structure of the styles within a React app. I actually asked AI to recommend a folder structure and this is what it suggested (a styles folder, and individual component .scss files within the components folder with their jsx counterparts). I'm not sure I loved having the component styles in the same folder so will continue to explore other options to find what I like best.

Sass is also deprecating @import which I used historically - so this was a good opportunity to learn how to use @use and @forward




- Website - James Hughes(https://jhughessuta.github.io/)
