/*resource "aws_cloudwatch_metric_alarm" "unprocessed-messages" {
  alarm_name          = "SQSMessagesVisibles"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 2
  metric_name         = "ApproximateNumberOfMessagesVisible"
  namespace           = "AWS/SQS"
  period              = 300
  statistic           = "Average"
  threshold           = 50
  alarm_description   = "This metric monitors number of messages visible"

  dimensions = {
    QueueName = aws_sqs_queue.queue-loyal-customer.name
  }
}

resource "aws_cloudwatch_metric_alarm" "messages-sent" {
  alarm_name          = "NumberOfMessagesSent"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 2
  metric_name         = "NumberOfMessagesSent"
  namespace           = "AWS/SQS"
  period              = 300
  statistic           = "Average"
  threshold           = 0
  alarm_description   = "This metric monitors number of messages sent"

  dimensions = {
    QueueName = aws_sqs_queue.queue-loyal-customer.name
  }
}*/