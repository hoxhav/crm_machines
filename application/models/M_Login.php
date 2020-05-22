<?php
class M_Login extends MY_Model {

	public function insertUser($firstName, $lastName, $email, $userName, $password, $pharmacy) {
		$name = $firstName . ' ' . $lastName;
		return $this->getQueryResultArray("CALL sp_create_pharmacist('$name', '$email', '$userName', '$password', '$pharmacy');");
	}

	public function getUserData($u, $pw) {
		$query = $this->db->query("CALL sp_get_user_by_un_pw('$u','$pw');");
		return $query->result();
	}

	public function getUserDataById($id) {
		$query = $this->db->query("CALL sp_get_user_by_id('$id');");
		return $query->result();
	}
}

