<?php
    class C_Login_Ajax extends MY_Controller {
		public function __construct()
		{
			parent::__construct();
			$this->load->model("M_Login");
		}

		public function registerUser() {
			$this->M_Login->insertUser($this->input->post('firstname'), $this->input->post('lastname'), $this->input->post('email'), $this->input->post('username'), hash("sha512", $this->input->post('pass')), $this->input->post('pharmacy'));
		}

		public function getPharmacy() {
			echo json_encode($this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.pharmacy;"));
		}
    }
