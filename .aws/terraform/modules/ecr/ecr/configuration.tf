locals {
  defaults = {
    #name =
    principals_full_access = []
    principals_readonly_access = []
    scan_images_on_push = true
    max_image_count = 500
    image_tag_mutability = "IMMUTABLE"
    enable_lifecycle_policy = true
    protected_tags = []
    encryption_configuration = null
    tags = {}
  }
  cfg = merge(local.defaults, var.configuration)
}