variable "localstack-endpoint" {
  type = string
  default = "http://localhost:4566"
}

variable "fake-keys" {
  type = string
  default = "fake-key-from-localstack"
}

variable "region" {
  type = list(string)
  default = [ "us-east-1" ]
}