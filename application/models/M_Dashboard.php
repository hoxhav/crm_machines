<?php
class M_Dashboard extends MY_Model {
	public function insertMachine($car_code, $serial_number, $price, $picture, $quantity, $description) {
		return $this->getQueryResultArray("call sp_add_machine('$car_code', '$serial_number', '$price', '$picture', '$quantity', '$description')");
	}

	public function editMachineData($id,$car_code, $serial_number, $price, $picture, $quantity, $description) {
		return $this->getQueryResultArray("call sp_edit_machine('$id','$car_code', '$serial_number', '$price', '$description','$quantity','$picture')");
	}

	public function getAvailMachines() {
		return $this->getQueryResultArray("call sp_get_avilable_machines()");
	}

	public function sellMachineAppendData($machine_id) {
		return $this->getQueryResultArray("call sp_get_serial_num_for_machine_sell('$machine_id')");
	}

	public function sellMachine($machine_id, $client_id) {
		$this->db->query("call sp_sell_machine_to_client('$machine_id', '$client_id')");
		return "success";
	}

	public function deactivateMachine($machine_id) {
		$this->db->query("call sp_deactivate_machine('$machine_id')");
		return "success";
	}

	public function addClient($company_name) {
		$this->db->query("call sp_add_client('$company_name')");
		return "success";
	}

	public function delClient($client_id) {
		$this->db->query("call sp_delete_client('$client_id')");
		return "success";
	}

	public function editClient($client_id, $company_name) {
		$this->db->query("call sp_edit_client('$client_id', '$company_name')");
		return "success";
	}

	public function editMachineForSelection($machine_id) {
		return $this->getQueryResultArray("call sp_get_machine_for_edit('$machine_id')");
	}
}

