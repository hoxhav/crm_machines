<?php
class C_Administration extends MY_administration_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->loadPlugins();
	}

	public function index()
	{
		if($this->data['user_role'] == 'operator') {
			redirect('dashboard');
		}

		$this->data['container'] = $this->load->view('administration/administration',  $this->data, true);
		$this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
		array_push($this->data['js_ar'], "custom/administration.js");
		$this->load->view('main-frame', $this->data);
	}
}
