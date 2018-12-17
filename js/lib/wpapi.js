var Path = wp.api.models.Post.extend({
  defaults: {
    root: 'path',
    path: ''
  },
  url() {
    return wpApiSettings.root + this.get( 'root' ) + this.get( 'path' );
  }
});

var Program = wp.api.models.Path.extend({
  defaults: {
    root: 'program'
  }
});

var Release = wp.api.models.Path.extend({
  defaults: {
    root: 'release'
  }
});

var Preview = wp.api.models.Path.extend({
  defaults: {
    root: 'preview'
  }
});

wp.api.models.Path    = Path;
wp.api.models.Program = Program;
wp.api.models.Release = Release;
wp.api.models.Preview = Preview;

export default { Path, Program, Release, Preview };
