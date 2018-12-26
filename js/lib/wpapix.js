import wpapi from 'wpapi';
const Path = wpapi.models.Post.extend({
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

const Program = Path.extend({
  root: 'program'
});

const Release = Path.extend({
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

const Preview = Path.extend({
  root: 'preview'
});

const Membership = Path.extend({
  root: 'members'
});

wpapi.models.Path       = Path;
wpapi.models.Program    = Program;
wpapi.models.Release    = Release;
wpapi.models.Preview    = Preview;
wpapi.models.Membership = Membership;

export default { Path, Program, Release, Preview, Membership };
