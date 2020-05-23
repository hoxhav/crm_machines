<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'C_Dashboard';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

$route['dashboard'] = 'C_Dashboard';
$route['survey'] = 'C_Survey';
$route['panels_list'] = 'C_Panels';
$route['labels_list'] = 'C_Labels';
$route['statistics'] = 'C_Statistics';
$route['login'] = 'C_Login';
$route['(:any)'] = 'C_Login/$1';
$route['login/(:any)/(:any)'] = 'C_Login/login/$1/$2';

$route['ajax/signupUser'] = 'C_Login_Ajax/registerUser';
$route['ajax/login_ajax/(:any)'] = 'C_Login_Ajax/$1';


/*Survey*/
$route['survey/(:any)'] = 'C_Survey/$1';
$route['survey/(:any)/(:any)'] = 'C_Survey/$1/$2';

$route['ajax/survey/(:any)'] = 'C_Survey_Ajax/$1';
$route['ajax/survey/(:any)/(:any)'] = 'C_Survey_Ajax/$1/$2';

/*End of Survey*/

/*Statistics*/
$route['statistics/(:any)'] = 'C_Statistics/$1';
$route['statistics/(:any)/(:any)'] = 'C_Statistics/$1/$2';

$route['ajax/statistics/(:any)'] = 'C_Statistics_Ajax/$1';
$route['ajax/statistics/(:any)/(:any)'] = 'C_Statistics_Ajax/$1/$2';

/*End of stats*/


/*Dashboard*/
$route['dashboard/(:any)'] = 'C_Dashboard/$1';

$route['ajax/dashboard/(:any)'] = 'C_Dashboard_Ajax/$1';
$route['ajax/dashboard/(:any)/(:any)'] = 'C_Dashboard_Ajax/$1/$2';
/*End of patient*/

// Panels
$route['panels_list/(:any)'] = 'C_Panels/$1';
$route['panels_list/(:any)/(:any)'] = 'C_Panels/$1/$2';


$route['ajax/panels/(:any)'] = 'C_Panels_Ajax/$1';
$route['ajax/panels_list/(:any)'] = 'C_Panels_Ajax/$1';
$route['ajax/panels_list/(:any)/(:any)'] = 'C_Panels_Ajax/$1/$2';

// End of panels

// Labels
$route['labels_list/(:any)'] = 'C_Labels/$1';
$route['labels_list/(:any)/(:any)'] = 'C_Labels/$1/$2';


$route['ajax/labels/(:any)/(:any)'] = 'C_Labels_Ajax/$1/$2';
$route['ajax/labels_list/(:any)'] = 'C_Labels_Ajax/$1';
$route['ajax/labels_list/(:any)/(:any)'] = 'C_Labels_Ajax/$1/$2';
// End of labels


// Questions
$route['questions_list/(:any)'] = 'C_Questions';
$route['questions_list/(:any)/(:any)'] = 'C_Questions/$1/$2';
$route['questions_list/questions_list/(:any)/(:any)'] = 'C_Questions/$1/$2';

$route['ajax/questions_list/(:any)'] = 'C_Questions_Ajax/$1';
$route['ajax/questions_list/(:any)/(:any)'] = 'C_Questions_Ajax/$1/$2';
// End of questions

// Answers

$route['ajax/answers_list/(:any)/(:any)'] = "C_Answers_Ajax/$1/$2";
$route['ajax/answers_list/(:any)'] = "C_Answers_Ajax/$1";
// End of answers
