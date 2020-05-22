<?php
class M_Panel extends MY_Model
{

    public function getPanel($id){
        return $this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.surv_survey_panels WHERE id = $id;");

    }

    public function updatePanel($id, $name){
        $this->db->query("CALL sp_update_panel_name_by_id('$id','$name')");
        return "success";
    }

    public function getAllPanels()
    {
        return $this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.surv_survey_panels;");
    }

    public function createPanel($name)
    {
        $this->db->query("CALL sp_create_new_panel('$name')");
        return "success";        
    }
    public function deletePanel($id){
        $this->db->query("CALL sp_delete_panel_by_id ('$id')");
        return "success";        
    }
}
