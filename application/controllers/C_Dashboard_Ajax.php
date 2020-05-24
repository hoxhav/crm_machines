<?php
class C_Dashboard_Ajax extends MY_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model("M_Dashboard");

	}

	public function logout() {
		set_cookie("session", "", "-1");
		delete_cookie("session");
		if (!isset($_COOKIE['session'])) {
			echo 0;
		}
	}

	public function addClient() {
		echo json_encode($this->M_Dashboard->addClient($this->input->post("company_name_add_client")));
	}

	public function editClient() {
		echo json_encode($this->M_Dashboard->editClient($this->input->post("client_id"), $this->input->post("new_company_name")));
	}

	public function editMachine($machine_id) {
		echo json_encode($this->M_Dashboard->editMachineForSelection($machine_id));
	}

	public function getClients() {
		echo json_encode($this->getQueryResultArray("SELECT * FROM gbfyzzmy_machine.clients;"));
	}

	public function deleteClient($client_id) {
		echo json_encode($this->M_Dashboard->delClient($client_id));
	}

	public function getAvailableMachines() {
		echo json_encode(array(
				"machine_data"=>$this->M_Dashboard->getAvailMachines(),
				"avail_machines" => $this->getQueryResultArray("	SELECT COUNT(available) AS 'avail_machines' FROM gbfyzzmy_machine.machines WHERE available = 1;"),
				"unavail_machines" => $this->getQueryResultArray("   SELECT COUNT(available) AS 'unavail_machines' FROM gbfyzzmy_machine.machines WHERE available = 0;"),
				"total_sale" => $this->getQueryResultArray(" SELECT COUNT(id) AS 'total_sales' FROM gbfyzzmy_machine.clients_has_machines;")
			)
		);
	}

	public function getMachineInfo($machine_id) {
		echo json_encode($this->M_Dashboard->getMachineInfo($machine_id));
	}

	public function deactivateMachine($machine_id) {
		echo json_encode($this->M_Dashboard->deactivateMachine($machine_id));
	}

	public function sellMachine() {
		echo json_encode($this->M_Dashboard->sellMachine($this->input->post("machine_id"), $this->input->post("client_id")));

	}

	public function sellMachineAppendData($machine_id) {
		echo json_encode(array(
			"serial_number" => $this->M_Dashboard->sellMachineAppendData($machine_id),
			"clients" => $this->getQueryResultArray("SELECT * FROM gbfyzzmy_machine.clients;")
		));

	}

	public function addMachine() {
		$sum = '';
		$file_name_attachment = '';
		$errors= array();

		if(isset($_FILES['picture_add_machine'])){
			$file_name = $_FILES['picture_add_machine']['name'];
			$file_size = $_FILES['picture_add_machine']['size'];
			$file_tmp = $_FILES['picture_add_machine']['tmp_name'];
			$file_type = $_FILES['picture_add_machine']['type'];
			$tmp = explode('.',$_FILES['picture_add_machine']['name']);
			$file_ext=strtolower(end($tmp));

			$extensions= array("jpeg","jpg","png");

			if(in_array($file_ext,$extensions)=== false){
				$errors[]="Extension not allowed, please choose a JPEG or PNG file.";
			}

			if($file_size > 2097152) {
				$errors[]='File size must be less than 2 MB';
			}

			if(empty($errors)==true) {
				$file_name = uniqid(). $file_name;
				$file_name_attachment = 'utility/images/machines/' . $file_name;
				move_uploaded_file($file_tmp,'utility/images/machines/'.basename($file_name));
			}
		}

		if(empty($errors)) {
			$machineRes = $this->M_Dashboard->insertMachine($_POST['machine_code_add_machine'], $_POST['serial_number_add_machine'], $_POST['price_add_machine'], $file_name_attachment,$_POST['quantity_add_machine'], $_POST['description_add_machine']);
			echo json_encode($machineRes);
		} else {
			echo json_encode($errors);
		}
	}

	public function editMachineData() {
		$file_name_attachment = 'N/A';
		$errors= array();

		if(isset($_FILES['picture_edit_machine'])){
			if($_FILES['picture_edit_machine']['size'] != 0) {
				$file_name = $_FILES['picture_edit_machine']['name'];
				$file_size = $_FILES['picture_edit_machine']['size'];
				$file_tmp = $_FILES['picture_edit_machine']['tmp_name'];
				$file_type = $_FILES['picture_edit_machine']['type'];
				$tmp = explode('.',$_FILES['picture_edit_machine']['name']);
				$file_ext=strtolower(end($tmp));

				$extensions= array("jpeg","jpg","png");

				if(in_array($file_ext,$extensions)=== false){
					$errors[]="Extension not allowed, please choose a JPEG or PNG file.";
				}

				if($file_size > 2097152) {
					$errors[]='File size must be less than 2 MB';
				}

				if(empty($errors)==true) {
					$file_name = uniqid(). $file_name;
					$file_name_attachment = 'utility/images/machines/' . $file_name;
					move_uploaded_file($file_tmp,'utility/images/machines/'.basename($file_name));
				}
			}
		}

		if(empty($errors)) {
			$machineRes = $this->M_Dashboard->editMachineData($_POST['id'],$_POST['machine_code_edit_machine'], $_POST['serial_number_edit_machine'], $_POST['price_edit_machine'], $file_name_attachment,$_POST['quantity_edit_machine'], $_POST['description_edit_machine']);
			echo json_encode($machineRes);
		} else {
			echo json_encode($errors);
		}
	}
}
