const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const decode = require('html-entities').decode;

const getLyrics = (songName) => {
    return fetch(encodeURI(`https://genius.com/api/search/multi?per_page=1&q=${songName}`), {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'}).then(data => data.json()).then(data => {
        const song = {
            artist: data.response.sections[0].hits[0].result.primary_artist.name,
            title:  data.response.sections[0].hits[0].result.title,
            cover:  data.response.sections[0].hits[0].result.song_art_image_url,
            url:   data.response.sections[0].hits[0].result.url,
        };
        return fetch(data.response.sections[0].hits[0].result.url).then(data => data.text()).then(data => {
            if(data.includes('<div id="lyrics-root-pin-spacer">')){
                data = data.substring(data.indexOf('<div id="lyrics-root-pin-spacer">')).replace(/<br[^>]*>/g, '\n')
                song.lyrics = decode(data.substring(0,data.indexOf('<button'))).replaceAll(/<[/]?[^>]*>/g, '');
                return song
            } else
                return getLyrics(songName);
        });
    });
};

exports.getLyrics = getLyrics;