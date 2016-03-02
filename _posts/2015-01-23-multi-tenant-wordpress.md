---
layout: post
title: Multi-Tenant WordPress
excerpt: Multi-Tenant WordPress is similar to WordPress Multisite, but each site uses a separate database. It&rsquo;s more difficult to set up than Multisite, but has some specific advantages.
description: The multi-tenant WordPress setup allows multiple 'tenant' sites to run from one 'core' WordPress install, but with separate databases.
code: true
---

<p class="hey">This post was inspired by Jason McCreary's <a href="http://jason.pureconcepts.net/2012/08/wordpress-multitenancy/">WordPress Multitenancy</a> (and <a href="http://jason.pureconcepts.net/2013/04/updated-wordpress-multitenancy/">his follow-up</a>).</p>

### Overview

The multi-tenant WordPress setup allows multiple &quot;tenant&quot; sites to run from one &quot;core&quot; WordPress install, but with separate databases. The WordPress files are placed in versioned directories outside of the site&rsquo;s root, such as <code class="path">/opt/wordpress/{version}/</code>, then symlinked to the tenant sites&rsquo; root directories.

The main <code class="path">wp-config.php</code> file is in <code class="path">/opt/wordpress</code> and contains all shared WordPress settings and definitions, along with a bit of code to require the tenants&rsquo; config files, based on the host.

{% codeblock cli caption="/opt/wordpress/" %}
wordpress
├── 4.1/
│   ├── {... core WordPress 4.1 files ...}
├── tenant-configs
│   ├── mysite.dev-config.php
│   ├── clientsite.dev-config.php
└── wp-config.php
{% endcodeblock %}

{% codeblock cli caption="The site&rsquo;s root" %}
├── .htaccess
├── index.php
├── wordpress -> /opt/wordpress/4.1/
└── wp-content
{% endcodeblock %}

By taking advantage of some fully supported alternative configuration and setup options, we can allow for:

- Slow, tested rollouts of WordPress core updates
- A <code class="path">dev > stage > production</code> Git workflow in a single WordPress install
- Separate databases for each of our sites (or branches)
- Easily adding more sites as needed

That last point is especially attractive if you develop multiple WordPress sites; make this your local setup and you&rsquo;re golden.

### Getting Started

We're essentially going to be [giving WordPress its own directory](http://codex.wordpress.org/Giving_WordPress_Its_Own_Directory), then moving the <code class="path">wp-content</code> directory to the site&rsquo;s root.

#### Give WordPress its own directory

As mentioned, the core WordPress files should be moved into versioned directories outside of the site&rsquo;s root. We then symlink the version directory to the site's root.

{% codeblock term caption="Symlink the core WordPress files to the site&rsquo;s root" %}
ln -s /opt/wordpress/4.1/ /path/to/site/wordpress
{% endcodeblock %}

**Copy** index.php from <code class="path">/opt/wordpress/4.1/</code> to the site&rsquo;s root directory and edit the last line to add the <code class="path">wordpress</code> symlinked directory.

{% codeblock php caption="Tell WordPress where to find itself" %}
<?php /** Loads the WordPress Environment and Template */
require( dirname( __FILE__ ) . '/wordpress/wp-blog-header.php' ); ?>
{% endcodeblock %}

#### Move wp-content

In my experience, the <code class="path">wp-content</code> directory isn&rsquo;t necessary in the core WordPress files, so we can safely move it to our site&rsquo;s root.

One tip you may find useful: Copy <code class="path">wp-content</code> to the <code class="path">/opt/wordpress</code> directory so you&rsquo;ve got a spare you can use when adding sites in the future.

We'll need to make some changes to the main <code class="path">wp-config.php</code> and tenant config files to make sure WordPress can find our <code class="path">wp-content</code> directory, but the files are now all in place.

{% codeblock term caption="We&rsquo;re all set" %}
ls -l

1 root root  418 Jan 15 22:08 index.php
1 root root   19 Jan 15 22:05 wordpress -> /opt/wordpress/4.1/
4 root root 4096 Jan 15 22:07 wp-content
{% endcodeblock %}

#### The config files

For the main config file, the `DB_NAME`, `DB_USER`, `DB_PASSWORD` and `DB_HOST` definitions and Authentication Unique Keys should be removed and placed in the tenant config files. In their place is some code to require a tenant config file, based on the host.

{% codeblock php caption="Require the tenant config files based on their host name" %}
<?php // From /opt/wordpress/wp-config.php

// Parse the host to create the tenant's config file path
$server_host = preg_replace('/:.*/', "", $_SERVER['HTTP_HOST']);
$server_host = preg_replace("/[^a-zA-Z0-9.\-]/", "", $server_host);
$host_config_file = '/opt/wordpress/tenant-configs/'.strtolower($server_host).'-config.php';

// Require the tenant's config file
if (file_exists($host_config_file)) {
  require_once($host_config_file);
}
?>
{% endcodeblock %}

The tenant config files hold the tenant-specific database settings and Authentication Unique Keys, along with a couple declarations to tell WordPress where the <code class="path">wp-content</code> directory is located.

{% codeblock php caption="The last two lines tell WordPress where the <code class='path'>wp-content</code> directory is located." %}
<?php
/**
 * Required by /opt/wordpress/wp-config.php
 */

/** MySQL database name */
define('DB_NAME', 'mydatabase');

/** MySQL database username */
define('DB_USER', 'db_username');

/** MySQL database password */
define('DB_PASSWORD', 'xxxxxxxxxxxx');

/** MySQL hostname */
define('DB_HOST', 'localhost');

// Authentication Unique Keys
define('AUTH_KEY',         'randomString');
define('SECURE_AUTH_KEY',  'randomString');
define('LOGGED_IN_KEY',    'randomString');
define('NONCE_KEY',        'randomString');

// Path to the wp-content directory for this tenant
define('WP_CONTENT_DIR', '/path/to/site/wp-content');
define('WP_CONTENT_URL', 'http://mysite.com/wp-content');

?>
{% endcodeblock %}

### Intall WordPress

Be sure to visit your site at <code class="path">mysite.com/wordpress</code> in order to be prompted to start the installation. After installation, you shouldn&rsquo;t need to include the <code class="path">wordpress</code> directory in the URL when visiting the Admin Dashboard.

---

To add more sites:

- Copy and modify <code class="path">index.php</code>
- Symlink the core WordPress files to the site&rsquo;s root
- Add a <code class="path">wp-content</code> directory
- Add a config file for the new tenant site
- Visit <code class="path">your-site/wordpress</code> to install
