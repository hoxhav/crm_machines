<?php
    class C_Login_Ajax extends MY_Controller {
		public function __construct()
		{
			parent::__construct();
			$this->load->model("M_Login");
		}

    }
