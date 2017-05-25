// src/server.js

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

    //  INITIALIZE SERVER AND CONFIG SUPPORT FOR EJS TEMPLATE
const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


    //  DEFINE FOLDER USED FOR STATIC ASSETS
app.use(Express.static( path.join(__dirname, 'static') ));


    //  UNIVERSAL ROUTING/RENDERING
app.get('*', (req, res) =>
    {
        match
            (
                { routes, location : req.url },
                (err, redirectLocation, renderProps) =>
                    {               //  IF ERROR DISPLAY ERROR MESSAGE
                        if(err) return res.status(500).send(err.message);
                        
                                    //  IF REDIRECT PROPAGATE REDIRECT TO BROWSER
                        if(redirectLocation) return res.redirect(302, redirectLocation.pathname +                                   redirectLocation.search);
                        
                                    //  GENERATE REACT MARKUP FOR CURRENT ROUTE
                        let markup;
                                    //  IF CURRENT ROUTE MATCHED THEN RENDERPROPS EXISTS
                        if(renderProps) markup = renderToString(<RouterContext {...renderProps} />);
                        else        //  OTHERWISE RENDER 404
                            {
                                markup = renderToString(<NotFoundPage />);
                                res.status(404);
                            }
                        
                                    //  RENDER INDEX TEMPLATE WITH EMBEDDED REACT MARKUP
                        return res.render('index', { markup });
                        
                    }
            );
    });

    //  START THE SERVER
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err =>
    {
        if(err) return console.error(err);
        
        console.info(`Server running on http://localhost:${port} [${env}]`);
    });