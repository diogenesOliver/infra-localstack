resource "aws_sqs_queue" "queue-loyal-customer" {
  name                        = "queue-loyal-customer-event.fifo"
  delay_seconds               = 15
  max_message_size            = 2048
  message_retention_seconds   = 600
  receive_wait_time_seconds   = 10
  visibility_timeout_seconds  = 30
  fifo_queue                  = true
  content_based_deduplication = true

  tags = {
    Environment = "production"
  }
}