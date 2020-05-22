<?php
class M_Answer extends MY_Model
{

    public function getAnswers($id){
        return $this->getQueryResultArray("SELECT id, text FROM question_answers WHERE questions_id = $id");
    }

    public function addAnswer($answer_text, $question_id){
       // $result = $this->getQueryResultArray("call sp_create_answers_for_questions ('$answer_text', '$question_id')");
        //var_dump($result);
        $query = $this->db->query("call sp_create_answers_for_questions ('$answer_text', '$question_id')");
        $query->next_result(); 
        $query->free_result(); 
        return "success";
    }
    public function updateAnswer($id, $a_text){
        $this->db->query("CALL sp_update_answer_for_questions ('$a_text', '$id')");
        return "success";
    }

    public function deleteAnswer($id){
        $this->db->query("CALL sp_detele_answers_for_question('$id')");
        return "success";
    }

    function next_result()
    {
        if (is_object($this->conn_id))
        {
            return mysqli_next_result($this->conn_id);
        }
    }

    // public function getQuestions($id){
    //     return $this->getQueryResultArray(
    //     "call sp_get_questions_basedLabel('$id')");
    // }
    // public function getCategories(){
    //     return $this->getQueryResultArray("SELECT id, category_name FROM question_category");
    // }

    // public function addQuestion($label_id, $question_text, $question_cat){
    //     $this->db->query("CALL sp_insert_question ('$question_cat', '$question_text', '$label_id')");
    //     return $this->db->insert_id();
    // }

    // public function deleteQuestion($id){
    //     $this->db->query("CALL sp_delete_question_by_id ('$id')");
    //     return "success";
    // }
}
