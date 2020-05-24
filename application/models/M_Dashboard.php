<?php
class M_Dashboard extends MY_Model {
	public function insertMachine($car_code, $serial_number, $price, $picture, $quantity, $description) {
		return $this->getQueryResultArray("call sp_add_machine('$car_code', '$serial_number', '$price', '$picture', '$quantity', '$description')");
	}

	public function getAvailMachines() {
		return $this->getQueryResultArray("call sp_get_avilable_machines()");
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
}

