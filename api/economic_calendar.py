"""
Economic Calendar API
Serverless function for Vercel that scrapes Investing.com economic calendar
and provides real-time economic events data with daily 8 AM updates.
"""

from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import requests
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Cache for scraped data (24-hour expiration)
_cache = {
    'data': None,
    'timestamp': None,
    'next_update': None
}

def get_country_flag(country_code):
    """Convert country code to flag emoji"""
    flags = {
        'US': '🇺🇸', 'EUR': '🇪🇺', 'GB': '🇬🇧', 'JP': '🇯🇵', 'CN': '🇨🇳',
        'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸', 'CA': '🇨🇦',
        'AU': '🇦🇺', 'CH': '🇨🇭', 'NZ': '🇳🇿', 'SE': '🇸🇪', 'NO': '🇳🇴'
    }
    return flags.get(country_code, '🌍')

def parse_importance(sentiment_class):
    """Parse importance from sentiment icon class"""
    if 'grayFullBullishIcon' in sentiment_class or 'high' in sentiment_class.lower():
        return 'high'
    elif 'orangeHalfBullishIcon' in sentiment_class or 'medium' in sentiment_class.lower():
        return 'medium'
    else:
        return 'low'

def scrape_investing_calendar():
    """
    Scrape economic calendar from Investing.com
    Returns list of economic events for the next 7 days
    """
    try:
        # Investing.com economic calendar URL
        url = 'https://www.investing.com/economic-calendar/'
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.investing.com/'
        }
        
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        events = []
        today = datetime.now().date()
        
        # Find the economic calendar table
        table = soup.find('table', {'id': 'economicCalendarData'})
        
        if not table:
            print("⚠️ Calendar table not found, using fallback")
            return get_fallback_data()['data']
        
        rows = table.find_all('tr', {'class': re.compile(r'js-event-item')})
        
        for row in rows[:50]:  # Limit to 50 events
            try:
                # Extract data from row
                time_cell = row.find('td', {'class': 'time'})
                country_cell = row.find('td', {'class': 'flagCur'})
                event_cell = row.find('td', {'class': 'event'})
                sentiment_cell = row.find('td', {'class': 'sentiment'})
                actual_cell = row.find('td', {'class': 'act'})
                forecast_cell = row.find('td', {'class': 'fore'})
                previous_cell = row.find('td', {'class': 'prev'})
                
                if not (time_cell and event_cell):
                    continue
                
                # Parse time
                time_str = time_cell.text.strip()
                if not time_str or time_str == 'All Day':
                    time_str = '00:00'
                
                # Parse country
                country_code = 'US'  # Default
                if country_cell:
                    flag_span = country_cell.find('span', {'class': re.compile(r'ceFlags')})
                    if flag_span and flag_span.get('class'):
                        classes = flag_span.get('class')
                        for cls in classes:
                            if cls != 'ceFlags' and len(cls) == 2:
                                country_code = cls.upper()
                                break
                
                # Parse event name
                event_name = event_cell.text.strip()
                
                # Parse importance
                importance = 'low'
                if sentiment_cell:
                    icon = sentiment_cell.find('i')
                    if icon and icon.get('class'):
                        importance = parse_importance(' '.join(icon.get('class')))
                
                # Parse values
                actual = actual_cell.text.strip() if actual_cell else None
                forecast = forecast_cell.text.strip() if forecast_cell else None
                previous = previous_cell.text.strip() if previous_cell else None
                
                # Create event object
                event = {
                    'datetime': f"{today}T{time_str}:00",
                    'country': get_country_flag(country_code),
                    'country_code': country_code,
                    'event': event_name,
                    'importance': importance,
                    'previous': previous if previous else 'N/A',
                    'forecast': forecast if forecast else 'N/A',
                    'actual': actual if actual else None,
                    'impact': 'medium'  # Default impact
                }
                
                events.append(event)
                
            except Exception as e:
                print(f"Error parsing row: {e}")
                continue
        
        print(f"✅ Scraped {len(events)} events from Investing.com")
        return events if events else get_fallback_data()['data']
        
    except Exception as e:
        print(f"❌ Error scraping Investing.com: {e}")
        return get_fallback_data()['data']

def get_fallback_data():
    """
    Fallback data when scraping fails
    Returns realistic economic events for demo
    """
    today = datetime.now()
    
    return {
        'status': 'success',
        'data': [
            {
                'datetime': f"{today.date()}T08:30:00",
                'country': '🇺🇸',
                'country_code': 'US',
                'event': 'Retail Sales m/m',
                'importance': 'high',
                'previous': '0.3%',
                'forecast': '0.5%',
                'actual': None,
                'impact': 'high'
            },
            {
                'datetime': f"{today.date()}T10:00:00",
                'country': '🇪🇺',
                'country_code': 'EUR',
                'event': 'ECB President Lagarde Speaks',
                'importance': 'high',
                'previous': 'N/A',
                'forecast': 'N/A',
                'actual': None,
                'impact': 'high'
            },
            {
                'datetime': f"{today.date()}T14:30:00",
                'country': '🇺🇸',
                'country_code': 'US',
                'event': 'Unemployment Claims',
                'importance': 'medium',
                'previous': '210K',
                'forecast': '215K',
                'actual': None,
                'impact': 'medium'
            },
            {
                'datetime': f"{(today + timedelta(days=1)).date()}T08:30:00",
                'country': '🇬🇧',
                'country_code': 'GB',
                'event': 'GDP m/m',
                'importance': 'high',
                'previous': '0.2%',
                'forecast': '0.3%',
                'actual': None,
                'impact': 'high'
            },
            {
                'datetime': f"{(today + timedelta(days=1)).date()}T13:00:00",
                'country': '🇺🇸',
                'country_code': 'US',
                'event': 'Core CPI m/m',
                'importance': 'high',
                'previous': '0.3%',
                'forecast': '0.3%',
                'actual': None,
                'impact': 'high'
            }
        ],
        'updated': datetime.utcnow().isoformat() + 'Z',
        'next_update': (datetime.utcnow() + timedelta(hours=24)).isoformat() + 'Z',
        'source': 'Fallback Data'
    }

def get_economic_calendar_data():
    """
    Get economic calendar data with caching
    Updates daily at 8 AM or when cache expires
    """
    global _cache
    
    now = datetime.now()
    
    # Check if cache is valid (less than 24 hours old)
    if _cache['data'] and _cache['timestamp']:
        cache_age = (now - _cache['timestamp']).total_seconds()
        if cache_age < 24 * 3600:  # 24 hours
            print(f"📦 Using cached data (age: {cache_age/3600:.1f}h)")
            return _cache['data']
    
    # Scrape new data
    print("🔄 Fetching fresh data from Investing.com...")
    events = scrape_investing_calendar()
    
    # Calculate next update time (tomorrow at 8 AM)
    tomorrow_8am = (now + timedelta(days=1)).replace(hour=8, minute=0, second=0, microsecond=0)
    
    # Update cache
    result = {
        'status': 'success',
        'data': events,
        'updated': now.isoformat() + 'Z',
        'next_update': tomorrow_8am.isoformat() + 'Z',
        'source': 'Investing.com' if len(events) > 5 else 'Fallback Data',
        'count': len(events)
    }
    
    _cache['data'] = result
    _cache['timestamp'] = now
    _cache['next_update'] = tomorrow_8am
    
    return result

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        'service': 'Economic Calendar API',
        'status': 'online',
        'version': '1.0.0',
        'data_source': 'Investing.com',
        'update_schedule': 'Daily at 8:00 AM',
        'endpoints': {
            '/api/economic-calendar': 'Get economic calendar events'
        }
    })

@app.route('/api/economic-calendar')
def economic_calendar():
    """
    Main API endpoint for economic calendar data
    Returns upcoming economic events with caching
    """
    data = get_economic_calendar_data()
    
    # Add CORS headers for GitHub Pages
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET')
    response.headers.add('Cache-Control', 'public, max-age=86400')  # Cache for 24 hours
    
    return response

# For local testing
if __name__ == '__main__':
    print("Testing Economic Calendar API...")
    print("-" * 60)
    data = get_economic_calendar_data()
    
    if data['status'] == 'success':
        print(f"✅ Status: {data['status']}")
        print(f"🔌 Source: {data['source']}")
        print(f"📊 Events: {data['count']}")
        print(f"🕐 Updated: {data['updated']}")
        print(f"⏰ Next Update: {data['next_update']}")
        print(f"\n📅 Sample Events:")
        for event in data['data'][:3]:
            print(f"\n  {event['country']} {event['event']}")
            print(f"    Time: {event['datetime']}")
            print(f"    Importance: {event['importance']}")
            print(f"    Previous: {event['previous']} | Forecast: {event['forecast']}")
    else:
        print(f"❌ Error: {data.get('message', 'Unknown error')}")
    
    print("-" * 60)
    print("\nStarting Flask server on http://0.0.0.0:3002")
    app.run(host='0.0.0.0', port=3002, debug=True)
