from bs4 import BeautifulSoup
import time
import json
import boto3
import random, string
import requests

#url processing
completed = []

# dynamodb = boto3.resource('dynamodb')
# table_name = 'JobInfoTable'  # Replace with your DynamoDB table name
# table = dynamodb.Table(table_name)

def generate_random_string(length=20):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))
    
def download(url):
    resp = requests.get(url)
    time.sleep(.5)
    try:
        if resp and resp.content:
            return resp
    except Exception as e:
        return None
    
def getJobData(soup):
    jobData = {}

    list_elements = soup.find_all('li')

    # Iterate over each list element
    i = 0
    for list_element in list_elements:
        # Find the base-search-card__info div within the list element
        dataMap = {}
        info_div = list_element.find('div', class_='base-search-card__info')
            
        # Find the base-card__full-link element
        full_link = list_element.find('a', class_='base-card__full-link')
        href = full_link.get('href') if full_link else 'N/A'
        dataMap['detailsLink'] = href
        
        # If base-search-card__info is found, extract information
        if info_div:
            
            
            
            # Extract title
            title = info_div.find('h3', class_='base-search-card__title')
            title_text = title.get_text(strip=True) if title else 'N/A'
            dataMap['title'] = title_text

            # Extract subtitle
            subtitle = info_div.find('h4', class_='base-search-card__subtitle')
            subtitle_text = subtitle.get_text(strip=True) if subtitle else 'N/A'
            dataMap['subtitle'] = subtitle_text

            # Extract location
            location = info_div.find('span', class_='job-search-card__location')
            location_text = location.get_text(strip=True) if location else 'N/A'
            dataMap['location'] = location_text

            # Extract other metadata
            benefits = info_div.find('div', class_='job-search-card__benefits')
            benefits_text = benefits.get_text(strip=True) if benefits else 'N/A'
            dataMap['benefits'] = benefits_text

            # Extract list date
            list_date = info_div.find('time', class_='job-search-card__listdate--new')
            list_date_text = list_date.get_text(strip=True) if list_date else 'N/A'
            dataMap['list_date'] = list_date_text
            dataMap['jobID'] = generate_random_string()
            resp2 = download(href)
            if resp2 and resp2.status_code == 200:
                soup2 = BeautifulSoup(resp2.content, "html.parser")
                target_div = soup2.find('div', class_='show-more-less-html__markup')
                t2 = soup2.find('img', class_="artdeco-entity-image")
                # Check if the element is found
                print(t2)
                imgSrc = t2.get('src') if t2 else 'N/A'
                dataMap['about'] = imgSrc
                if target_div:
                     
                    # Extract the inner HTML content
                    inner_html = str(target_div)
                    dataMap['about'] = inner_html
                
            jobData[i] = dataMap
        
            i += 1
    
    # print(json_data)
    return jobData
            

def main(event, context):
    baseseed = "https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum="
    seeds = []
    for i in range(1):
        seeds.append(baseseed+str(i))
    completed.extend(seeds)
    while (len(seeds) > 0):
        top = seeds.pop(0)
        resp = download(top)
        if not resp or resp.status_code != 200:
            continue
        
        soup = BeautifulSoup(resp.content, "html.parser")
        dataJson = getJobData(soup)
        
        # json_data = json.dumps(dataJson, indent=2)
        # try:
        #     for key, data in dataJson.items():
        #         print(data['jobID'])
        #         table.put_item(Item=data)
        # except Exception as e:
        #     print('Error:', e)

main(None,None)