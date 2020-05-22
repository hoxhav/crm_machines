<?php

abstract class MY_Model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    protected function getQueryResultArray($query)
    {
        $q = $this->db->query($query);
        $r = $q->result_array();

        $q->next_result();
        $q->free_result();
        return $r;
    }

}
