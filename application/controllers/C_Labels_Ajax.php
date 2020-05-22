<?php
class C_Labels_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Label");
	}

	public function labels_list()
	{
        $panel_id = $this->input->post('id');
		echo json_encode($this->M_Label->getLabels($panel_id));
	}

	public function edit_label($id)
	{
		$label_id = filter_var($id,FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Label->getLabel($label_id));	
	}

	public function update_label(){
		$panel_id = filter_var($this->input->post('panel_select'),FILTER_SANITIZE_STRING);
		$label_name = filter_var($this->input->post('edit_label_name'),FILTER_SANITIZE_STRING);
		$label_id = filter_var($this->input->post('edit_label_id'),FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Label->updateLabel($label_id, $label_name));	
	}

	public function create_label($id) {
        $label_id = filter_var($id,FILTER_SANITIZE_STRING);
		$name = filter_var($this->input->post('label_name'),FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Label->createLabel($name, $label_id));
	}

	public function delete_label($id) {
		$label_id = filter_var($id,FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Label->deleteLabel($label_id));
	}
}
