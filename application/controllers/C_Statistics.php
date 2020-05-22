<?php
class C_Statistics extends MY_statistics_controller {
	public function __construct()
	{
		parent::__construct();
		$this->loadPlugins();
	}

	public function index()
	{
		$this->data['container'] = $this->load->view('statistics/containers/statistics',  $this->data, true);
		$this->data['navigation'] = $this->load->view('navigation',  $this->data, true);

		array_push($this->data['css_ar'], "DataTables/datatables.css");
		array_push($this->data['js_ar'], "DataTables/datatables.js");
		array_push($this->data['js_ar'], "custom/statistics/statistics.js");
		$this->load->view('main-frame', $this->data);
	}

}
