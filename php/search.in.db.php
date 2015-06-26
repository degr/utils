<?php
/**
 * Created by IntelliJ IDEA.
 * User: rsmirnou
 * Date: 6/26/2015
 * Time: 1:23 PM
 */
require_once 'db/IDB.php';
require_once 'db/DB.php';
require_once 'db/Manager.php';
require_once 'db/IEngine.php';
require_once 'db/Engine.php';
require_once 'db/engine/MySQL.php';
$manager = new DB_Manager("", "MySQL");
$manager->setCredentials('localhost', 'root', 'admin', 'latticepro');
DB::init($manager);
$tables = DB::getColumn("SHOW TABLES from latticepro" );
set_time_limit(0);
foreach($tables as $table) {
    if($_POST['method'] == 'searchColumn') {
        $cols = DB::getColumns($table);
        foreach($cols as $col) {
            if(strpos(strtolower($col['Field']), $_POST['value']) !== false) {
                echo $table . "::" . $col['Field'] . "\n";
            }
        }
    }elseif($_POST['method'] == 'searchValue') {
        $cols = DB::getColumns($table);
        foreach($cols as $col) {
            $c = $col['Field'];
            $query = "SELECT count(1) FROM ".$table." WHERE BINARY ".$c."=aes_encrypt('".addslashes($_POST['value'])."', '6e3b4165386d61752c31696f7e')";
            $res = DB::getCell($query);
            if(!empty($res)) {
                echo "select aes_decrypt(".$c.", '6e3b4165386d61752c31696f7e'), ".$c." from ".$table . "/* look column: " . $c . "*/\n";
                flush();
            }
        }
    }
}
