<?php
class C_Panels_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Panel");
	}

	public function panels_list()
	{
		echo json_encode($this->M_Panel->getAllPanels());
	}

	 public function edit_panel($id)
	 {
		 $panel_id = filter_var($id,FILTER_SANITIZE_STRING);
		 echo json_encode($this->M_Panel->getPanel($panel_id));
	 }

	 public function update_panel(){
		$panel_name = filter_var($this->input->post('edit_panel_name'),FILTER_SANITIZE_STRING);
		$panel_id = filter_var($this->input->post('edit_panel_id'),FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Panel->updatePanel($panel_id, $panel_name));
	 }

	public function create_panel() {
		$name = filter_var($this->input->post('name'),FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Panel->createPanel($name));
	}

	public function delete_panel($id) {
		$panel_id = filter_var($id,FILTER_SANITIZE_STRING);
		echo json_encode($this->M_Panel->deletePanel($panel_id));
	}
}
