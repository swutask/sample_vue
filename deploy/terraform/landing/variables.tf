variable "region" {
  description = "AWS Region to deploy Server"
  default     = "eu-central-1"
}

variable "project_name" {
  type        = string
  description = "Project name"
  default     = "helloivy"
}

variable "domain_name" {
  type        = string
  description = "Domain for project"
  default     = "complex.so"
}

variable "arn_cert" {
  type        = string
  description = "Certificate ARN"
  default     = "arn:aws:acm:us-east-1:944000130876:certificate/99d8ea55-8a6c-4d4f-b9f1-2b661736a774"
  // default eu-central-1    = "arn:aws:acm:eu-central-1:944000130876:certificate/30cde68e-ce9f-49df-a2ce-2487eb0e6724"
}




variable "enable_detailed_monitoring" {
  default = false
}


variable "common_tags" {
  description = "Common Tags to apply to all resources"
  default = {
    Owner       = "Administrator"
    Project     = "helloivy"
    Environment = "landing"
  }
}
