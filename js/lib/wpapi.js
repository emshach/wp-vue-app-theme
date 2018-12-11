var Path = wp.api.models.Post.extend({
  defaults: {
    path: ""
  },
  url() {
    return wpApiSettings.root + 'mrk/v1/path/' + this.get( 'path' );
  }
});

var Paths = wp.api.collections.Posts.extend({
  url() {
    return wpApiSettings.root + 'mrk/v1/paths';
  },
  model: Path
});

wp.api.models.Path = Path;
wp.api.collections.Paths = Paths;

export default { Path, Paths };
