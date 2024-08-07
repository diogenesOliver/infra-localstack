data "archive_file" "lambda" {
  type        = "zip"
  source_file = "../src/index.js"
  output_path = "../src/index.zip"
}

resource "aws_lambda_function" "consumer" {
  filename      = "../src/index.zip"
  function_name = "consumer"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.handler"

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = "nodejs20.x"
}