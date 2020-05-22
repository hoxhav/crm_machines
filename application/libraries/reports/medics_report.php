<?php

require_once ('Exel/PHPExcel.php');

class medics_report {

	private $objPHPExcel, $panel_id;
	private $row = 1;

	public function generate_report($data, $panel_id, $user_directory) {
		$this->panel_id = $panel_id;
		$this->objPHPExcel = new PHPExcel();
		$this->setUpNewSheet(0);
		$this->generate_medic_report_panel($data['questions'], $data['answers']);

		$name = "Medic_Panels_Report_" . $this->panel_id  ."_" .time() ."_".date("Y-m-d", strtotime("now")). ".xlsx";
		$filename = $user_directory . "\\" . $name;
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
