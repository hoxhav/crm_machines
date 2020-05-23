<?php
class C_Dashboard_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Patient_List");
	}

	public function logout() {
		set_cookie("session", "", "-1");
		delete_cookie("session");
		if (!isset($_COOKIE['session'])) {
			echo 0;
		}
	}
}
