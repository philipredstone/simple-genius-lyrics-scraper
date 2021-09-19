simple-genius-lyrics-scraper
=============

Get Song lyrics and information from genius.com without an API Key!


Installation
------------

```bash
$ npm install simple-genius-lyrics-scraper
```

Usage
-----

### getLyrics(songtitle)

Returns Promise.  
When resolved, a JSON Object is returned with:  **artist**,**title**,**cover (image)**,**url**,**lyrics**

```js
const getLyrics = require("simple-genius-lyrics-scraper").getLyrics;

getLyrics("songtitle").then(lyrics => {
    console.log(lyrics);
});
```