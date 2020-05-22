<?php
class C_Questions extends MY_question_controller {
	public function __construct()
	{
		parent::__construct();
		$this->loadPlugins();
	}

    public function index(){
        $this->data['container'] = $this->load->view('questions/questions_list', $this->data, true);
        $this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
        
        array_push($this->data['css_ar'], "DataTables/datatables.css");
        array_push($this->data['js_ar'], "DataTables/datatables.js");
	 	array_push($this->data['js_ar'], "custom/questions.js");

        $this->load->view('main-frame', $this->data);
    }

	public function add_question() {
		$this->data['container'] = $this->load->view('questions/add_new_question', $this->data, true);
        $this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
	 	array_push($this->data['js_ar'], "custom/question_components/add_questions.js");

        $this->load->view('main-frame', $this->data);
	}

	public function edit_question(){
		$this->data['container'] = $this->load->view('questions/edit_question', $this->data, true);
        $this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
	 	array_push($this->data['js_ar'], "custom/question_components/edit_question.js");

        $this->load->view('main-frame', $this->data);
	}

}
