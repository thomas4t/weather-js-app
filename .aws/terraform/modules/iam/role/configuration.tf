locals {
  defaults = {
    # role_name = 
    trusted_role_actions = ["sts:AssumeRole"]
    trusted_role_arns = []
    trusted_role_services = []
    mfa_age = 86400
    max_session_duration = 3600
    create_role = true
    create_instance_profile = false
    role_description = ""
    role_path = "/"
    role_requires_mfa = false
    role_permissions_boundary_arn = ""
    tags = {}
    custom_role_policy_arns = []
    number_of_custom_role_policy_arns = null
    admin_role_policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
    poweruser_role_policy_arn = "arn:aws:iam::aws:policy/PowerUserAccess"
    readonly_role_policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
    attach_admin_policy = false
    attach_poweruser_policy = false
    attach_readonly_policy = false
    force_detach_policies = false
    role_sts_externalid = []
  }
  cfg = merge(local.defaults, var.configuration)
}