locals {
  defaults = {
    create_bucket = true
    attach_elb_log_delivery_policy = false
    attach_deny_insecure_transport_policy = false
    attach_policy = false
    attach_public_policy = true
    bucket = null
    bucket_prefix = null
    acl = null
    policy = null
    tags = {}

    force_destroy = false
    acceleration_status = null
    request_payer = null
    website = {}
    cors_rule = []
    versioning = {}
    logging = {}
    grant = []
    lifecycle_rule = []
    replication_configuration = {}
    server_side_encryption_configuration = {}
    object_lock_configuration = {}
    block_public_acls = false
    block_public_policy = false
    ignore_public_acls = false
    restrict_public_buckets = false
  }
  cfg = merge(local.defaults, var.configuration)
}