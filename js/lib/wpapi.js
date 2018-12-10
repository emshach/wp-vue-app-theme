var Path = wp.api.models.Post.extend({
  url() {
    return wpApiSettings.root + '/path';
  }
});

var Paths = wp.api.collections.Posts.extend({
  url() {
    return wpApiSettings.root + '/paths';
  },
  model: Path
});

wp.api.models.Path = Path;
wp.api.collections.Paths = Paths;

export default { Path, Paths };
