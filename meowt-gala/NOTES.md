This is an unformatted dump of my notes. Will fix formatting later.

High level selling points for presentation:
Size of comparable projects across SPA frameworks
Rendering speed
Discuss Webpack/roll-up
Img tags must have alt - cool accessibility!
Con: variables in styles cannot be interpolated, must be done through CSS variable via style tag

Compatibility with microfrontends - namely single-spa and Stencil
Compatibility with css-in-js frameworks
Compatibility with storybook
E2E/Unit testing
Redux tools?
Debugging state tools?
VSCode tooling?
Routing?
Lazy loading?
TS Support?

Good things to mention:
all styles written in a component are scoped css.

Good things to criticize:
Having to use new syntax to write if/else (#each, #if) as opposed to using pure javascript in something like react
When you use reactive declarations to subscribe a variable change, Svelte can not detect mutations on arrays. Svelte offers some hacky ways for that situation (double check this??)
You have to use on: for DOM events, like on:click. Cannot use onClick.

Names: Ian Barczewski, Nick Perrin

Session Category: Technical - General

Session Title: Using Cats To Assess Svelte, JavaScript's Fastest Growing Framework

Session Description: In the State of JavaScript survey for 2019, Svelte was awarded the Prediction Award, the award presented to a growing technology that is most likely to break through the mainstream. Svelte, a single page front end framework, is attempting to disrupt a crowded space, with competition from React, Vue, and Angular. In a cat-themed presentation built entirely in Svelte, we will give our assessment of Svelte in its current state, from its integration with technologies like TypeScript and microfrontends to tooling support with popular editors like Visual Studio Code, and whether you (or the company!) should adopt Svelte today for projects and client contracts. 

Presentation Format: 45 minute presentation using an application built in Svelte as the presentation tool

Equipment Needed: Projector

