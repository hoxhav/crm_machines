<?php
class M_Patient_List extends MY_Model {

	public function getAllPatients() {
		$q = $this->db->query("SELECT * FROM gbfyzzmy_medic_panels.patient;");
		$r = $q->result_array();
		return $r;
	}

	public function getPatientRecords($id) {
		$q = $this->db->query("CALL sp_get_patient_records_by_id('$id');");
		$r = $q->result_array();
		return $r;
	}

	public function createPatient($firstName,$lastName, $oib, $mbo, $age, $gender_select, $email, $phoneNumber,$city, $address, $zip) {
		$this->db->query("CALL sp_create_patient('$firstName','$lastName', '$oib', '$mbo', '$age', '$gender_select', '$email', '$phoneNumber','$city', '$address', '$zip')");
		return "success";
	}

	public function viewRecord($record_id) {
		return $this->getQueryResultArray("CALL sp_view_record_by_id('$record_id')");
	}

	public function getPatientsById($id) {
		return $this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.patient WHERE id = " .intval($id).";");
	}

	public function deleteRecord($id){
		$this->db->query("CALL sp_delete_record_by_id ('$id')");
		return "success";
	}

	public function deletePatient($id){
		$this->db->query("CALL sp_delete_patient_by_id ('$id')");
		return "success";
	}


}

