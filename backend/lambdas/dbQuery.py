import boto3
import json
import requests
from requests_aws4auth import AWS4Auth

region = 'us-west-1'  # Your AWS region
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

host = 'https://search-jobcrawlopensearch-gwolz6npf7pdu4at3lad4lslre.aos.us-west-1.on.aws'  # The OpenSearch domain endpoint with https:// and without a trailing slash
index = 'jobs'  # Your OpenSearch index name
url = f'{host}/{index}/_search'

# Lambda execution starts here
def lambda_handler(event, context):

    # Put the user query into the query DSL for more accurate search results.
    # Note that certain fields are boosted (^).
    query = {
        "size": 25,
        "query": {
            "multi_match": {
                "query": event['queryStringParameters']['q'],
                "fields": ["title^4", "about", "benefits", "location", "subtitle"]
            }
        }
    }

    # Elasticsearch 6.x requires an explicit Content-Type header
    headers = {"Content-Type": "application/json"}

    # Make the signed HTTP request
    r = requests.get(url, auth=awsauth, headers=headers, data=json.dumps(query))

    # Create the response and add some extra content to support CORS
    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": '*'
        },
        "isBase64Encoded": False
    }

    # Add the search results to the response
    response['body'] = r.text
    return response
