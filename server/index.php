<?php
// yakirli.org – קובץ שרת בלבד (לא חלק מהאתר הסטטי).
// nginx מעביר לכאן כל כתובת שאין לה קובץ. כתובות של האתר הקודם מקבלות הפניה קבועה (301)
// לפי redirects.json שסקריפט הפריסה מייצר מעמודי ההפניה של build.py. כל השאר: עמוד 404 של האתר.
$path = rawurldecode((string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH));
$key = rtrim($path, '/') . '/';
$map = json_decode((string) @file_get_contents(dirname(__DIR__) . '/redirects.json'), true);
if (is_array($map) && isset($map[$key]) && is_string($map[$key]) && strpos($map[$key], '/') === 0 && strpos($map[$key], '//') !== 0) {
    header('Location: ' . $map[$key], true, 301);
    exit;
}
http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/404.html');
