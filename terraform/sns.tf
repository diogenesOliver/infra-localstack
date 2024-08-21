resource "aws_sns_topic" "trigger-sns" {
  name = "localstack-iac-topic"
}

resource "aws_sns_topic_subscription" "trigger-sns-subscription" {
  topic_arn = aws_sns_topic.trigger-sns.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.trigger-sqs.arn
}