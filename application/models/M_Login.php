<?php
class M_Login extends MY_Model {

	public function getUserData($u, $pw) {
		return $this->getQueryResultArray("CALL sp_get_user_by_un_pw('$u','$pw');");
	}

	public function getUserDataById($id) {
		return $this->getQueryResultArray("CALL sp_get_user_by_id('$id');");
	}
}

