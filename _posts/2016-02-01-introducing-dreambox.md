---
layout: post
title: Introducing DreamBox
excerpt: One thing I haven't been able to find is a Vagrant box replicating the DreamHost shared hosting environment, so I made one.
description: DreamBox is a Vagrant environment for DreamHost users.
code: true
resources:
- text: DreamHost's PHP Info page
  url: http://php56.dreamhosters.com/
- text: DreamHost Wiki - Supported and unsupported technologies
  url: http://wiki.dreamhost.com/Supported_and_unsupported_technologies
---

[DreamBox](https://atlas.hashicorp.com/goodguyry/boxes/dreambox) is a Vagrant environment for DreamHost users. It replicates not only the package versions and server setup, but also the shared hosting setup, meaning any files that require a full path will work both locally and on your server.

To get started with DreamBox, run the following in Terminal:

{% codeblock shell caption="Or add 'goodguyry/dreambox' to an existing Vagrantfile" %}
vagrant init goodguyry/dreambox
vagrant up
{% endcodeblock %}

### User setup

Once the VM is created and ready, `ssh` into the VM and run `sudo user_setup`.

The `user_setup` script will prompt for the following information:

- **Username**: Your SSH/SFTP username.
- **Site root**: Your website's root folder name, most-likely the same as your domain name.
- **Project root**: The local directory, relative to your project root, that will hold your web files; this defaults to <code class="path">web</code>.

See [the DreamBox documentation](https://github.com/goodguyry/dreambox) for information about automating `user_setup` as part of your Vagrant provisioning.

DreamBox is available for VirtualBox and VMware. I'm excited for this to finally be out in the world and hope DreamHost users find it useful.
