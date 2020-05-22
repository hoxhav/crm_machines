<?php
class C_Questions_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Question");
		$this->load->model("M_Answer");
	}

    public function questions_list($id){
        // $panel_id = $this->M_Question->getParentLabel();
	    echo json_encode($this->M_Question->getQuestions($id));
	}

	public function question_category(){
		echo json_encode($this->M_Question->getCategories());
	}

	public function get_question($id){
		$question_id = filter_var($id, FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Question->getQuestion($id));
	}

	public function update_question(){
		$question_text = filter_var($this->input->post('question_text'),FILTER_SANITIZE_STRING);
		$question_id = filter_var($this->input->post('question_id'),FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Question->updateQuestion($question_id, $question_text));	
	}

	public function create_question($id){
		$label_id = filter_var($id, FILTER_SANITIZE_STRING);
		$question_text = filter_var($_POST['question_text'],FILTER_SANITIZE_STRING);
		$question_category = filter_var($_POST['category_select'],FILTER_SANITIZE_STRING);
		$question = $this->M_Question->addQuestion($label_id, $question_text, $question_category);
	//	$question[0]['last_inserted_question_id'] is the id
		// var_dump($question);
		if($_POST['answer_1'] != ""){
			foreach ($_POST as $key => $value) {
				if(strpos($key, "answer_") !== false){
					// var_dump($key);
					$answer_text = filter_var($value, FILTER_SANITIZE_STRING);
					$question_id = $question[0]['last_inserted_question_id'];
					$this->M_Answer->addAnswer($answer_text, $question_id);
					// $question->close();
					// $this->M_Answer->db->next_result();
				}
				// var_dump($key);
			}
		}
		// $label_id = filter_var($id,FILTER_SANITIZE_STRING);
		// $question_text = filter_var($this->input->post('question_text'),FILTER_SANITIZE_STRING);
		// $question_category = filter_var($this->input->post('category_select'),FILTER_SANITIZE_STRING);		
		echo json_encode("success");
	}

	public function delete_question($id){
		$question_id = filter_var($id,FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Question->deleteQuestion($question_id));
	}
	// public function patient_list()
	// {
	// 	echo json_encode($this->M_Patient_List->getAllPatients());
	// }

	// public function patient_records($id)
	// {
	// 	echo json_encode($this->M_Patient_List->getPatientRecords($id));
	// }

	// public function create_patient() {
	// 	$name = filter_var($this->input->post('name'),FILTER_SANITIZE_STRING);
	// 	echo json_encode($this->M_Patient_List->createPatient($name));
	// }

	// public function view_record($id) {
	// 	$record_id = filter_var($id,FILTER_SANITIZE_STRING);
	// 	echo json_encode($this->M_Patient_List->viewRecord($record_id));


	// }
}
