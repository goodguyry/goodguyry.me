---
# Errors
permalink: /errors.php
---
{% assign classes = site.data.classnames.base %}

<!DOCTYPE html>
<html>

  {% include head.html %}

<body>

<?php

/**
 * Display a status code.
 */
$status = $_SERVER['REDIRECT_STATUS'];
$codes = array(
    401 => [
        '401 Unauthorized',
        'This request requires user authentication.'
    ],
    403 => [
        '403 Forbidden',
        'The server has refused to fulfill your request.'
    ],
    404 => [
        '404 Not Found',
        'The requested file was not found on this server.'
    ],
    405 => [
        '405 Method Not Allowed',
        'The method specified in the Request-Line is not allowed for the specified resource.'
    ],
    408 => [
        '408 Request Timeout',
        'Your browser failed to send a request in the time allowed by the server.'
    ],
    410 => [
        '410 Gone',
        'This content has been removed,
        with no suitable replacement. Please remove any inbound links.'
    ],
    500 => [
        '500 Internal Server Error',
        'The request was unsuccessful due to an unexpected condition encountered by the server.'
    ],
    502 => [
        '502 Bad Gateway',
        'The server received an invalid response from the upstream server while trying to fulfill the request.'
    ],
    504 => [
        '504 Gateway Timeout',
        'The upstream server failed to send a request in the time allowed by the server.'
    ],
);

$title = $codes[$status][0];
$message = $codes[$status][1];
if (false === $title || 3 !== strlen($status)) {
    $title   = 'Missing error code.'
    $message = 'Please supply a valid status code.';
} else {
    $code = substr($title, 0, 3);
    $code_desc = substr($title, 3);
}
?>

    <div class="{{ classes.grid }}">

        <!-- TODO: incorporate global-header -->
        <header role="banner">

            <h1><?php echo $code . ' Error'; ?></h1>

        </header>

        <main role="main">

            <article class="{{ classes.section }} post-content">

                <h2><?php echo $code_desc; ?></h2>

                <p><?php echo $message; ?></p>

                <a class="{{ classes.more }}" href="/">Return to the home page</a>.

            </article>

        </main>

        {% include components/global-footer.html %}

        </div>

    </body>

</html>
