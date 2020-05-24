<?php
class C_Privileges extends MY_privileges_Controller {
	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if($this->data['user_role'] == 'operator') {
			redirect('dashboard');
		} else {
			redirect('administration');
		}

	}
}
