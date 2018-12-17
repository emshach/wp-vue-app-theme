var Path = wp.api.models.Post.extend({
  defaults: {
    root: 'path',
    version: 'mrk/v1/',
    path: ''
  },
  url() {
    return wpApiSettings.root + this.get( 'version' ) + this.get( 'root' ) + '/'
       + this.get( 'path' );
  }
});

var Program = Path.extend({
  defaults: {
    root: 'program'
  }
});

var Release = Path.extend({
  defaults: {
    root: 'release'
  }
});

var Preview = Path.extend({
  defaults: {
    root: 'preview'
  }
});

wp.api.models.Path    = Path;
wp.api.models.Program = Program;
wp.api.models.Release = Release;
wp.api.models.Preview = Preview;

export default { Path, Program, Release, Preview };
