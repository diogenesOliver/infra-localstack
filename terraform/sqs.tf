resource "aws_sqs_queue" "trigger-sqs" {
  name                        = "trigger-sqs"
  delay_seconds               = 15
  max_message_size            = 2048
  message_retention_seconds   = 600
  receive_wait_time_seconds   = 10
  visibility_timeout_seconds  = 30

  tags = {
    Environment = "Demo"
  }
}

resource "aws_sqs_queue_policy" "trigger-sqs-policy" {
  queue_url = aws_sqs_queue.trigger-sqs.id

  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Id" : "sqspolicy",
      "Statement" : [
        {
          "Sid" : "001",
          "Effect" : "Allow",
          "Principal" : "*",
          "Action" : "sqs:SendMessage",
          "Resource" : aws_sqs_queue.trigger-sqs.arn,
          "Condition" : {
            "ArnEquals" : {
              "aws:SourceArn" : aws_sns_topic.trigger-sns.arn
            }
          }
        }
      ]
    }
  )
}