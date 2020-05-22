<?php
class C_Answers_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Answer");
    }
    
    public function get_answers($q_id){
        echo json_encode($this->M_Answer->getAnswers($q_id));
    }

    public function delete_answer($id){
        echo json_encode($this->M_Answer->deleteAnswer($id));
    }

    public function update_answer(){
        // var_dump($this->input->post());
        $answer_text = filter_var($this->input->post('answer_text'),FILTER_SANITIZE_STRING);
		$answer_id = filter_var($this->input->post('answer_id'),FILTER_SANITIZE_STRING);
        echo json_encode($this->M_Answer->updateAnswer($answer_id, $answer_text));	    
    }
}
