provider "aws" {
  region = var.region
}

#---------------------------------------------------------------------------------------------------------------------
terraform {
  backend "s3" {
    bucket = "complex-terraform-state" 
    key    = "infrastructure/eu-central-1/production/cdn/terraform.tfstate"
    region = "eu-central-1"               
  }
}
#-------------------------------------------------------------------------------------------------------------
module "cdn" {
  source = "cloudposse/cloudfront-s3-cdn/aws"
  version = "0.92.0"
  origin_force_destroy     = true
  acm_certificate_arn      = "${var.arn_cert}"
  stage                    = "${var.common_tags["Environment"]}"
  name                     = "${var.project_name}"
  dns_alias_enabled        = false
  aliases                  = ["app.${var.domain_name}"]
  compress                 = true
  cors_allowed_origins     = ["*.${var.domain_name}"]
  cors_allowed_methods     = ["GET", "HEAD", "PUT", "POST"]
  cors_allowed_headers     = ["Authorization", "Cache-Control", "Content-Length"]
  wait_for_deployment      = false
  ipv6_enabled             = true
  minimum_protocol_version = "TLSv1.2_2021" 
  custom_error_response = [
    {
      "error_caching_min_ttl" = 0
      "error_code"            = 403
      "response_code"         = 200
      "response_page_path"    = "/index.html"
    },
    {
      "error_caching_min_ttl" = 0
      "error_code"            = 404
      "response_code"         = 200
      "response_page_path"    = "/index.html"
    }
  ]
  s3_access_logging_enabled         = false
  cloudfront_access_logging_enabled = false
  http_version         = "http2and3"
}
