<?php
require_once ('Exel/PHPExcel.php');

class C_Export_Excel_ajax extends MY_Controller
{
	private $objPHPExcel, $panel_id;
	private $row = 1;
	public function __construct()
	{
		parent::__construct();
	}

	public function generateExcelExport($panel_id){
		$user_directory = "files\\";
		if (!file_exists("files")) {
			mkdir('files', 0777);
			mkdir($user_directory, 0777);
		} else {
			if (!file_exists($user_directory)) {
				mkdir($user_directory, 0777);
			}

			$files = glob($user_directory . '/*');
			foreach ($files as $file) {
				if (is_file($file))
					unlink($file);
			}
		}
		$finFile = $this->generate_report($this->getSummaryData($panel_id), $panel_id, $user_directory);
		echo json_encode($finFile);
	}


	private function getSummaryData($panel_id){
		$result = array();
		$users_per_panel = $this->getQueryResultArray("call sp_excel_get_users_per_panel('$panel_id')");
		for($i = 0; $i < count($users_per_panel); $i++) {
			$pat_id = $users_per_panel[$i]['id_patient'];
			$panel_rest = $this->getQueryResultArray("call sp_excel_get_answer_report('$panel_id','$pat_id')");
			$result[$i . '_answers'] = $panel_rest;
		}

		$answers_of_panel = $this->getQueryResultArray("call sp_excel_get_questions_per_panel('$panel_id');");
		return array(
			"questions" => $answers_of_panel,
			"answers"=>$result
		);
	}

	private function generate_report($data, $panel_id, $user_directory) {
		$this->panel_id = $panel_id;
		$this->objPHPExcel = new PHPExcel();
		$this->setUpNewSheet(0);
		$this->generate_medic_report_panel($data['questions'], $data['answers']);

		$name = "Medic_Panels_Report_" . $this->panel_id  ."_" .time() ."_".date("Y-m-d", strtotime("now")). ".xlsx";
		$user_directory = substr($user_directory, 0, -1);
		$filename = $user_directory . "//" . $name;
		$this->objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel2007');
		$this->objWriter->save($filename);
		return $name;
	}

	private function generate_medic_report_panel($questions, $answers) {
		$remaining_letters = array();
		$questions_arr = array();
		$this->objPHPExcel->getActiveSheet()->setCellValue('A' . $this->row, '#');
		$this->objPHPExcel->getActiveSheet()->setCellValue('B' . $this->row, 'Pharmacy Code');
		$this->objPHPExcel->getActiveSheet()->setCellValue('C' . $this->row, 'Pharmacist Code');
		$this->objPHPExcel->getActiveSheet()->setCellValue('D' . $this->row, 'Patient OIB');
		$this->objPHPExcel->getActiveSheet()->setCellValue('E' . $this->row, 'Panel Name');

		if(!empty($questions)) {
			for($i = 0; $i < count($questions); $i++) {
				$letter = $this->getLetterFromNumber($i + 6);
				$this->objPHPExcel->getActiveSheet()->setCellValue($letter . $this->row, $questions[$i]['question_text']);
				array_push($remaining_letters,$letter);
				array_push($questions_arr, $questions[$i]['id']);

			}
		} else {
			$this->objPHPExcel->getActiveSheet()->setCellValue('E' . $this->row, 'N/A');
		}

		$this->row++;
		$index = 1;
		if(!empty($answers)) {
			foreach($answers as $answer) {
				for($i = 0; $i < count($answer); $i++) {
					$this->objPHPExcel->getActiveSheet()->setCellValue('A' . $this->row, $index);
					$this->objPHPExcel->getActiveSheet()->setCellValue('B' . $this->row, $answer[0]['pharmacy_code']);
					$this->objPHPExcel->getActiveSheet()->setCellValue('C' . $this->row, $answer[0]['pharmacist_code']);
					$this->objPHPExcel->getActiveSheet()->setCellValue('D' . $this->row, $answer[0]['oib']);
					$this->objPHPExcel->getActiveSheet()->setCellValue('E' . $this->row, $answer[0]['panel_name']);

					//solution for those that dont have all qeustions answered
					for($ans_index = 0; $ans_index < count($questions_arr); $ans_index++) {
						//for that cell
						if($answer[$i]['id_question'] == $questions_arr[$ans_index]) {
							$this->objPHPExcel->getActiveSheet()->setCellValue($remaining_letters[$ans_index] . $this->row, $answer[$i]['answer_text']);
						}
					}
				}
				$this->row++;
				$index++;

			}
		}

		$this->row++;
		$this->objPHPExcel->getActiveSheet()->setTitle("Patient Records");
	}

	private function getLetterFromNumber($c) {
		$c = intval($c);
		if ($c <= 0) return '';

		$letter = '';

		while($c != 0){
			$p = ($c - 1) % 26;
			$c = intval(($c - $p) / 26);
			$letter = chr(65 + $p) . $letter;
		}

		return $letter;
	}

	private function setUpNewSheet($ActiveIndex) {
		$this->objPHPExcel->setActiveSheetIndex($ActiveIndex);
		$this->objPHPExcel->getActiveSheet()->getDefaultColumnDimension()->setWidth(30);
		$this->objPHPExcel->getActiveSheet()->setShowGridlines(true);
	}

}
