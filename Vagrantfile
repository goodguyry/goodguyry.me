# -*- mode: ruby -*-
# vi: set ft=ruby :

# External YAML file for variables
# h/t http://stackoverflow.com/a/23589414
require 'yaml'
settings = YAML.load_file 'vm-config.yaml'

# Environment variables for automating user_setup
$user_vars = {
  "DREAMBOX_USER_NAME" => settings['username'],
  "DREAMBOX_SITE_ROOT" => settings['domain'],
  "DREAMBOX_PROJECT_DIR" => "_site"
}

Vagrant.configure(2) do |config|
  config.vm.box = "goodguyry/dreambox"

  config.vm.network :forwarded_port, guest: 80, host: 4321, auto_correct: true

  config.vm.provider "virtualbox" do |vb|
    vb.name = settings['domain']
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end

  config.vm.define settings['domain'] do |node|
    node.vm.hostname = settings['vhost']
    node.vm.network :private_network, ip: '192.168.5.22'
  end
end
