<?php
class DB_Engine_MySQL extends DB_Engine{

    protected $mysqli;

    public function __construct($host, $user, $passord, $database)
    {
        $this->mysqli = new mysqli($host, $user, $passord, $database);
    }

    public function connect()
    {
        try {
            $this->mysqli->connect($this->host, $this->user, $this->password, $this->database);
            return true;
        }catch (Exception $e){
            return false;
        }
    }

    public function disconnect()
    {
        $this->mysqli->close();
    }

    public function getResultSet($query)
    {
        return $this->query($query);
    }

    public function query($query)
    {
        DB::incrementQueries();
        $out = $this->mysqli->query($query);
        if($this->mysqli->error){
            $this->showError($query);
            throw new Exception("SQL query contain errors.");
        }
        return $out;
    }

    public function getLastId()
    {
        return $this->getCell("SELECT last_inserted_id()");
    }

    public function getColumns($table) {
        $query = "SHOW COLUMNS FROM `" . addslashes ( $table ) . "`";
        return DB::getTable ( $query );
    }

    protected function showError($query){
        echo "<pre>";
        echo '<span style="color: red">'.$this->mysqli->error."</span>";
        echo "<br/>".$query;
        echo "</pre>";
    }


    public function close(){
        $this->mysqli->close();
    }
}