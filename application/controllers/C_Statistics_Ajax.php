<?php
class C_Statistics_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Statistics");
	}


	public function getPanels() {
		$this->load->model("M_Survey");

		echo json_encode($this->M_Survey->getPanels());
	}
}
