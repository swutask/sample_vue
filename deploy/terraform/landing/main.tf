provider "aws" {
  region = var.region
}

#---------------------------------------------------------------------------------------------------------------------
terraform {
  backend "s3" {
    bucket = "helloivy-co-infrastructure" 
    key    = "landing/s3/terraform.tfstate"
    region = "eu-central-1"               
  }
}
#-------------------------------------------------------------------------------------------------------------

data "aws_route53_zone" "main" {
  name = "${var.domain_name}"
}

#-------------------------------------------------------------------------------------------------------------
module "cdn" {
  source = "git::https://github.com/cloudposse/terraform-aws-cloudfront-s3-cdn.git?ref=master"
  //for test only defult "origin_force_destroy" = false
  origin_force_destroy     = true
  use_regional_s3_endpoint = true
  acm_certificate_arn      = "${var.arn_cert}"
  stage                    = "${var.common_tags["Environment"]}"
  name                     = "${var.project_name}-landing"
  aliases                  = ["${var.domain_name}"]
  compress                 = true
  cors_allowed_origins     = ["*.${var.domain_name}"]
  cors_allowed_methods     = ["GET"]
  cors_allowed_headers     = ["Authorization", "Cache-Control", "Content-Length"]
  parent_zone_name         = "${var.domain_name}"
  wait_for_deployment      = false
  logging_enabled          = false
  ipv6_enabled             = false
  minimum_protocol_version = "TLSv1.2_2018" 
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
      "response_page_path"    = "/404.html"
    }
  ]
}
