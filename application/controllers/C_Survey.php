<?php
class C_Survey extends MY_survey_controller {
	public function __construct()
	{
		parent::__construct();
		$this->loadPlugins();
	}

	public function add_record($id) {
		$this->data['container'] = $this->load->view('survey/containers/survey',  $this->data, true);
		$this->data['navigation'] = $this->load->view('navigation',  $this->data, true);

		array_push($this->data['js_ar'], "custom/survey.js");
		array_push($this->data['js_ar'], "custom/panels_conditions/pp.js");
		$this->load->view('main-frame', $this->data);
	}

}
