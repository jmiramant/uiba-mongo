import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

// Remove main stylesheets because we do not extract them into a css file
// in development mode
// if (__DEVSERVER__) {
//   config.link = config.link.filter(l => {l.rel !== '/assets/styles/main.css'});
// }

const Meta = () => (
  <Helmet
    htmlAttributes={{"lang": "en", "amp": undefined}}
    title="Uiba" meta={config.meta}
    link={config.link}
  />
)


ReactDOMServer.renderToString(<Meta />);
const header = Helmet.rewind();

export default header;
