<?php
    class C_Dashboard extends MY_dashbaord_Controller {
		public function __construct()
		{
			parent::__construct();
			$this->loadPlugins();
		}

		public function index()
		{
			$this->data['container'] = $this->load->view('dashboard/containers/dashboard',  $this->data, true);
			$this->data['navigation'] = $this->load->view('navigation',  $this->data, true);
			array_push($this->data['js_ar'], "custom/dashboard.js");
			$this->load->view('main-frame', $this->data);
		}
    }
