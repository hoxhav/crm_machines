<?php
class C_Patient_List_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Patient_List");
	}

	public function patient_list()
	{
		echo json_encode($this->M_Patient_List->getAllPatients());
	}

	public function patient_info_by_id($id)
	{
		echo json_encode($this->M_Patient_List->getPatientsById($id));
	}


	public function patient_records($id)
	{
		echo json_encode($this->M_Patient_List->getPatientRecords($id));
	}

	public function create_patient() {
		$firstName = filter_var($this->input->post('firstName'),FILTER_SANITIZE_STRING);
		$lastName = filter_var($this->input->post('lastName'),FILTER_SANITIZE_STRING);
		$oib = filter_var($this->input->post('oib'),FILTER_SANITIZE_NUMBER_INT);
		$mbo = filter_var($this->input->post('mbo'),FILTER_SANITIZE_NUMBER_INT);
		$age = filter_var($this->input->post('age'),FILTER_SANITIZE_NUMBER_INT);
		$gender_select = filter_var($this->input->post('gender-select'),FILTER_SANITIZE_STRING);
		$email = filter_var($this->input->post('email'),FILTER_SANITIZE_EMAIL);
		$phoneNumber = filter_var($this->input->post('phoneNumber'),FILTER_SANITIZE_NUMBER_INT);
		$city = filter_var($this->input->post('city'),FILTER_SANITIZE_STRING);
		$address = filter_var($this->input->post('address'),FILTER_SANITIZE_STRING);
		$zip = filter_var($this->input->post('zip'),FILTER_SANITIZE_NUMBER_INT);


		echo json_encode($this->M_Patient_List->createPatient($firstName,$lastName, $oib, $mbo, $age, $gender_select, $email, $phoneNumber,$city, $address, $zip ));
	}

	public function view_record($id) {
		$record_id = filter_var($id,FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Patient_List->viewRecord($record_id));
	}

	public function delete_record($id) {
		$record_id = filter_var($id,FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Patient_List->deleteRecord($record_id));
	}

	public function delete_patient($id) {
		$patient_id= filter_var($id,FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Patient_List->deletePatient($patient_id));
	}
}
