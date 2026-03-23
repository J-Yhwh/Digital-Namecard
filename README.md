# Digital_Namecard

Interactive digital name card with vCard QR code & share — built with Vue 3, TypeScript, Vite & Tailwind.
This template should help get you started developing with Vue 3 in Vite.


![Name Card Demo](screenshot.png)

**Live Demo:** (add Vercel/Netlify link when deployed)

**Features:**
- vCard format auto-save to phone contacts via QR
- Native share button (iOS/Android)
- Clipboard fallback
- Responsive & modern design (Vue 3 + TypeScript + Vite + Tailwind)



Tech stack: Vue 3, TypeScript, Vite, Tailwind CSS, QRCode.vue, @vueuse/core


## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)
- Safari(Webkit):
  - Vue.js devtools is **not** available as a native extension in Safari (Apple ecosystem restricts certain extensions).
  - **Recommended workaround:** -> Use Safari’s built-in **Web Inspector** (Develop → Show Web Inspector) and the `Vue DevTools` bookmarklet
    from https://github.com/vuejs/vue-devtools/tree/main/packages/bookmarklet (drag to bookmarks bar → click on your page to load a mini inspector).
  

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

1. Install node.js and vue 
```bash
npm install -D \
  @vitejs/plugin-vue \
  typescript \
  vue-tsc \
  tailwindcss \
  postcss \
  autoprefixer \
  @types/node \
  vueuse/core
```

2. Compile and Hot-Reload for Development (opens to http://localhost:5173 at the browser)
```bash
cd ~/Directory...FILEPATH/ npm run dev
```

3. Compile and Minify for Production (modify/add/overhaul design)

```bash
~/Directory...FILEPATH/ npm run build
```


