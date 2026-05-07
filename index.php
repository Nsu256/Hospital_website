<?php
session_start();

// If user is logged in, show home page
if (isset($_SESSION['user_id'])) {
    include __DIR__ . '/home.html';
    exit;
}

// Otherwise, show login page
include __DIR__ . '/login.html';
exit;
