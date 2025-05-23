variable "region" {
  description = "AWS Region to deploy Server"
  default     = "eu-central-1"
}

variable "project_name" {
  type        = string
  description = "Project name"
  default     = "complex"
}

variable "domain_name" {
  type        = string
  description = "Domain for project"
  default     = "complex.so"
}

variable "arn_cert" {
  type        = string
  description = "Certificate ARN"
  default     = "arn:aws:acm:us-east-1:944000130876:certificate/87713fc2-e74c-4065-8831-412e2d59a8e9"
}

variable "enable_detailed_monitoring" {
  default = false
}

variable "common_tags" {
  description = "Common Tags to apply to all resources"
  default = {
    Project     = "complex"
    Environment = "production"
  }
}
