resource "aws_api_gateway_rest_api" "consumer-api" {
  name = "consumer-api"
}

resource "aws_api_gateway_resource" "MyResource" {
  rest_api_id = aws_api_gateway_rest_api.consumer-api.id
  parent_id   = aws_api_gateway_rest_api.consumer-api.root_resource_id
  path_part   = "myresource"
}
