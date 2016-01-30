# -*- mode: ruby -*-
# vi: set ft=ruby :

# External YAML file for variables
# h/t http://stackoverflow.com/a/23589414
require 'yaml'
settings = YAML.load_file 'vm-config.yaml'

local_dir = settings['paths']['local_dir']
guest_dir = settings['paths']['guest_dir']
guest_port = settings['ports']['guest_port']
host_port = settings['ports']['host_port']
domain = settings['settings']['domain']
vhost = settings['settings']['vhost']
ip_address = settings['settings']['ip_address']
username = settings['settings']['username']

Vagrant.configure(2) do |config|
  config.vm.box = "goodguyry/dreambox"
  config.vm.box_url = "https://atlas.hashicorp.com/goodguyry/boxes/dreambox"

  config.vm.network :forwarded_port, guest: guest_port, host: host_port, auto_correct: true

  config.vm.synced_folder local_dir, guest_dir, create: true, owner: "www-data", group: "www-data"

  config.vm.provider "virtualbox" do |vb|
    vb.name = domain
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end

  # Start bash as a non-login shell
  # This gets rid of the annoying "stdin: is not a tty"
  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"

  # Environment variables for automating user_setup
  user_vars = {
    "DREAMBOX_USER_NAME" => username,
    "DREAMBOX_SITE_ROOT" => domain,
    "DREAMBOX_PROJECT_DIR" => "/#{local_dir}"
  }

  # Runs user_setup
  config.vm.provision "shell",
    inline: "/bin/bash /usr/local/bin/user_setup",
    # Pass user_setup ENV variables to this script
    :env => user_vars

  config.vm.define domain do |node|
    node.vm.hostname = vhost
    node.vm.network :private_network, ip: ip_address
  end
end
