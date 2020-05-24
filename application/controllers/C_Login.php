<?php


class C_Login extends MY_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->loadPlugins();
	}

	public function index()
	{
		if (isset($_COOKIE['session'])) {
			$c = json_decode(get_cookie('session'), true);
			$this->load->model("M_Login");
			$res = $this->M_Login->getUserDataById($c['u_d']);
			if($res[0]['role_name'] == 'operator') {
				redirect('dashboard');
			} else {
				redirect('administration');
			}
		}

		if ($this->input->method() !== 'post') {
			//note: true makes the view to return as a string rather than sending it to browser
			$this->data['container'] = $this->load->view('login/containers/login', null, true);
			array_push($this->data['js_ar'], "custom/login.js");
			$this->data['navigation'] = '';

			$this->load->view('main-frame', $this->data);
		} else {
			$u = $this->input->post("username");
			$p = $this->input->post("password");
			$this->load->model("M_Login");
			$pw  = hash("sha512", $p);
			$u_data = $this->M_Login->getUserData($u,$pw);
			if (sizeof($u_data) == 1) {
				$u_id = $u_data[0]['id'];
				$cookie_data["session"] = $this->generateSession($u_data);
				$cookie_data["u_d"] = $u_id;
				set_cookie("session", json_encode($cookie_data), 60 * 60 * 24 * 365);
				redirect('redirecting');

			} else {
				echo 0;
			}
		}

	}

	private function generateSession($u_data)
	{
		return hash("sha512", $u_data[0]['id'] . $u_data[0]['username'] . $u_data[0]['email'] . time());
	}

}
