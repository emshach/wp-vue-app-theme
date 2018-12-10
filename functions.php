<?php 

/**
 * THIS IS TO UPDATE THE POST / PAGE PREVIEW
 * USES THE COMPONENT "PREVIEW"
*/

$VERSION = '0.1.0';

//classe
// require_once 'lib/classes.php';

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

/**
 * END POST / PAGE PREVIEW
 * 
*/


/**
 * CHANGES URL PREFIX
 * TO MATCH OUR VUE ROUTE 
 * SO A PAGE WILL LOOK LIKE 
 * /post/post-name/
 * /page/page-name/
 * https://stackoverflow.com/questions/17613789/wordpress-rewrite-add-base-prefix-to-pages-only * 
 * 
 */

function change_base_permalinks() {
  global $wp_rewrite;
 
  // $wp_rewrite->permalink_structure = 'post/%postname%/';
  $wp_rewrite->page_structure = 'page/%pagename%';
  // $wp_rewrite->extra_permastructs['category']['struct'] = 'category/%category%';
  $wp_rewrite->flush_rules();
  // var_dump($wp_rewrite);exit;

  //look into this:
  //https://wordpress.stackexchange.com/questions/152306/change-permalinks-structure-for-specific-category

}
add_action('init','change_base_permalinks');



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
        if ( get_field( 'content_page', $item->object_id )
            && get_field( 'free', $item->object_id ))
            $item->classes[] = 'free';
        $img = get_field('menu_thumbnail', $item->object_id);
        $output[] = [
            'id' => $item->ID,
            'classes' => $item->classes,
            'title' => $item->title,
            'object' => $item->object,
            'object_id' => $item->object_id,
            'url' => $item->url,
            'thumb' => $img
        ];
    }
    return $output;
}

/**
 * get current user info
 */
function mrk_get_current_user_info() {
    if (! is_user_logged_in()) return '';
    $user = wp_get_current_user();
    return [
        'id' => $user->ID,
        'name' => $user->user_login,
        'first_name' => $user->user_firstname,
        'last_name' => $user->user_lastname,
        'display_name' => $user->display_name,
        'email' => $user->user_email,
        'membership' => ( $user->membership_level
                          ? $user->membership_level->name
                          : '' )
    ];
}

/**
* Fix the wordpress rest-api so we can just lookup pages by their full * path
*
* @return WP_Error|WP_REST_Response
*/
function mrk_get_post_by_path( $data ) {
    $post = get_page_by_path( $data['url'] );
    if ( empty( $post )) {
        return new WP_Error( 'mrk_no_suth_post', 'Path not found', [ 'status' => 404 ]);
    }
    // $request = new WP_REST_Request();
    // $controller = new WP_REST_Posts_Controller( $post->post_type );
    // $prepared = $controller->prepare_item_for_response( $post, $request);
    return $post;
}
/**
 * make the endpoint for fetching posts/pages by url 
 * /wp-json/mrk/v1
 */
function mrk_register_endpoint () {
    register_rest_route( 'mrk/v1', '/path/(?P<url>.+)', [
        'methods'  => 'GET',
	'callback' => 'mrk_get_post_for_url',
    ]);
}

add_filter( 'rest_allow_anonymous_comments','allow_anonymous_comments' );
add_action( 'rest_api_init', 'mrk_register_endpoint' );

/**
 * enqueue oficial wp api rest api js client and our js client
 */

wp_enqueue_script( 'wp-api' );
wp_enqueue_script( 'moonraker', get_theme_file_uri( '/js/moonraker.js' ),
                   [ 'wp-api' ], $VERSION, true ); // include in footer
$moonraker_local_vars = [
    'site' => [
        'title' => get_option('blogname'),
        'url' => get_site_url(),
        'description' => get_option('blogdescription'),
    ],
    'menus' => [
        'nav' => mrk_filter_menu_items( wp_get_nav_menu_items( 'nav' ))
    ],
    'user' =>  mrk_get_current_user_info()
];
wp_localize_script( 'moonraker', 'moonraker_local_vars', $moonraker_local_vars );
?>
