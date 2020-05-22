<?php
class M_Question extends MY_Model
{

    public function getQuestions($id){
        return $this->getQueryResultArray(
        "call sp_get_questions_basedLabel('$id')");
    }

    public function getQuestion($id){
        return $this->getQueryResultArray("SELECT question_text from questions WHERE id = $id");
    }

    public function getCategories(){
        return $this->getQueryResultArray("SELECT id, category_name FROM question_category");
    }

    public function updateQuestion($q_id, $q_text){
        $this->db->query("CALL sp_update_question_name ('$q_text', '$q_id')");
        return "success";
    }

    public function addQuestion($label_id, $question_text, $question_cat){
        $result = $this->getQueryResultArray("CALL sp_insert_question ('$question_cat', '$question_text', '$label_id')");
        //$result[0]['last_inserted_question_id']
        return $result;
    }

    public function deleteQuestion($id){
        $this->db->query("CALL sp_delete_question_by_id ('$id')");
        return "success";
    }

    // public function getLabels($id)
    // {
    //     return $this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.surv_panel_labels_questions WHERE surv_survey_panels_id = $id;");
    // }

    // public function getLabel($id){
    //     return $this->getQueryResultArray("SELECT * FROM gbfyzzmy_medic_panels.surv_panel_labels_questions WHERE id = $id;");
    // }

    // public function createLabel($name, $id)
    // {
    //     $this->db->query("CALL sp_insert_label_for_panels ('$name', '$id')");
    //     return "success";        
    // }
    // public function deleteLabel($id){
    //     $this->db->query("CALL sp_delete_label ('$id')");
    //     return "success";        
    // }

    // public function updateLabel($id, $name){
    //     $this->db->query("CALL sp_update_label_name ('$id','$name')");
    //     return "success";        
    // }
}
