<?php
class C_Administration_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Administration");
	}

	public function getUnavailableMachines() {
		echo json_encode($this->getQueryResultArray("SELECT * FROM gbfyzzmy_machine.machines WHERE available = 0;"));
	}

	public function activateMachine() {
		echo json_encode($this->M_Administration->activateMachine($this->input->post("machine_id"),$this->input->post("quantity")));
	}

	public function addOperator() {
		$pw  = hash("sha512", $this->input->post("password"));
		$operatorRes = $this->M_Administration->insertOperator($this->input->post("username"),$pw,$this->input->post("email"),$this->input->post("first_name"),$this->input->post("last_name"));
		echo json_encode($operatorRes);
	}

}
