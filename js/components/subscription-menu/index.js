import store from '../../lib/store';
import axios from 'axios';
import _wpapix from '../../lib/wpapix';
export default {
  template: require( './template.html' ),
  props: {
    levels: {
      type: Array,
      default: () => []
    },
    target: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sstate: store.state,
      selectedLevel: false,
      storedLevels: false,
      wait: false,
      confirmed: false,
      fetching: false,
      order_fields: [
        { key:   'item',
          class: 'col-8'
        },
        { key:   'amount',
          label: 'Amount (USD)',
          class: 'col-4'
        }
      ],
      order: []
    };
  },
  mounted() {
    if (! this.levels.length )
      _wpapix.then( wpapix => {
        var levels = new wpapix.Membership({ path: 'levels' });
        levels.fetch().done( res => {
          console.log( 'got membership levels', res );
          this.storedLevels = res;
        });
      });
  },
  methods: {
    setLevel( level ) {
      if (! this.user ) {
        // redirect to login, then continue
      }
      this.selectedLevel = level;
      this.order = [{ item: level.name, amount: level.billing_amount },
                    { item: "Total",    amount: level.billing_amount,
                      _rowVariant: 'secondary' }];
    },
    unsetLevel() {
      this.selectedLevel = false;
    },
    getConfirmation( e, level ) {
      window.open('/members/checkout?level=' + this.selectedLevel.id
                  + '&submit-checkout=1&checkjavascript=1&javascriptok=1', '_blank' );
      _wpapix.then( wpapix => {
        var membership = new wpapix.Membership({ path: 'my-level' });
        this.fetching = false;
        this.wait = window.setInterval( () => {
          if ( this.fetching )
            return;
          this.fetching = true;
          membership.fetch({
            success: ( model, res, opt ) => {
              if ( res && res.id != this.currentLevel.id ) {
                this.confirmed = true;
                this.user.membership = res;
                window.clearInterval( this.wait );
                this.wait = false;
                window.setTimeout( () => { this.fetching = false; }, 250 );
              } else {
                this.fetching = false;
              }
            },
            error: ( model, res, opt ) => {
              this.fetching = false;
            }
          });
        }, 2500);
      });
    }
  },
  computed: {
    user() {
      return this.sstate.user;
    },
    memberLevels() {
      return ( this.levels.length ? this.levels : this.storedLevels );
    },
    currentLevel() {
      return this.user && this.user.membership || false;
    },
    targetPost() { return this.target; }
  }
};
