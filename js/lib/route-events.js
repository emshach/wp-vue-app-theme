import wpapix from './wpapi';
import store from './store';

const mkApiRequest = ( Type, arg ) => {
  return ( to, from, next ) => {
    console.log( 'this is', this );
    console.log( 'also', { to, from, next });
    wp.api.loadPromise.done(() => {
      var object = new Type( arg ? arg( to ): to.params );
      object.fetch({
        success: ( model, result, options ) => {
          console.log( 'got', object, result );
          if ( result.members_only && ! store.state.user.membership ) {
            if ( result.preview ) {
              next({ path: '/preview/' + result.preview });
            } else if ( result.redirect ) {
              next({ path: result.redirect });
            } else
              next({ path: '/shop/membership', then: to.path });
          }
          store.state.nextpost = result;
          next();
        },
        error: ( model, result, options ) => {
          Vue.swal( "Sorry! We couldn't get you that page.<br/>Please try again later" );
          next( false );
        }});
      // TODO: handle specific errors
    });
  };
};
const toPreviewRelease = mkApiRequest( wpapix.Preview, to => {
  return { path: to.params.preview + '/' + to.params.release };
});
const toPreview = mkApiRequest( wpapix.Preview );
const toPath = mkApiRequest( wpapix.Path );
const toRelease = mkApiRequest( wpapix.Release );

export default {
  mkApiRequest,
  toPreviewRelease,
  toPreview,
  toPath
};
