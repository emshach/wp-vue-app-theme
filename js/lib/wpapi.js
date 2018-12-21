var Path = wp.api.models.Post.extend({
  version: 'mrk/v1/',
  root: 'path',
  defaults: {
    path: ''
  },
  url() {
    return wpApiSettings.root + this.version + this.root + '/'
       + this.get( 'path' );
  }
});

var Program = Path.extend({
  root: 'program'
});

var Release = Path.extend({
  root: 'release',
  defaults: {
    program: '',
    release: ''
  },
  url() {
    return wpApiSettings.root + this.version + this.root + '/'
       + this.get( 'program' ) + '/' + this.get( 'release' );
  }
});

var Preview = Path.extend({
  root: 'preview'
});

wp.api.models.Path    = Path;
wp.api.models.Program = Program;
wp.api.models.Release = Release;
wp.api.models.Preview = Preview;

export default { Path, Program, Release, Preview };
