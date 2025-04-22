import json
from datetime import datetime
import time

current_datetime = datetime.now()

from openai import OpenAI


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
}

def lambda_handler(event, context):
    start_time_overall = time.time()
    query = None

    if event and 'queryStringParameters' in event and event['queryStringParameters']:
        if 'query' in event['queryStringParameters'] and event['queryStringParameters']['query']:
            query = event['queryStringParameters']['query']
        else:
            return {
                'statusCode': 400,
                'headers': CORS_HEADERS,
                'body': json.dumps({'error': 'Invalid query string.'})
            }
    else:
        return {
            'statusCode': 400,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': 'Invalid query string.'})
        }

    calendar_feed = open("feed.data", "r").read()

    client = OpenAI(api_key = "")

    assistant_messages = [
        {"role": "system", "content": f"""You are a calendar assistant. Here is a feed of the calendar: \n\n{calendar_feed}\n\n Attach a link to the calendar URL. Please generate your response in the following JSON format without any additional text. Use the keys exactly as shown:

    {{
        "summary": "A brief summary of the events, or directly answering the users question.",
        "results": [
            {{
                "type": "event",
                "date": "YYYY-MM-DD",
                "time": "HH-MM:HH-MM",
                "description": "A description of the event details.",
                "guid": "123"
            }}
        ]
    }}

    Ensure that the output is valid JSON and does not include any markdown formatting or commentary outside of the JSON structure. The time in UTC is currently {current_datetime.isoformat()}"""},
        {"role": "user", "content": query}
    ]

    start_time_openai = time.time()
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=assistant_messages
    )

    raw_response = completion.choices[0].message.content
    end_time_openai = time.time()

    try:
        parsed_response = json.loads(raw_response)
    except json.JSONDecodeError as e:
        return {
            'statusCode': 400,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': 'Failed to process AI response (Invalid JSON).', 'data': raw_response})
        }
    
    output_guid_file = open("output_guid_data.json", "r").read()
    output_guid_data = json.loads(output_guid_file)

    for i in range(len(parsed_response['results'])):
        guid = parsed_response['results'][i]['guid']

        parsed_response['results'][i]["department"] = output_guid_data[guid]['department']
        parsed_response['results'][i]["link"] = output_guid_data[guid]['link']

    end_time_overall = time.time()

    elapsed_time_overall = end_time_overall - start_time_overall
    elapsed_time_openai = end_time_openai - start_time_openai

    print(f"Elapsed time overall: {elapsed_time_overall}s")
    print(f"Elapsed time openai request: {elapsed_time_overall}s")

    return {
        'statusCode': 200,
        'headers': CORS_HEADERS,
        'body': json.dumps(parsed_response)
    }
