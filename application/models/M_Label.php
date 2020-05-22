<?php
class M_Label extends MY_Model
{

    public function getLabels($id)
    {
        return $this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.surv_panel_labels_questions WHERE surv_survey_panels_id = $id;");
    }

    public function getLabel($id){
        return $this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.surv_panel_labels_questions WHERE id = $id;");
    }

    public function createLabel($name, $id)
    {
        $this->db->query("CALL sp_insert_label_for_panels ('$name', '$id')");
        return "success";        
    }
    public function deleteLabel($id){
        $this->db->query("CALL sp_delete_label ('$id')");
        return "success";        
    }

    public function updateLabel($id, $name){
        $this->db->query("CALL sp_update_label_name ('$id','$name')");
        return "success";        
    }
}
