<?php
class M_Survey extends MY_Model {

	public function getUsersInfo($id, $pharma_id) {
		return $this->getQueryResultArray("CALL sp_get_patient_info_for_new_record('$id','$pharma_id');");
	}

	public function getPanels() {
		return $this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.surv_survey_panels;");
	}

}

