# Intro to WebVR

So virtual reality is kinda popular these days. The HTC Vive and Oculus Rift are probably two of the most popular virtual reality solutions on the market right now, but VR can also be achieved through a plethora of cheap headsets that use a smartphone as the display and processor.

## WebVR

While heavy-duty VR applications should be written with something like [Unity](http://unity3d.com), it's possible to create lightweight, immersive experiences in modern browsers, through a new experimental standard called [WebVR](http://webvr.info).

WebVR is a Javascript API that allows the browser to interface with VR devices such as the Rift, Vive, Samsung Gear, Google Cardboard, and other similar headsets.

WebVR is still very experimental and only implemented on development builds of browsers (the Firefox nightly build or Chromium experimental builds, for example). However, there are [polyfills](https://remysharp.com/2010/10/08/what-is-a-polyfill) available that make WebVR accessible to the masses today.

There are also libraries that make developing VR applications exceptionally easy. We will be using one of them today: [A-Frame](https://aframe.io/)

## A-Frame

A-Frame is a Javascript library developed by Mozilla to simplify the process of making VR web applications as well as provide a way to represent VR objects in the DOM. It builds on top of [three.js](http://threejs.org/).

You can start using A-Frame by simply including:

```html
<script src="https://aframe.io/releases/0.3.2/aframe.min.js"></script>
```

in your HTML file.

### Entity-Component System

Essential to using A-Frame is understanding how the Entity-Component system.
Three.js is organized by the entity-component system, and A-Frame brings that
into the DOM.

Take this example code for a box:

```html
<a-entity geometry="primitive: box; depth: 2"
          material="color: #6173F4; opacity: 0.8"></a-entity>
```

An entity is an individual object (a box, in this case). It is the `<a-entity>`.
`geometry` or `material` is an example of a component. Components are attributes
of entities.

## Let's Get Started!

### A Couple of Reminders

VR is graphics-intensive. It's not wise to use models with high polygon-counts
or high-resolution textures. Keep in mind that these scenes will likely be
rendered on a mobile phone.

Also make sure that your controls are intuitive. For example, do not suddenly
take away control of the camera from the user. It's jarring and disconcerting at
best, and can make the user feel helpless or distressed.

### Basics
Make sure you have included the A-Frame script mentioned above.
Begin by dropping in

```html
<a-scene></a-scene>
```

This sets up the environment and prepares a scene. You can now start adding
entities. It's now wise to talk about positioning. All objects in the world are
placed on a right-handed 3-dimensional coordinate system. By default, everything's
coordinates are set to (0, 0, 0).

Alright, now let's just add a cube. `<a-box>` is a helper entity. You could do
the same thing by using `<a-entity geometry="primitive:box">`
```html
<a-box color="#aa6666" width="2" height="2" depth="2"></a-box>
```

Now if you open up your file in a browser, you will notice a Cardboard icon in
the bottom right, but nothing else. This is because you're currently _inside_
the cube. Remember, everything's position defaults to (0, 0, 0). Fortunately,
you can use WASD to navigate and the cursor to look around, so you can walk back
a little, and observe your masterpiece (a red cube). It's interesting to note
that **all numbers that denote length are in meters**, and **rotations are
defined in degrees**. 

### Lighting

By default, there's an ambient light and a sun light (directional). When you add
lights into your code, that goes away. Lighting is very important, and lots of
fun to play around with. Here are the
[docs](https://aframe.io/docs/0.3.0/components/light.html) for you to read. Let's add an ambient light.

```html
<a-entity light="color: #66F; intensity: .3; type:ambient" position="0, 4, 0"></a-entity>
```

This adds a blue-ish ambient light with an intensity of 0.3 (lol idk what that's
measured in). 

Let's make the environment black, just so we can tell what's lit up, with

```html
<a-sky color="#000"></a-sky>
```

We can also add a directional light so that we can see some nice shadows.

```html
<a-light color="#3E3" position="2, 4, 4"></a-light>
```

Now we can see that the cube is being lit from the top right. Wowzers.

That's cool and all, but nobody wants to just see a cube. The real question is,
can we add 3D models to the scene? The real answer is, **abso-frickin-lutely**.

### Outside Assets

Let's put a Christmas tree in there! A-Frame supports the .obj and .dae
(Collada) files out of the box. We'll be using Collada files because they store
both material/texture information and shape information. If we used Wavefront
(.obj) files, we would also need to include a .mtl file for the materials.

[This](http://vandaengine.org/exporting-from-blender-to-collada/) is a handy
guide exporting your Blender models to the Collada format.

```html
<a-entity collada-model="url(./models/decorated_tree.dae)" position="0, 1, 0"></a-entity>
```

However, there's a better way! A-Frame has an asset management system that helps
you create more performant applications. So instead of what you did above, you
should use this code:
```html
<a-assets>
    <a-asset-item id="decorated-tree" src="./models/decorated_tree.dae"></a-asset-item>
</a-assets>
<a-entity collada-model="#decorated-tree"></a-entity>
```

Sweet. Now we have a nice Christmas tree sitting on top of our box. Let's add
some interactivity.

### Javascript!!!

A-Frame allows us to not only build our environments, but also make them
interactive. Let's make the tree spin when we click on it. In order to have a
cursor, we have to define our own camera with a cursor:

```html
<a-camera position="0 1.8 0">
    <a-cursor color="#2E3A87"></a-cursor>
</a-camera>
```

We can accomplish this by writing our own A-Frame component (wow!). In our
script.js, we'll register a new component.

```javascript
AFRAME.registerComponent('turn-on-click', {
    schema: {
        to: {default: "0 90 0"},
    },
    init: function () {
        data = this.data;
        element = this.el;
        this.el.addEventListener('click', function () {
            this.setAttribute('rotation', data.to);
        });
    }
});
```

Then we add that component to our tree.

```html
<a-entity collada-model="#decorated-tree" position="0, 1, 0" turn-on-click></a-entity>
```

### Extensibility

As we just helped demonstrate, there can be third party A-Frame components. In
fact, there are quite a few of them already. Take a look at [this Github
page](https://github.com/aframevr/awesome-aframe#components) for some of the
preexisting components. Pretty sweet.

All you need to do to use a component is include the component's Javascript code
after you include the A-Frame code.

### Off to the races!

Those are basically the basics of A-Frame. There's so much room for creativity,
so go wild!

## Activity

Your activity today is to make a VR Christmas (Or Hanukkah or Kwanzaa) card. To
aid you in your endeavours, I have some Collada models already in the /models
directory. Some additional third-party components you might want to look into
include:
- [Include animated
    gifs](https://github.com/gtk2k/gtk2k.github.io/tree/master/animation_gif)
- [Particle systems (think
    snow)](https://github.com/IdeaSpaceVR/aframe-particle-system-component)
- [Include text (make sure to read the
    docs!)](https://github.com/ngokevin/aframe-text-component)
