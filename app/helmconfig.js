import chromecon from 'images/chrome-ninja192-precomposed.png';
import applecon from 'images/apple-ninja152-precomposed.png';
import mscon from 'images/ms-ninja144-precomposed.png';
//import favicon from 'images/favicon.png';

const config = {
  link: [
    // Add to homescreen for Chrome on Android
  //  { rel: 'icon', href: favicon },
    { rel: 'icon', sizes: '192x192', href: chromecon },
    // Add to homescreen for Safari on IOS
    { rel: 'apple-touch-icon', sizes: '152x152', applecon },
    // Order is important here. Main needs to be declared to overwrite.
    { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css', type: 'text/css' },
    { rel: 'stylesheet', href: '/assets/styles/main.css' }
  ],
  meta: [
    { charset: 'utf-8' },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
    { name: 'description', content: 'A resume collection application.' },
    // Mobile Safari introduced this tag to let web developers control the viewport's size and scale
    // The width property controls the size of the viewport, the initial-scale property controls
    // the zoom level when the page is first loaded
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    // Add to homescreen for Chrome on Android
    { name: 'mobile-web-app-capable', content: 'yes' },
    // Add to homescreen for Safari on IOS
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'Uiba' },
    // Tile icon for Win8 (144x144 + tile color)
    { name: 'msapplication-TileImage', content: mscon },
    { name: 'msapplication-TileColor', content: '#3372DF' }
  ]
};

export default config;
