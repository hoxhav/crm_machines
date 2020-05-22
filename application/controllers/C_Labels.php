<?php
class C_Labels extends MY_label_controller {
	public function __construct()
	{
		parent::__construct();
		$this->loadPlugins();
	}

    public function index(){
        $this->data['container'] = $this->load->view('labels/labels_list', $this->data, true);
        $this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
        
        array_push($this->data['css_ar'], "DataTables/datatables.css");
        array_push($this->data['js_ar'], "DataTables/datatables.js");
	 	array_push($this->data['js_ar'], "custom/labels.js");

        $this->load->view('main-frame', $this->data);
    }

	public function add_label() {
		$this->data['container'] = $this->load->view('labels/add_new_label', $this->data, true);
        $this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
        array_push($this->data['js_ar'], "custom/labels.js");

        $this->load->view('main-frame', $this->data);
    }
    
    public function edit_label() {
		$this->data['container'] = $this->load->view('labels/edit_label', $this->data, true);
        $this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
        array_push($this->data['js_ar'], "custom/label_components/edit_label.js");

        $this->load->view('main-frame', $this->data);
    }

}
