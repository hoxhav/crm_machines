<?php
class M_Administration extends MY_Model {

	public function activateMachine($machine_id, $quantity) {
		$this->db->query("call sp_activate_machine('$machine_id', '$quantity')");
		return "success";
	}

	public function insertOperator($username, $password, $email, $first_name, $last_name) {
		$this->db->query("call sp_add_operator('$username', '$password', '$email', '$first_name', '$last_name')");
		return "success";
	}
}
