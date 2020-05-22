<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class MY_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->data['css_ar'] = array();
        $this->data['js_ar'] = array();
		$this->data['fonts_ar'] = array();
		$this->data['version'] = '1.0.0';
		$this->data['title'] = "Welcome to Medic Panels";

		$this->output->set_header("Set-Cookie: key=value; path=/; domain=localhost; HttpOnly; SameSite=strict");
		$this->output->set_header('X-Frame-Options: DENY');
		$this->output->set_header('X-Content-Type-Options: nosniff');
		$this->output->set_header("X-XSS-Protection: 1; mode=block");


	}


	protected function checkUser()
	{
		if (!isset($_COOKIE['session'])) {
			redirect('login');
		} else {
			$c = json_decode(get_cookie('session'), true);
			$this->load->model("M_Login");
			$res = $this->M_Login->getUserDataById($c['u_d']);
			$this->data['profile_name'] = $res[0]->name;
			$this->data['profile_mail'] = $res[0]->email;
			$this->data['profile_id'] = $res[0]->id;
		}
	}

    protected function getQueryResultArray($query)
    {
        $q = $this->db->query($query);
        $r = $q->result_array();

        $q->next_result();
		$q->free_result();
        return $r;
    }

    protected function loadPlugins()
    {
        /*         * ******** JS ********* */
        array_push($this->data['js_ar'], "JQuery/jquery-3.4.1.min.js");
		array_push($this->data['js_ar'], "animsition/animsition.min.js");
		array_push($this->data['js_ar'], "popper/popper.min.js");
		array_push($this->data['js_ar'], "Bootstrap/bootstrap.min.js");
		array_push($this->data['js_ar'], "select2/select2.min.js");
		array_push($this->data['js_ar'], "daterangepicker/daterangepicker.js");
		array_push($this->data['js_ar'], "moment/moment.min.js");
		array_push($this->data['js_ar'], "sweetalert2/sweetalert2.all.min.js");
		array_push($this->data['js_ar'], "countdowntime/countdowntime.js");
		array_push($this->data['js_ar'], "custom/custom.js");


		/*         * **** CSS ******* */
        array_push($this->data['css_ar'], "Bootstrap/bootstrap.min.css");
		array_push($this->data['fonts_ar'], "font-awesome-4.7.0/css/font-awesome.min.css");
		array_push($this->data['fonts_ar'], "Linearicons-Free-v1.0.0/icon-font.min.css");
		array_push($this->data['fonts_ar'], "iconic/css/material-design-iconic-font.min.css");
		array_push($this->data['css_ar'], "animate/animate.css");
		array_push($this->data['css_ar'], "css-hamburgers/hamburgers.min.css");
		array_push($this->data['css_ar'], "animsition/animsition.min.css");
		array_push($this->data['css_ar'], "sweetalert2/sweetalert2.min.css");
		array_push($this->data['css_ar'], "select2/select2.min.css");
		array_push($this->data['css_ar'], "daterangepicker/daterangepicker.css");
		array_push($this->data['css_ar'], "custom/main.css");
		array_push($this->data['css_ar'], "custom/custom.css");
    }

}

class My_login_Controller extends MY_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->data['title'] = "Welcome to Medic Panels";
		//	$this->data['favicon']
		//	$this->data['module_ico']
		//	$this->data['profile_url']

		$this->checkUser();
	}
}


class MY_patient_Controller extends MY_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->data['title'] = "Patients queries";
		$this->checkUser();
	}
}


class MY_survey_controller extends MY_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->data['title'] = "Medic Panel Insertion";
		$this->checkUser();
	}
}

class MY_panel_controller extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->data['title'] = "Panels";
		$this->checkUser();
	}
}

class MY_label_controller extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->data['title'] = "Labels";
		$this->checkUser();
	}
}

class MY_question_controller extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->data['title'] = "Questions";
		$this->checkUser();
	}
}

class MY_statistics_controller extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->data['title'] = "Statistics";
		$this->checkUser();
	}
}
