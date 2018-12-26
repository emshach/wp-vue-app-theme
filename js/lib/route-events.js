import wpapix from './wpapix';
import store from './store';
import Swal from 'sweetalert2';

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
          Swal( "Sorry! We couldn't get you that page.<br/>Please try again later" );
          next( result.redirect? { path: result.redirect } : false );
        }});
      // TODO: handle specific errors
    });
  };
};
const toPreviewRelease = mkApiRequest( wpapix.Preview, to => {
  return { path: to.params.program + '/' + to.params.release };
});
const toPreview = mkApiRequest( wpapix.Preview );
const toPath = mkApiRequest( wpapix.Path );
const toRelease = mkApiRequest( wpapix.Release );

export default {
  mkApiRequest,
  toPreviewRelease,
  toPreview,
  toPath,
  toRelease
};
