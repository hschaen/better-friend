<?php
use linslin\yii2\curl;
$curl = new curl\Curl();
$curl->get($COOKIE["hScopeAPI"]);
echo "<script>console.log('" + $COOKIE['hScopeAPI'] + "');</script>";
?>