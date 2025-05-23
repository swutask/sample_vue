
output "cdn_id" {
  value       = module.cdn.cf_id
  description = "ID of AWS CloudFront distribution"
}

output "s3_bucket" {
  value       = module.cdn.s3_bucket
  description = "name of S3 bucket"
}



/*
output "cf_status" {
  value       = module.cdn.cf_status
  description = "Current status of the distribution"
}

output "cf_etag" {
  value       = module.cdn.cf_etag
  description = "Current version of the distribution's information"
}

output "s3_bucket" {
  value       = module.cdn.s3_bucket
  description = "Name of S3 bucket"
}

output "s3_bucket_domain_name" {
  value       = module.cdn.s3_bucket_domain_name
  description = "Domain of S3 bucket"
}
*/