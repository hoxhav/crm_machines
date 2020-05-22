<?php
    class C_Patient_List extends MY_patient_Controller {
		public function __construct()
		{
			parent::__construct();
			$this->loadPlugins();
		}

		public function index()
		{
			$this->data['container'] = $this->load->view('patients/containers/patient_list',  $this->data, true);
			$this->data['navigation'] = $this->load->view('navigation',  $this->data, true);

			array_push($this->data['css_ar'], "DataTables/datatables.css");
			array_push($this->data['js_ar'], "DataTables/datatables.js");
			array_push($this->data['js_ar'], "custom/patient_list.js");
			$this->load->view('main-frame', $this->data);
		}

		public function new_patient() {
			$this->data['container'] = $this->load->view('patients/containers/add_new_patient',  $this->data, true);
			$this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
			array_push($this->data['js_ar'], "custom/patient_list.js");

			$this->load->view('main-frame', $this->data);
		}

    }
