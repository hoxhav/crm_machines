<?php
class C_Survey_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Survey");
	}

	public function survey_questionarie()
	{

		echo json_encode(array(
				"users_info" =>	$this->M_Survey->getUsersInfo( $this->input->post('id'),$this->getUserId()),
				"panels" => $this->M_Survey->getPanels(),
				//"labels" => $this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.surv_panel_labels_questions WHERE surv_survey_panels_id = 1;")
			)
		);
	}


	public function panel_questions() {
		$panel_id = $this->input->post('id');
		echo json_encode(array(
				"labels" => $this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.surv_panel_labels_questions WHERE surv_survey_panels_id = '$panel_id';"),
				"questions"=> $this->getQueryResultArray("CALL sp_get_questions('$panel_id');"),
				"answers" => $this->getQueryResultArray("CALL sp_get_answers_for_questions('$panel_id');")
			)
		);
	}

	public function submitForm() {
		$returnData = 'success';
		foreach ($_POST as $key => $value) {
			if(!empty($value))  {
				//dirty fix for checkbox array answers :(
				if(strpos($value[0], "_")) {
					foreach($value as $cb ) {
						$cb_data = explode("_",$cb);
						$panel_id = intval($cb_data[0]);
						$label_id = intval($cb_data[1]);
						$question_id = intval($cb_data[2]);
						$patient_id = intval($cb_data[3]);
						$record_id = intval($cb_data[4]);
						$pharmacist_id = $this->getUserId();
						$id_answer = $cb_data[5];
						$answer_text = $cb_data[6];

						$this->db->query("CALL sp_insert_answers('$record_id','$patient_id','$pharmacist_id','$panel_id','$question_id', '$id_answer', '$answer_text');");

					}
				} else if(strpos($key, "alo")) {
					//dirty fix for radio button with other input
					$data = explode("_",$key);
					$panel_id = intval($data[1]);
					$label_id = intval($data[2]);
					$question_id = intval($data[3]);
					$patient_id = intval($data[4]);
					$record_id = intval($data[5]);

					$pharmacist_id = $this->getUserId();
					$id_answer = -1;
					$answer_text = $value;
					$this->db->query("CALL sp_insert_answers('$record_id','$patient_id','$pharmacist_id','$panel_id','$question_id', '$id_answer', '$answer_text');");

				} else {
					$data = explode("_",$key);
					$panel_id = intval($data[0]);
					$label_id = intval($data[1]);
					$question_id = intval($data[2]);
					$patient_id = intval($data[3]);
					$record_id = intval($data[4]);

					$pharmacist_id = $this->getUserId();



					$id_answer = '';
					$answer_text = "N/A";
					if(strpos($value, "$$")) {
						$answer_data = explode("$$",$value);
						$id_answer = $answer_data[0];
						$answer_text = $answer_data[1];
					} else {
						$id_answer = -1;
						$answer_text = $value;
					}
					$this->db->query("CALL sp_insert_answers('$record_id','$patient_id','$pharmacist_id','$panel_id','$question_id', '$id_answer', '$answer_text');");
				}
			}
		}

		echo json_encode($returnData);
	}

	private function getUserId() {
		$c = json_decode(get_cookie('session'), true);
		$id = $c['u_d'];
		$res = $this->getQueryResultArray("CALL sp_get_user_by_id('$id')");;
		return $res[0]['id'];
	}
}
