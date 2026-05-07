<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
$username = isset($_SESSION['username']) ? (string)$_SESSION['username'] : null;
echo json_encode(['username' => $username]);
