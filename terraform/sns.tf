resource "aws_sns_topic" "simple-topic" {
  name = "simple-topi-from-test"
}

resource "aws_sns_topic_subscription" "simple-sub-from-test" {
  topic_arn = aws_sns_topic.simple-topic.arn
  protocol = "email"
  endpoint = "diogenes.riboliveira@gmail.com"
}