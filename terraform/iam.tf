resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

//resource "aws_lambda_permission" "apigw_permission" {
  //statement_id  = "AllowAPIGatewayInvoke"
  //action        = "lambda:InvokeFunction"
  //function_name = aws_lambda_function.consumer.function_name
  //principal     = "apigateway.amazonaws.com"

  //source_arn = "${aws_api_gateway_rest_api.consumer-api.execution_arn}}/*/*"
//}