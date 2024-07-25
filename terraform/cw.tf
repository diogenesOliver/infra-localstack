resource "aws_cloudwatch_metric_alarm" "queue-metric" {
  alarm_name          = "SQSQueueMessagesSent"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 2
  metric_name         = "NumberOfMessagesSent"
  namespace           = "AWS/SQS"
  period              = 300
  statistic           = "Average"
  threshold           = 30
  alarm_description   = "This metric monitors number of messages sent"

  dimensions = {
    QueueName = aws_sqs_queue.sqs-api-test.name
  }
}