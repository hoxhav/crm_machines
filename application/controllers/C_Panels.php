<?php
class C_Panels extends MY_panel_controller {
	public function __construct()
	{
		parent::__construct();
		$this->loadPlugins();
		$this->load->model("M_Panel");

	}

    public function index(){
        $this->data['container'] = $this->load->view('panels/panels_list', $this->data, true);
        $this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
        
        array_push($this->data['css_ar'], "DataTables/datatables.css");
        array_push($this->data['js_ar'], "DataTables/datatables.js");
	 	array_push($this->data['js_ar'], "custom/panels.js");

        $this->load->view('main-frame', $this->data);
    }

	public function add_panel() {
		$this->data['container'] = $this->load->view('panels/add_new_panel', $this->data, true);
        $this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
	 	array_push($this->data['js_ar'], "custom/panels.js");

        $this->load->view('main-frame', $this->data);
	}

	public function edit_panel(){
		$this->data['container'] = $this->load->view('panels/edit_panel', $this->data, true);
        $this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
	 	array_push($this->data['js_ar'], "custom/panel_components/edit_panel.js");

        $this->load->view('main-frame', $this->data);
	}

}
