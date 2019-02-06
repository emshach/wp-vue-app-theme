<?php 

/**
 * THIS IS TO UPDATE THE POST / PAGE PREVIEW
 * USES THE COMPONENT "PREVIEW"
*/

$VERSION = '0.1.25';

//classe
// require_once 'lib/classes.php';

// change excerpt length so I can get some longer excerpts
function mrk_excerpt_length () {
    return 150;
}

//change preview post links - to match wpvue route
function new_preview_link() {
  $slug = basename(get_the_ID()); 
  $mydir = '/preview/'; 
  $mynewpurl = "$mydir$slug";
  return "$mynewpurl";
}
add_filter( 'preview_post_link', 'new_preview_link' );

//adding custom route for preview
add_action( 'rest_api_init', 'my_custom_endpoints' );

function my_custom_endpoints() { 
	register_rest_route( 'wpvue', '/preview', array(
        'methods' => 'GET',
        'callback' => 'post_preview_callback',
    ));
}

function post_preview_callback( $request_data ) { 
    // endpoint looks like: /wp-json/wpvue/preview?id=98
    $parameters = $request_data->get_params();
    $preview = wp_get_post_autosave($parameters[id]);

    $url = get_bloginfo('url').'/wp-json/wp/v2/posts?id='. $parameters[id]; 
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);

    $postarray = json_decode($result);

    if(count($postarray) > 0){     
      $postarray[0]->title->rendered =  $preview->post_title;
      $postarray[0]->content->rendered = $preview->post_content;  
    }else{
      throw new Exception('No record found'); 
    }
    return $postarray;
}

function prepare_rest($data,$post,$request){
  
  
  $_data = $data->data;

  
  //Categories
  $cats = get_the_category($post->ID);
  $_data['cats'] = $cats;



  //Back to data
  $data->data = $_data;
  return $data;
}
add_filter('rest_prepare_post', 'prepare_rest', 10,3);

//ADDS FILTER TO QUERY PARAMETER 

add_action( 'rest_api_init', 'rest_api_filter_add_filters' );

 /**
  * Add the necessary filter to each post type
  **/
function rest_api_filter_add_filters() {
	foreach ( get_post_types( array( 'show_in_rest' => true ), 'objects' ) as $post_type ) {
		add_filter( 'rest_' . $post_type->name . '_query', 'rest_api_filter_add_filter_param', 10, 2 );
	}
}

/**
 * Add the filter parameter
 *
 * @param  array           $args    The query arguments.
 * @param  WP_REST_Request $request Full details about the request.
 * @return array $args.
 **/
function rest_api_filter_add_filter_param( $args, $request ) {
	// Bail out if no filter parameter is set.
	if ( empty( $request['filter'] ) || ! is_array( $request['filter'] ) ) {
		return $args;
	}

	$filter = $request['filter'];

	if ( isset( $filter['posts_per_page'] ) && ( (int) $filter['posts_per_page'] >= 1 && (int) $filter['posts_per_page'] <= 100 ) ) {
		$args['posts_per_page'] = $filter['posts_per_page'];
	}

	global $wp;
	$vars = apply_filters( 'query_vars', $wp->public_query_vars );

	foreach ( $vars as $var ) {
		if ( isset( $filter[ $var ] ) ) {
			$args[ $var ] = $filter[ $var ];
		}
	}
	return $args;
}
/**
 * below will allow comments via rest api
 */
function allow_anonymous_comments() {
  return true;
}

/**
 * Filter array menu items for js output
 */
function mrk_filter_menu_items( $menu ) {
    if ( empty( $menu ))
        return [];
    $output = [];
    foreach( $menu as $item ) {
        if ( $item->post_status != 'publish' )
            continue;
        $oid = $item->object_id;
        if ( get_field( 'content_page', $oid ) && get_field( 'free', $oid ))
            $item->classes[] = 'free';
        $img = get_field( 'menu_thumbnail', $oid);
        $output[] = [
            'id'             => $item->ID,
            'classes'        => $item->classes,
            'title'          => $item->title,
            'object'         => $item->object,
            'object_id'      => $oid,
            'url'            => wp_make_link_relative( $item->url ),
            'message'        => get_field( 'thumbnail_message', $oid ),
            'message_mobile' => get_field( 'thumbnail_message_mobile', $oid ),
            'thumb'          => $img
        ];
    }
    return $output;
}

/**
 * get current user info
 */
function mrk_get_user_info( $user ) {
    if ( empty( $user )) return '';
    if ( is_int( $user ))
        $user = get_userdata( $user );
    if ( !$user || !$user->ID ) return '';
    return [
        'id'           => $user->ID,
        'name'         => $user->user_login,
        'first_name'   => $user->user_firstname,
        'last_name'    => $user->user_lastname,
        'display_name' => $user->display_name,
        'email'        => $user->user_email,
        'logout'       => wp_logout_url( home_url() ),
        'membership'   => (
            $user->membership_level && $user->membership_level->id
            ? [
                'id'    => $user->membership_level->id,
                'name'  => $user->membership_level->name,
                'debug' => $user->membership_level
            ]
            : false ),
        'as' => ( current_user_can( 'see_all_content' )
                  ? [
                      'logged_in'  => true,
                      'subscriber' => true,
                      'premium'    => true,
                      'admin'      => true,
                  ] : false )
    ];
}

function mrk_get_current_user_info() {
    if (! is_user_logged_in()) return '';
    $user = wp_get_current_user();
    return mrk_get_user_info( $user );
}

/**
 * get an array representing all the restrictions on an object
 */
function mrk_get_post_restrictions( $id, $type = 'post' ) {
    $restrictions = get_field( 'restrictions', $id );
    $data = [
        'public'     => false,
        'private'    => false,
        'auth'       => false,
        'members'    => false,
        'payperview' => false,
        'premium'    => false,
        'plus'       => false,
        'product'    => new stdClass,
        'users'      => [],
        'preview'    => get_field( 'preview_content', $id ),
        'show'       => get_field( 'can_see', $id )
    ];
    if (! $restrictions ) {
        $restrictions = [( $type == 'attachment' || $type == 'file' ) ? 'private'
                         : ( $type == 'post' ? 'members' : 'public') ];
    }
    foreach ( $restrictions as $key )
        $data[ $key ] = true;
    if ( $data[ 'private' ] || $data[ 'plus' ]) {
        $data[ 'users' ] = get_field( 'users_allowed', $id );
        if ( $data[ 'users' ])
            $data[ 'users' ] = array_map( function($u) { return (int) $u[ 'ID' ]; },
                                          $data[ 'users' ]);
        else
            $data[ 'users' ] = [];
    }
    if ( $data[ 'payperview' ])
        $data[ 'product' ] = get_field( 'associated_product', $id );

    return $data;
}

/**
 * Add background image to a post data object
 *
 * @return post array
 */
function mrk_rest_add_bg_image( $data ) {
    if (! is_array( $data ))
        return $data;
    if (! empty( $data[ 'featured_media' ]))
        $data[ 'background_image' ] = wp_get_attachment_url( $data[ 'featured_media' ]);
    if ( empty( $data[ 'background_image' ])) {
        $ancestors = get_post_ancestors( $data[ 'id' ]);
        if ( $ancestors )
            foreach( $ancestors as $post ) {
                $image = get_post_thumbnail_id( $post );
                if ( $image ) {
                    $data[ 'background_image' ] = wp_get_attachment_url( $image );
                    break;
                }
            }
    }
    return $data;
}

/**
 * Add a relative path for routing to a post data object
 *
 * @return post array
 */
function mrk_rest_add_rel_path( $data ) {
    if (! empty( $data[ 'link' ]))
        $data[ 'path' ] = wp_make_link_relative( $data[ 'link' ]);
    return $data;
}

/**
 * Add post object children to a single-page multi-post object
 *
 * @return post array
 */
function mrk_rest_add_children( $data ) {
    if ( empty( $data[ 'id' ]))
        return $data;
    if (! get_field( 'inline_page', $data[ 'id' ]))
        return $data;

    $posts = get_posts(
    [
        'post_type'   => [ 'page', 'post' ],
        'post_parent' => $data[ 'id' ],
        'post_status' => 'publish'
    ]);
    if ( empty( $posts )) {
        $data[ 'posts' ] = [];
        return $data;
    }
    foreach( $posts as $post ) {
        $postdata = mrk_rest_get_post( $post );
        $postdata = apply_filters( 'mrk_rest_process_post_child', $postdata );
        $data[ 'posts' ][] = $postdata;
    }
    return $data;
}

/**
 * Restrict content by stripping out data and returning an appropriate redirect url
 *
 * @return post array
 */
function mrk_rest_restrictions( $data ) {
    $rst = mrk_get_post_restrictions( $data[ 'id' ], $data[ 'type' ]);
    $user = wp_get_current_user();
    $membership = $user->membership_level
        ? $user->membership_level->name
        : '';
    $redir = '';
    $data[ 'restrictions' ] = $rst;
    if (! empty( $rst[ 'preview' ]))
        $data[ 'preview' ] = '/preview/' . $rst[ 'preview' ]->ID;
            // . wp_make_link_relative( get_permalink ( $rst[ 'preview' ]));
    if ( current_user_can( 'see_all_content' ) || $rst[ 'public' ])
        return $data;
    if ( in_array( $user->ID, $rst[ 'users' ]))
        return $data;
    if ( $rst[ 'premium' ] && preg_match( '/premium/i', $membership ))
        return $data;
    if ( $rst[ 'members' ] && preg_match( '/vip/i', $membership ))
        return $data;
    if ( $rst[ 'auth' ] && $user )
        return $data;
    if ( $rst[ 'payperview' ]) {
        $redir = wp_make_link_relative( $rst[ 'product' ]->link );
    } elseif ( $rst[ 'private' ]) {
        $redir = ( $rst[ 'show' ] ? '/private' : '/search' )
            . ( $data[ 'title' ]
                ? '/' . $data[ 'title' ][ 'rendered' ]
                : $data[ 'path' ]);
        // TODO: urlencode title
    } else {
        $redir = '/preview' . $data[ 'path' ];
    }
    if ( !$rst[ 'show' ])
        return new WP_Error(
            'mrk_access_denied', 'Nothing to see here',
            [ 'status' => 403,
              'redirect' => $redir ]);
    $stub = [ 'redirect' => $redir ];
    $keys = [ 'id', 'excerpt', 'path', 'background_image', 'menu_order', 'title',
              'author', 'debug', 'parent', 'thumbnail', 'caption', 'stats', 'my_xp',
              'type', 'release_type', 'media_type', 'slug', 'preview',
              'restrictions', 'release_number', 'release_date', 'episode_labels' ];
    // strip out some things (or only keep some things)
    foreach ( $keys as $key )
        if ( array_key_exists( $key, $data ))
            $stub[ $key ] = $data[ $key ];
    if ( array_key_exists( 'media_details', $data ))
        $stub[ 'media_details' ] = [
            'height' => $data[ 'media_details' ][ 'height' ],
            'width' => $data[ 'media_details' ][ 'width' ],
            'length' => $data[ 'media_details' ][ 'length' ],
            'length_formatted' => $data[ 'media_details' ][ 'length_formatted' ],
        ];
    return $stub;
}

/**
 * Add video-thumbnail-generator metadata
 *
 * @return post array
 */
function mrk_rest_add_kgvid_meta( $data ) {
    if (! function_exists( 'kgvid_get_attachment_meta' ))
        return $data;
    $data[ 'kgvid_meta' ] = kgvid_get_attachment_meta( $data[ 'id' ]);
    return $data;
}

/**
 * Add post metadata
 *
 * @return post array
 */
function mrk_rest_add_postmeta( $data ) {
    $data[ 'meta' ] = array_merge( $data[ 'meta' ], get_post_meta( $data[ 'id' ]));
    return $data;
}

/**
 * Add stats for (media) posts
 *
 * @return post array
 */
function mrk_rest_add_encoding_info( $data ) {
    if ( empty( $data[ 'id' ]))
        return $data;
    $formats = kgvid_video_formats();
    $info = kgvid_encodevideo_info( $data[ 'source_url' ], $data[ 'id' ]);
    foreach ( $info as $key => $val ) {
        if ( array_key_exists( $key, $formats )) {
            if ( $val[ 'exists' ])
                $data[ 'sources' ][ $key ] = [
                    'src'  => $val[ 'url' ],
                    'type' => $formats[ $key ][ 'mime' ]
                ];
        }
    }
    $data[ 'sources'][ 'default' ] = [
        'src' => $data[ 'source_url' ],
        'type' => $data[ 'mime_type' ]
    ];
    if (! empty( $info[ 'moviefilebasename' ]))
        $data[ 'basename' ] = $info[ 'moviefilebasename' ];
    return $data;
}
/**
 * Add stats for (media) posts
 *
 * @return post array
 */
function mrk_rest_add_stats( $data ) {
    $data[ 'stats' ] = [
        'seen'     => 0,
        'likes'    => 0,
        'dislikes' => 0,
        'favs'     => 0,
        'comments' => 0,
    ];
    $data[ 'my_xp' ] = [
        'seen'     => 0,
        'likes'    => 0,
        'dislikes' => 0,
        'favs'     => 0,
        'comments' => 0,
    ];
    // TODO: complete
    return $data;
}

/**
 * Add thumbnail to a media object
 *
 * @return post array
 */
function mrk_rest_add_thumbnail( $data ) {
    if ( empty( $data[ 'id' ]))
        return $data;
    $thumb_id = get_post_thumbnail_id( $data[ 'id' ]);
    if ( !$thumb_id )
        $thumb_id = $data[ 'id' ];
    $data[ 'thumbnail'] = wp_get_attachment_thumb_url( $thumb_id );
    if (! empty( $data[ 'thumbnail' ]))
        return $data;
    if (! empty( $data[ 'kgvid_meta' ]) && ! empty( $data[ 'kgvid_meta' ][ 'poster' ]))
        $data[ 'thumbnail' ] = $data[ 'kgvid_meta' ][ 'poster' ];
    return $data;
}

/**
 * Add whether to show the title/caption/description for the media item
 *
 * @return post array
 */
function mrk_rest_add_show_text( $data ) {
    if ( empty( $data[ 'id' ]))
        return $data;
    $data[ 'show_text'] = !get_field( 'no_text', $data[ 'id' ]);
    return $data;
}

/**
 * Add whether to show the title/caption/description for the media item
 *
 * @return post array
 */
function mrk_rest_add_release_number( $data ) {
    if ( empty( $data[ 'id' ]))
        return $data;
    $num = get_field( 'release_number', $data[ 'id' ]);
    $data[ 'release_number'] = ( $num ? (int) $num : 'UNNASIGNED' );
    return $data;
}

/**
 * Add the videos in the same series as a release
 *
 * @return post array
 */
function mrk_rest_add_release_series( $data ) {
    if ( empty( $data[ 'id' ]) && !isset( $data[ 'post'] ))
        return $data;
    $post = mrk_get_post_by_id( [ 'id' => $data[ 'post' ]]);
    mrk_add_media_collection( $post, 'releases' ); // TODO: if series
    $data[ 'series'] = $post[ 'releases' ];
    return $data;
}

/**
 * Set the type of a program object to 'program'
 *
 * @return post array
 */
function mrk_rest_set_program_type( $data ) {
    $data[ 'type' ] = 'program';
    return $data;
}

/**
 * Add a promo reel to a program page object
 *
 * @return post array
 */
function mrk_rest_add_promo_reel( $data ) {
    $collection = get_field( 'promo_reel', $data[ 'id' ]);
    if ( empty( $collection ))
        return $data;
    $posts = get_posts(
        [
            'post_type' => [ 'post', 'page', 'release', 'attachment' ],
            'nopaging'  => true,
            'orderby'   => 'menu_order',
            'order'     => 'ASC',
            'tax_query' => [
                [
                    'taxonomy' => $collection->taxonomy,
                    'field' => 'term_id',
                    'terms' => $collection->term_id,
                ]
            ]
        ]
    );
    if ( empty( $posts ))
        return $data;
    $data[ 'promo_reel' ] = [];
    foreach ( $posts as $post ) {
        if ( $post->post_type == 'attachment' )
            $postdata = mrk_rest_get_media( $post );
        else
            $postdata = mrk_rest_get_post( $post );
        if (! is_array( $postdata ))
            continue;
        $data[ 'promo_reel' ][] = $postdata;
    }
    return $data;
}

/**
 * Add member-only content to program pages
 *
 * @return post array
 */
function mrk_rest_add_member_content( $data ) {
    if ( empty( $data[ 'id' ]))
        return $data;
    $data[ 'member_content' ] = get_field( 'member_content', $data[ 'id' ]);
    return $data;
}

/**
 * Add the videos from a collection to the corresponding object element
 *
 * @return null
 */
function mrk_add_media_collection( &$postdata, $name, $debug = false ) {
    $collection = get_field( $name, $postdata[ 'id' ]);
    if ( empty( $collection )) return;
    // add the title for the collection
    $postdata[ 'title_' . $name ] = get_field( 'title_' . $name, $postdata[ 'id' ]);
    $posts = get_posts(
        [
            'post_type' => [ 'release', 'attachment' ],
            'nopaging' => true,
            'tax_query' => [
                [
                    'taxonomy' => $collection->taxonomy,
                    'field' => 'term_id',
                    'terms' => $collection->term_id,
                ]
            ]
        ]
    );
    if ( $debug ) {
        if (! isset( $postdata[ 'debug' ]))
            $postdata[ 'debug' ] = [];
        $postdata[ 'debug' ][ 'collection-' . $name ] = var_export( $collection, true );
        $postdata[ 'debug' ][ $name ] = var_export( $posts, true );
    }
    if ( empty( $posts )) return;
    $postdata[ $name ] = [];
    foreach ( $posts as $post ) {
        if ( $post->post_type == 'attachment' )
            $obj = mrk_rest_get_media( $post );
        else
            $obj = mrk_rest_get_post( $post );
        if (! is_array( $obj ))
            continue;
        $postdata[ $name ][] = $obj;
    }
}

/**
 * Add releases to a program page object
 *
 * @return post array
 */
function mrk_rest_add_releases( $data ) {
    // add the collections
    mrk_add_media_collection( $data, 'releases' );
    mrk_add_media_collection( $data, 'archives' );
    // and the release date
    $data[ 'release_date' ] = get_field( 'release_date', $data[ 'id' ]);
    $data[ 'episode_labels' ] = get_field( 'episode_labels', $data[ 'id' ]);
    $data[ 'hide_coming' ] = get_field( 'hide_coming', $data[ 'id' ]);
    $data[ 'hide_programs' ] = get_field( 'hide_programs', $data[ 'id' ]);
    if (! $data[ 'release_date' ])
        $data[ 'release_date' ] = '';
    return $data;
}

/**
 * Add a link to the full content from a preview
 *
 * @return post array
 */
function mrk_rest_add_full_content( $data ) {
    // add the collections
    $full = get_field( 'full_content', $data[ 'id' ]);
    if ( $full )
    $data[ 'full_content' ] = mrk_rest_get_media( $full );
    return $data;
}

/**
 *  Get post data, passing it through the rest controller
 *
 * @return post array
 */
function mrk_rest_get_post( $post ) {
    if ( empty( $post )) {
        return new WP_Error( 'mrk_no_such_post', 'Path not found', [ 'status' => 404 ]);
    }
    $request = new WP_REST_Request();
    $controller = new WP_REST_Posts_Controller( $post->post_type );
    $prepared = $controller->prepare_item_for_response( $post, $request);
    $result = apply_filters( 'mrk_rest_process_post', $prepared->data );
    return $result;
}

/**
 *  Get media data, passing it through the rest controller
 *
 * @return media array
 */
function mrk_rest_get_media( $post ) {
    if ( empty( $post )) {
        return new WP_Error( 'mrk_no_such_post', 'Path not found', [ 'status' => 404 ]);
    }
    $request = new WP_REST_Request();
    $controller = new WP_REST_Attachments_Controller( $post->post_type );
    $prepared = $controller->prepare_item_for_response( $post, $request);
    $result = apply_filters( 'mrk_rest_process_media', $prepared->data );
    return $result;
}

/**
 * Set the type of a release object to the appropriate type
 *
 * @return post array
 */
function mrk_rest_set_release_type( $data ) {
    if ( $data[ 'media_type' ] == 'image' )
        $data[ 'release_type' ] = 'image';
    elseif ( empty( $data[ 'mime_type' ]))
        $data[ 'release_type' ] = 'release';
    elseif ( preg_match( '/video/', $data[ 'mime_type' ]))
        $data[ 'release_type' ] = 'video';
    elseif ( preg_match( '/audio/', $data[ 'mime_type' ]))
        $data[ 'release_type' ] = 'audio';
    return $data;
}

/**
 * Remove redundant and possibly troublesome redirect
 *
 * @return post array
 */
function mrk_rest_rm_preview_redirect( $data ) {
    if (is_array( $data ) && isset( $data[ 'redirect' ])
       && $data[ 'redirect' ] == '/preview' + $data[ 'path' ])
        unset( $data[ 'redirect' ]);
    return $data;
}

/**
 * Fix the wordpress rest-api so we can just lookup pages by their full * path
 *
 * @return post array
 */
function mrk_get_post_by_path( $data ) {
    $post = get_page_by_path( $data[ 'path' ]);
    $result = mrk_rest_get_post( $post );
    if (! is_array( $result ))
        return $result;;
    $content = get_field( 'content_page', $result[ 'id' ]);
    if ( $result[ 'type' ] == 'page' && $content )
        $result = apply_filters( 'mrk_rest_process_program', $result );
    return $result;
}
/**
 * Get any post type by id
 *
 * @return post array
*/
function mrk_get_post_by_id( $data ) {
    $post = get_post( $data[ 'id' ]);
    $result = ( $post->post_type == 'attachment'
                ? mrk_rest_get_media( $post )
                : mrk_rest_get_post( $post ));
    return $result;
}
/**
 * Get the home page post
 *
 * @return post array
 */
function mrk_get_home_page( $data ) {
    $post_id = get_option( 'page_on_front');
    if ( empty( $post_id )) {
        return new WP_Error( 'mrk_no_home_page', 'Could not get home page',
                             [ 'status' => 404 ]);
    }
    $post = get_post( $post_id );
    $result = mrk_rest_get_post( $post );
    if ( is_array( $result ))
        $result = apply_filters( 'mrk_rest_process_home_page', $result );
    return $result;
}

/**
 * Get a program page by id
 *
 * @return post array
 */
function mrk_get_program_by_id( $data ) {
    $result = mrk_get_post_by_id( $data );
    $result = apply_filters( 'mrk_rest_process_program', $result );
    return $result;
}

/**
 * Get a program page by name
 *
 * @return post array
 */
function mrk_get_program_by_name( $data ) {
    $result = mrk_get_post_by_path( $data );
    $result = apply_filters( 'mrk_rest_process_program', $result );
    return $result;
}

/**
 * Get an release page by id
 *
 * @return array
 */
function mrk_get_release_by_id( $data ) {
    $result = mrk_get_post_by_id( $data );
    $result = apply_filters( 'mrk_rest_process_release', $result );
    return $result;
}

/**
 * Get an release page by program id
 *
 * @return array
 */
function mrk_get_release_by_program_id( $data ) {
    $releases = get_field( 'releases', $data[ 'id' ]);
    if ( empty( $releases ))
        return new WP_Error( 'mrk_no_releases', 'Got no releases for program',
                             [ 'status' => 404 ]);
    $posts = get_posts(
        [
            'post_type' => [ 'release', 'attachment' ],
            'nopaaging' => true,
            'orderby'   => 'menu_order',
            'order'     => 'ASC',
            'tax_query' => [
                [
                    'taxonomy' => 'attachment_category',
                    'field' => 'term_id',
                    'terms' => $releases->term_id,
                ]
            ]
        ]
    );
    if ( empty( $posts ))
        return new WP_Error( 'mrk_no_releases', 'Got no releases for program',
                             [ 'status' => 404 ]);
    if ( empty( $posts[ $data[ 'num' ]]))
        return new WP_Error( 'mrk_no_such_release',
                             'Could not get the requested release',
                             [ 'status' => 404 ]);
    $result = mrk_rest_get_media( $posts[ $data[ 'num' ]]);
    $result = apply_filters( 'mrk_rest_process_release', $result );
    return $result;
}

/**
 * Get an release page by program name
 *
 * @return array
 */
function mrk_get_release_by_program_name( $data ) {
    $post = get_page_by_path( $data[ 'program' ]);
    if ( empty( $post ))
        return new WP_Error( 'mrk_no_such_program',
                             'Could not get requested program',
                             [ 'status' => 404 ]);
    $data[ 'id' ] = $post->ID;
    return mrk_get_release_by_program_id( $data );
}

/**
 * Get an release page by program name and release name
 *
 * @return array
 */
function mrk_get_release_by_name( $data ) {
    $post = get_page_by_path( $data[ 'program' ]);
    if ( empty( $post ))
        return new WP_Error( 'mrk_no_such_program',
                             'Could not get requested program',
                             [ 'status' => 404 ]);
    $posts = get_posts(
    [
        'post_type'   => [ 'release', 'attachment' ],
        'post_parent' => $post->ID,
        'name'        => $data[ 'release' ],
        'post_status' => 'any'
    ]);
    if ( empty( $posts ))
        return new WP_Error( 'mrk_no_releases',
                             'Could not find the requested program release',
                             [ 'status' => 404,
                               'requested' => $data[ 'release' ]
                             ]);
    $result = mrk_rest_get_media( $posts[0] );
    $result = apply_filters( 'mrk_rest_process_release', $result );
    return $result;
}

/**
 * Get an release preview page by id
 *
 * @return array
 */
function mrk_get_preview_by_id( $data ) {
    $result = mrk_get_release_by_id( $data );
    if (! is_array( $result ))
        return $result;
    $result = apply_filters( 'mrk_rest_process_preview', $result );
    return $result;
}

/**
 * Get an release preview page by program id
 *
 * @return array
 */
function mrk_get_preview_by_program_id( $data ) {
    $result = mrk_get_release_by_program_id( $data );
    if (! is_array( $result ))
        return $result;
    $result = apply_filters( 'mrk_rest_process_preview', $result );
    return $result;
}

/**
 * Get an release preview page by program name
 *
 * @return array
 */
function mrk_get_preview_by_program_name( $data ) {
    $result = mrk_get_release_by_program_name( $data );
    if (! is_array( $result ))
        return $result;
    $result = apply_filters( 'mrk_rest_process_preview', $result );
    return $result;
}

/**
 * Get an release preview page by program name and release name
 *
 * @return array
 */
function mrk_get_preview_by_name( $data ) {
    if (! preg_match( '/-preview$/', $data[ 'release' ]))
        $data[ 'release' ] = $data[ 'release' ]. '-preview';
    $result = mrk_get_release_by_name( $data );
    if (! is_array( $result ))
        return $result;
    $result = apply_filters( 'mrk_rest_process_preview', $result );
    return $result;
}

/**
 * Get the latest releases
 *
 * @return post data array
 */
function mrk_get_latest( $data ) {
    return new WP_Error(
        'mrk_not_implemented',
        'Latest content is not yet implemented. Please try again later',
        [ 'status' => 404 ]);
}

/**
 * Get trending content
 *
 * @return post data array
 */
function mrk_get_trending( $data ) {
    return new WP_Error(
        'mrk_not_implemented',
        'Trending content is not yet implemented. Please try again later',
        [ 'status' => 404 ]);
}

/**
 * Get content by most recent activity
 *
 * @return post data array
 */
function mrk_get_recent( $data ) {
    return new WP_Error(
        'mrk_not_implemented',
        'Recent activity is not yet implemented. Please try again later',
        [ 'status' => 404 ]);
}

/**
 * Get content from the user's watch history
 *
 * @return post data array
 */
function mrk_get_watched( $data ) {
    return new WP_Error(
        'mrk_not_implemented',
        'Watch history is not yet implemented. Please try again later',
        [ 'status' => 404 ]);
}

/**
 * Use a discovery algorithm to suggest content
 *
 * @return post data array
 */
function mrk_get_discovery( $data ) {
    return new WP_Error(
        'mrk_not_implemented',
        'Content discovery is not yet implemented. Please try again later',
        [ 'status' => 404 ]);
}

/**
 * Get the user's marked favourites
 *
 * @return post data array
 */
function mrk_get_favourites( $data ) {
    return new WP_Error(
        'mrk_not_implemented',
        'Favourite content is not yet implemented. Please try again later',
        [ 'status' => 404 ]);
}

/**
 * Get the membership levels defined in the system
 *
 * @return membership levels array
 */
function mrk_get_membership_levels( $data ) {
    $pmpro_levels = pmpro_getAllLevels(false, true);
    return $pmpro_levels;
}

/**
 * Get the membership levels defined in the system
 *
 * @return membership levels array
 */
function mrk_get_current_membership_level( $data ) {
    $user = wp_get_current_user();
    $membership = $user->membership_level;
    return $membership;
}

/**
 * Make the endpoint for fetching posts/pages by path
 *
 * /wp-json/mrk/v1
 */
function mrk_register_endpoint () {
    // home page
    register_rest_route( 'mrk/v1', '/path/', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_home_page',
    ]);

    // post
    register_rest_route( 'mrk/v1', '/path/(?P<id>\d+)', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_post_by_id',
    ]);
    register_rest_route( 'mrk/v1', '/path/(?P<path>.+)', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_post_by_path',
    ]);

    // program
    register_rest_route( 'mrk/v1', '/program/(?P<id>\d+)', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_program_by_id',
    ]);
    register_rest_route( 'mrk/v1', '/program/(?P<path>.+)', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_program_by_name',
    ]);

    // release
    register_rest_route( 'mrk/v1', '/release/(?P<id>\d+)', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_release_by_id',
    ]);
    register_rest_route( 'mrk/v1', '/release/(?P<id>\d+/(?P<num>\d+))', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_release_by_program_id',
    ]);
    register_rest_route( 'mrk/v1', '/release/(?P<program>.+?)/(?P<num>\d+)', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_release_by_program_name',
    ]);
    register_rest_route( 'mrk/v1', '/release/(?P<program>.+?)/(?P<release>.+)', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_release_by_name',
    ]);

    // preview
    register_rest_route( 'mrk/v1', '/preview/(?P<id>\d+)', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_preview_by_id',
    ]);
    register_rest_route( 'mrk/v1', '/preview/(?P<id>\d+/(?P<num>\d+))', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_preview_by_program_id',
    ]);
    register_rest_route( 'mrk/v1', '/preview/(?P<program>.+?)/(?P<num>\d+)', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_preview_by_program_name',
    ]);
    register_rest_route( 'mrk/v1', '/preview/(?P<program>.+?)/(?P<release>.+)', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_preview_by_name',
    ]);

    // usage-related
    register_rest_route( 'mrk/v1', '/latest', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_latest',
    ]);
    register_rest_route( 'mrk/v1', '/trending', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_trending',
    ]);
    register_rest_route( 'mrk/v1', '/recent', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_recent',
    ]);
    register_rest_route( 'mrk/v1', '/watched', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_watched',
    ]);
    register_rest_route( 'mrk/v1', '/discover', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_discovery',
    ]);
    register_rest_route( 'mrk/v1', '/favourites', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_favourites',
    ]);
    register_rest_route( 'mrk/v1', '/members/levels', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_membership_levels',
    ]);
    register_rest_route( 'mrk/v1', '/members/my-level', [
        'methods'  => 'GET',
        'callback' => 'mrk_get_current_membership_level',
    ]);
}

/**
 * enqueue oficial wp api rest api js client and our js client
 *
 * add all the fancy stuff on NON-ADMIN pages only to avoid absolutely smashing
 * history function. I'd like to find out why this happened in the first place.
 */
function mrk_enqueue_scripts() {
    global $VERSION, $wp_scripts;
    if ( is_admin() )
        return;
    wp_enqueue_script( 'wp-api-request' );
    wp_enqueue_script( 'wp-api' );
    wp_enqueue_script(
        'grunion-frontend',
        Jetpack::get_file_url_for_environment(
            '_inc/build/contact-form/js/grunion-frontend.min.js',
            'modules/contact-form/js/grunion-frontend.js'
        ), [ 'jquery', 'jquery-ui-datepicker' ]);

    wp_enqueue_script(
        'grunion',
        Jetpack::get_file_url_for_environment(
            '_inc/build/contact-form/js/grunion.min.js',
            'modules/contact-form/js/grunion.js'
        ), [ 'grunion' ]);

    // fix api settings, re-create rest nonce
    $user = wp_get_current_user();
    $data = $wp_scripts->get_data('wp-api-request', 'data');
    if (! is_array( $data )) {
        $data = json_decode( str_replace( 'var wpApiSettings = ', '',
                                          substr($data, 0, -1)), true);
    }
    $data[ 'nonce' ] = wp_create_nonce( 'wp_rest' );
    $wp_scripts->add_data('wp-api-request', 'data', '');
    wp_localize_script( 'wp-api-request', 'wpApiSettings', $data );

    // back to our regularly scheduled programming
    wp_enqueue_script( 'moonraker', get_theme_file_uri( '/js/moonraker.js' ),
                       [ 'wp-api', 'jquery', 'jquery-effects-core', 'grunion' ],
                       filemtime( get_template_directory() . '/js/moonraker.js' ),
                       true ); // include in footer
    $moonraker_local_vars = [
        'site' => [
            'title' => get_option('blogname'),
            'url' => get_site_url(),
            'description' => get_option('blogdescription'),
        ],
        'menus' => [
            'nav' => mrk_filter_menu_items( wp_get_nav_menu_items( 'nav' )),
            'site' => mrk_filter_menu_items( wp_get_nav_menu_items( 'site-links' ))
        ],
        'user'          =>  mrk_get_current_user_info(),
        'recaptcha_key' => get_option( 'wr_no_captcha_site_key' ),
        'login'         => LoginWithAjax::$url_login,
        'register'      => LoginWithAjax::$url_register,
        'ajax'          => [
            'url' => admin_url( 'admin-ajax.php' ),
            'sec' => wp_create_nonce( 'wp-bsh-ajax-security' )],
    ];
    wp_localize_script( 'moonraker', 'moonraker_local_vars', $moonraker_local_vars );
}

/**
 * enqueue theme styles
 */
function mrk_enqueue_styles() {
    global $VERSION;
    $uri = get_template_directory_uri();
    wp_enqueue_style( 'mrk-bootstrap', $uri . '/css/dist/bootstrap.css' );
    wp_enqueue_style( 'mrk-bootstrap-grid', $uri . '/css/dist/bootstrap-grid.css' );
    wp_enqueue_style( 'mrk-bootstrap-reboot', $uri . '/css/dist/bootstrap-reboot.css' );
    wp_enqueue_style( 'moonraker-dependencies', $uri . '/js/moonraker.css', [],
                      filemtime( get_template_directory() . '/js/moonraker.css' ));
    wp_enqueue_style( 'grunion.css' );
    wp_enqueue_style( 'main-styles', $uri . '/style.css', [],
                      filemtime( get_template_directory() . '/style.css' ), false);
}

function mrk_widgets_init() {
	register_sidebar(
        [
            'name'          => 'Top Banner',
            'id'            => 'top-anner',
            'before_widget' => '<div id="%1$s" class="banner widget %2$s">',
            'after_widget'  => '</div>',
        ]);
}

function mrk_register_menus() {
    register_nav_menus(
    array(
      'nav'    => __( 'Main Nav Menu' ),
      'coming' => __( 'Upcoming Content' ),
      'links'  => __( 'Site Links' )
    )
  );
}

function mrk_send_login_token( $email, $uid = 0, $res ) {
    $nonce = wp_create_nonce( 'wpa_passwordless_login_request' );
    $uri = $_SERVER[ 'REQUEST_URI' ];
    // Hack REQUEST_URI because passwordless-login plugin does some _garbage_
    $_SERVER[ 'REQUEST_URI' ] = wp_get_referer(); // MWAHAHAHAHA
    $link = wpa_send_link( $email, $nonce );
    $_SERVER[ 'REQUEST_URI' ] = $uri;
    if ( !$uid )
        return $link;
    if ( is_wp_error( $link )) {
        $res[ 'next' ] = 'error';

        $res[ 'error' ] = $link;
    } else {
        $res[ 'next' ] = 'link-sent';
        $res[ 'uid' ] = $uid;
    }
    return $res;    
}

function mrk_ajax_login() {
    check_ajax_referer( 'wp-bsh-ajax-security', 'sec_token' );
    // TODO: check recaptcha
    $login = ( isset( $_REQUEST[ 'login' ]) ? $_REQUEST[ 'login' ] : '' );
    $email = ( isset( $_REQUEST[ 'email' ]) ? $_REQUEST[ 'email' ] : '' );
    $pass  = ( isset( $_REQUEST[ 'pass' ])  ? $_REQUEST[ 'pass' ]  : '' );
    $token = filter_var( isset( $_REQUEST[ 'token' ]) ? $_REQUEST[ 'token' ] : '',
                         FILTER_VALIDATE_BOOLEAN );
    $res = [];
    if ( preg_match( '/.+@.+\..+/', $login )) {
        $email = $login;
        $login = '';
    }
    if ( $email ) {
        if ( $uid = email_exists( $email )) {
            if ( $token ) {
                // passwordless-login to email
                $res = mrk_send_login_token( $email, $uid, $res );
            } elseif ( $pass ) {
                $user = wp_signon([ 'user_login'    => $email,
                                    'user_password' => $pass,
                                    'remember'      => true ], false );
                if ( is_wp_error( $user )) {
                    // wrong password
                    $res[ 'next' ] = 'wrong-password';
                    $res[ 'error' ] = $user;
                } else {
                    // success, logged in
                    $res[ 'next' ] = 'success';
                    $res[ 'user' ] = mrk_get_user_info( $user );
                }
            } else {
                // wrong password
                $res[ 'next' ] = 'wrong-password';
            }
        } else
            $res[ 'next' ] = 'not-registered';
    } elseif ( $login ) {
        if ( $uid = username_exists( $login )) {
            if ( $token ) {
                // passwordless-login
                $res = mrk_send_login_token( $login, $uid, $res );
            } elseif ( $pass ) {
                $user = wp_signon([ 'user_login'    => $login,
                                    'user_password' => $pass,
                                    'remember'      => true ], false );
                if ( is_wp_error( $user )) {
                    // wrong password
                    $res[ 'next' ] = 'wrong-password';
                    $res[ 'error' ] = $user;
                } else {
                    // success, logged in
                    $res[ 'next' ] = 'success';
                    $res[ 'user' ] = mrk_get_user_info( $user );
                }
            } else {
                // wrong password
                $res[ 'next' ] = 'wrong-password';
            }
        } else
            $res[ 'next' ] = 'not-registered';
    } else {
        // no login given, what?
        $res[ 'next' ] = 'error';
    }
    echo json_encode( $res );
    wp_die();
}

function mrk_ajax_register() {
    check_ajax_referer( 'wp-bsh-ajax-security', 'sec_token' );
    // TODO: check recaptcha
    $login = ( isset( $_REQUEST[ 'login' ]) ? $_REQUEST[ 'login' ] : '' );
    $email = ( isset( $_REQUEST[ 'email' ]) ? $_REQUEST[ 'email' ] : '' );
    $pass  = ( isset( $_REQUEST[ 'pass' ])  ? $_REQUEST[ 'pass' ]  : '' );
    $token = filter_var( isset( $_REQUEST[ 'token' ]) ? $_REQUEST[ 'token' ] : '',
                         FILTER_VALIDATE_BOOLEAN );
    $confirm = filter_var( isset( $_REQUEST[ 'confirm' ]) ? $_REQUEST[ 'confirm' ] : '',
                           FILTER_VALIDATE_BOOLEAN );
    $res = [];
    if ( $uid = email_exists( $email )) {
        if ( $pass ) {
            $user = wp_signon([ 'user_login'    => $email,
                                'user_password' => $pass,
                                'remember'      => true ], false );
            if ( is_wp_error( $user )) {
                if ( $confirm ) {
                    $res[ 'next' ] = 'forgot-password';
                } else
                    // user exists, wrong password
                    $res[ 'next' ] = 'email-exists';
            } else {
                // success, logged in
                $res[ 'next' ] = 'success';
                $res[ 'user' ] = mrk_get_user_info( $user );
            }
        } elseif ( $token ) {
            if ( $confirm )
                $res = mrk_send_login_token( $email, $uid, $res );
            else
                $res[ 'next' ] = 'email-exists';
        } else
              $res[ 'next' ] = 'email-exists';
    } elseif( username_exists( $login )) {
        // username exists
        $res[ 'next' ] = 'user-exists';
    } elseif ( $pass ) {
        // register new user with password
        $uid = wp_create_user( $login, $pass, $email );
        if ( is_wp_error( $uid )) {
            $res[ 'next' ] = 'error';
            $res[ 'error' ] = $uid;
        } else {
            wp_new_user_notification( $uid, null, 'both' );
            $user = wp_signon([ 'user_login'    => $email,
                                'user_password' => $pass,
                                'remember'      => true ], false );
            $res[ 'next' ] = 'success-email';
            if (! is_wp_error( $user ))
                $res[ 'user' ] = mrk_get_user_info( $user );
        }
    } else {
        // register default
        $uid = register_new_user( $login, $email );
        if ( is_wp_error( $uid )) {
            $res[ 'next' ] = 'error';
            $res[ 'error' ] = $uid;
        } else {
            wp_new_user_notification( $uid, null, 'both' );
            $res[ 'next' ] = 'success-email';
        }
    }
    echo json_encode( $res );
    wp_die();
}

function mrk_add_menu_order() {
    add_post_type_support( 'post', 'page-attributes' );
    add_post_type_support( 'release', 'page-attributes' );
    add_post_type_support( 'attachment', 'page-attributes' );
}

add_theme_support( 'post-thumbnails'                                               );
add_action( 'rest_api_init',                 'mrk_register_endpoint'               );
add_action( 'wp_enqueue_scripts',            'mrk_enqueue_scripts'                 );
add_action( 'wp_enqueue_scripts',            'mrk_enqueue_styles',          999    );
add_action( 'init',                          'mrk_register_menus'                  );
add_action( 'init',                          'mrk_add_menu_order'                  );
add_action( 'widgets_init',                  'mrk_widgets_init'                    );
add_action( 'wp_ajax_mrklogin',              'mrk_ajax_login'                      );
add_action( 'wp_ajax_mrkregister',           'mrk_ajax_register'                   );
add_action( 'wp_ajax_nopriv_mrklogin',       'mrk_ajax_login'                      );
add_action( 'wp_ajax_nopriv_mrkregister',    'mrk_ajax_register'                   );
add_filter( 'excerpt_length',                'mrk_excerpt_length',          999    );
add_filter( 'rest_allow_anonymous_comments', 'allow_anonymous_comments'            );
add_filter( 'mrk_rest_process_post',         'mrk_rest_add_bg_image',        10, 1 );
add_filter( 'mrk_rest_process_post',         'mrk_rest_add_rel_path',        10, 1 );
add_filter( 'mrk_rest_process_post',         'mrk_rest_add_children',       999, 1 );
add_filter( 'mrk_rest_process_post',         'mrk_rest_restrictions',       999, 1 );
add_filter( 'mrk_rest_process_media',        'mrk_rest_add_rel_path',        10, 1 );
add_filter( 'mrk_rest_process_media',        'mrk_rest_restrictions',       999, 1 );
add_filter( 'mrk_rest_process_media',        'mrk_rest_add_kgvid_meta',      10, 1 );
add_filter( 'mrk_rest_process_media',        'mrk_rest_add_stats',           10, 1 );
add_filter( 'mrk_rest_process_media',        'mrk_rest_add_encoding_info',   10, 1 );
add_filter( 'mrk_rest_process_media',        'mrk_rest_add_thumbnail',       11, 1 );
add_filter( 'mrk_rest_process_media',        'mrk_rest_add_show_text',       11, 1 );
add_filter( 'mrk_rest_process_media',        'mrk_rest_set_release_type',    10, 1 );
add_filter( 'mrk_rest_process_media',        'mrk_rest_add_release_number',  10, 1 );
add_filter( 'mrk_rest_process_media',        'mrk_rest_add_full_content',    10, 1 );
add_filter( 'mrk_rest_process_home_page',    'mrk_rest_add_promo_reel',      10, 1 );
add_filter( 'mrk_rest_process_program',      'mrk_rest_set_program_type',    10, 1 );
add_filter( 'mrk_rest_process_program',      'mrk_rest_add_promo_reel',      10, 1 );
add_filter( 'mrk_rest_process_program',      'mrk_rest_add_member_content',  10, 1 );
add_filter( 'mrk_rest_process_program',      'mrk_rest_add_releases',        10, 1 );
add_filter( 'mrk_rest_process_release',      'mrk_rest_add_bg_image',        10, 1 );
add_filter( 'mrk_rest_process_release',      'mrk_rest_set_release_type',    10, 1 );
add_filter( 'mrk_rest_process_release',      'mrk_rest_add_release_number',  10, 1 );
add_filter( 'mrk_rest_process_release',      'mrk_rest_add_release_series',  10, 1 );
add_filter( 'mrk_rest_process_preview',      'mrk_rest_rm_preview_redirect', 10, 1 );
add_filter( 'mrk_rest_process_preview',      'mrk_rest_add_full_content',    10, 1 );

?>
