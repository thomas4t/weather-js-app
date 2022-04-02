module "ecr" {
  source  = "../_module/ecr"
  # insert the 12 required variables here
  name = local.cfg["name"]
  principals_full_access = local.cfg["principals_full_access"]
  principals_readonly_access = local.cfg["principals_readonly_access"]
  scan_images_on_push = local.cfg["scan_images_on_push"]
  max_image_count = local.cfg["max_image_count"]
  image_tag_mutability = local.cfg["image_tag_mutability"]
  enable_lifecycle_policy = local.cfg["enable_lifecycle_policy"]
  protected_tags = local.cfg["protected_tags"]
  encryption_configuration = local.cfg["encryption_configuration"]
}