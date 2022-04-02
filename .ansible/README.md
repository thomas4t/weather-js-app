# Ansible rules for dev (or unscaled production) server
If you don't want/have control over your server, delete this folder completely.

## Basic commands
Presumes that you have installed ansible you local machine and access to target server via SSH.

# Get dev server status
- ansible-playbook playbooks/stack_status.yml

### Prepare devserver - choose server by type
- ansible-playbook devserver.yml --tags aws
- ansible-playbook devserver.yml --tags pilsen-server
