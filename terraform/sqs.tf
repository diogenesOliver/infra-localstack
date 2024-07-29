resource "aws_sqs_queue" "sqs-api-test" {
  name                       = "sqs-api-test"
  delay_seconds              = 15
  max_message_size           = 2048
  message_retention_seconds  = 600
  receive_wait_time_seconds  = 10
  visibility_timeout_seconds = 30

  tags = {
    Environment = "production"
  }
}