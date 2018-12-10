var Path = wp.api.models.Post.extend({
  ur() {
    return wpApiSettings.root + '/path';
  }
});

var Paths = wp.api.collections.Posts.extend({
  ur() {
    return wpApiSettings.root + '/paths';
  },
  model: Path
});

wp.api.models.Path = Path;
wp.api.collections.Paths = Paths;

export default { Path, Paths };
