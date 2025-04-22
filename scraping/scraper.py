import requests
import feedparser

from bs4 import BeautifulSoup

import re
import json

from datetime import datetime
import time
import zoneinfo

eastern_timezone = zoneinfo.ZoneInfo("America/New_York")


# Feeds - Add RSS links here
feeds = {
    "Arts and Performance": "https://calendar.gatech.edu/taxonomy/term/12/feed",
    "Career/Professional Development": "https://calendar.gatech.edu/taxonomy/term/13/feed",
    "Conference/Symposium": "https://calendar.gatech.edu/taxonomy/term/14/feed",
    "Institute/Academic/Religious": "https://calendar.gatech.edu/taxonomy/term/111/feed",
    "Seminar/Lecture/Colloqium": "https://calendar.gatech.edu/taxonomy/term/16/feed",
    "Special Event": "https://calendar.gatech.edu/taxonomy/term/17/feed",
    "Sports/Athletics": "https://calendar.gatech.edu/taxonomy/term/18/feed",
    "Student Sponsored": "https://calendar.gatech.edu/taxonomy/term/19/feed",
    "Training/Workshop": "https://calendar.gatech.edu/taxonomy/term/20/feed"
}

# Data structures to hold event data and metadata
events = []
event_metadata = dict()

print("Starting feed processing...")
start_time = time.time()

seen_guids = set()

for feed_name, feed_url in feeds.items():
    print(f"\nProcessing Feed: {feed_name} ({feed_url})")
    try:
        response = requests.get(feed_url)
        response.raise_for_status()

        feed = feedparser.parse(response.content)

        if feed.bozo:
            print(f"Warning: Feed may be non-well-formed")

        if not feed.entries:
            print("No entries found in this feed")
            continue

        print(f"Found {len(feed.entries)} entries")

        processed_count = 0

        for entry in feed.entries:
            event_data = {'category': feed_name}

            guid = entry.get('guid', entry.get('link'))
            if not guid or guid in seen_guids:
                continue

            seen_guids.add(guid)
            event_data['guid'] = guid

            metadata = {
                'link': entry.get('link'),
                'department': feed_name
            }

            event_metadata[re.sub(r"\s+at\s+http:\/\/calendar\.gatech\.edu", "", entry.get('guid'))] = metadata

            event_data['title'] = entry.get('title', 'No Title')
            event_data['start'] = None
            event_data['end'] = None
            description_html = entry.get('description')
            if description_html:
                try:
                    soup = BeautifulSoup(description_html, 'html.parser')

                    time_tags = soup.find_all('time', datetime=True)
                    if len(time_tags) >= 2:
                        start_time_tag = time_tags[-2]
                        end_time_tag = time_tags[-1]
                        start_dt_str = start_time_tag['datetime']
                        end_dt_str = end_time_tag['datetime']

                        if start_dt_str.endswith('Z'):
                            event_data['start'] = start_dt_str[:-1] + '+00:00'
                        elif len(start_dt_str) > 6 and start_dt_str[-6] in ['+', '-']:
                            event_data['start'] = start_dt_str
                        else:
                            event_data['start'] = start_dt_str + '+00:00'

                        if end_dt_str.endswith('Z'):
                             event_data['end'] = end_dt_str[:-1] + '+00:00'
                        elif len(end_dt_str) > 6 and end_dt_str[-6] in ['+', '-']:
                            event_data['end'] = end_dt_str
                        else:
                            event_data['end'] = end_dt_str + '+00:00'


                except Exception as e:
                    print(f"Error parsing description HTML for entry '{event_data.get('title', 'No Name!!!')}': {e}")


            event_line = f"{event_data.get('title', 'N/A')}|"

            if event_data.get('start'):
                start_datetime = datetime.fromisoformat(event_data['start'])
                et_dt = start_datetime.astimezone(eastern_timezone)
                et_time_str_no_seconds = et_dt.isoformat(timespec='minutes')
                event_line += f"{et_time_str_no_seconds}|"
            
            if event_data.get('end'):
                end_datetime = datetime.fromisoformat(event_data['end'])
                et_dt = end_datetime.astimezone(eastern_timezone)
                et_time_str_no_seconds = et_dt.isoformat(timespec='minutes')
                event_line += f"{et_time_str_no_seconds}|"
            
            guid_parsed = re.sub(r"\s+at\s+http:\/\/calendar\.gatech\.edu", "", event_data.get('guid', 'N/A'))
            event_line += f"{guid_parsed}"

            events.append(event_line)
            processed_count += 1

        print(f"Processed {processed_count} unique entries from this feed.")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching feed {feed_name}: {e}")
    except Exception as e:
        print(f"An unexpected error occurred processing feed {feed_name}: {e}")


print(f"\nTotal events found: {len(events)}")


output_feed_data = 'output_processed_feed.data'
with open(output_feed_data, 'w', encoding='utf-8') as f:
    f.write("Event|Start Date|End Date|GUID" + '\n')
    for doc in events:
        f.write(doc + '\n')
print(f"\nSaved feed data to {output_feed_data}")


output_guid_supp_data = 'output_guid_data.json'
with open(output_guid_supp_data, 'w', encoding='utf-8') as f:
    json.dump(event_metadata, f, indent=4, ensure_ascii=False, sort_keys=True)
print(f"\nSaved event metadata to {output_guid_supp_data}")

end_time = time.time()

elapsed_time = end_time - start_time

print(f"Elapsed time: {elapsed_time}s")