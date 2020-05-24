<?php
class C_Administration_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Administration");
	}

}
