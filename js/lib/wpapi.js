import WPAPI from 'wpapi';
var apiRootJSON = require( './rest.json' );
var site = new WPAPI({
    endpoint: 'http://my-site.com/wp-json',
    routes: apiRootJSON.routes
});

export default site;
