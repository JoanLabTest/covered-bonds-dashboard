"""
Digital Assets & RWA Feed API
Serverless function for Vercel that fetches real-time tokenized asset data
using CoinGecko API (free tier, no key required).
"""

from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# CoinGecko API configuration
COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3'

def get_digital_assets_data():
    """
    Fetch real-time data for tokenized assets from CoinGecko.
    
    Assets tracked:
    - Ondo USDY (Tokenized US Treasury)
    - EURC (Circle Euro - Digital Cash)
    - PAXG (Tether Gold - Commodity-backed)
    
    Returns:
        dict: Market data for digital assets
    """
    try:
        # CoinGecko IDs for tracked assets
        asset_ids = "ondo-us-dollar-yield,euro-coin,pax-gold"
        
        # API endpoint for simple price data
        params = {
            'ids': asset_ids,
            'vs_currencies': 'usd,eur',
            'include_24hr_change': 'true',
            'include_24hr_vol': 'true'
        }
        
        # Make API request
        response = requests.get(
            f"{COINGECKO_BASE_URL}/simple/price",
            params=params,
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        
        # Check if we got valid data
        if not data:
            return get_fallback_data()
        
        # Format data for frontend
        feed = []
        
        # Ondo USDY (Tokenized Treasury)
        if 'ondo-us-dollar-yield' in data:
            usdy = data['ondo-us-dollar-yield']
            feed.append({
                "ticker": "USDY (Ondo Treasury)",
                "type": "Tokenized Bond",
                "price": round(usdy.get('usd', 1.0), 4),
                "currency": "USD",
                "change": round(usdy.get('usd_24h_change', 0), 2),
                "volume": format_volume(usdy.get('usd_24h_vol', 0)),
                "yield": "5.10%"  # Static proxy yield for treasury bonds
            })
        
        # EURC (Circle Euro)
        if 'euro-coin' in data:
            eurc = data['euro-coin']
            feed.append({
                "ticker": "EURC (Circle Euro)",
                "type": "Digital Cash",
                "price": round(eurc.get('eur', 1.0), 4),
                "currency": "EUR",
                "change": round(eurc.get('eur_24h_change', 0), 2),
                "volume": format_volume(eurc.get('eur_24h_vol', 0)),
                "yield": "N/A"
            })
        
        # PAXG (Tether Gold)
        if 'pax-gold' in data:
            paxg = data['pax-gold']
            feed.append({
                "ticker": "PAXG (Tether Gold)",
                "type": "Commodity-Backed",
                "price": round(paxg.get('usd', 0), 2),
                "currency": "USD",
                "change": round(paxg.get('usd_24h_change', 0), 2),
                "volume": format_volume(paxg.get('usd_24h_vol', 0)),
                "yield": "N/A"
            })
        
        return {
            "status": "success",
            "data": feed,
            "updated": datetime.utcnow().strftime("%H:%M"),
            "source": "CoinGecko"
        }
        
    except Exception as e:
        print(f"Error fetching from CoinGecko: {str(e)}")
        return get_fallback_data()

def format_volume(volume):
    """Format volume in K/M notation"""
    if volume >= 1_000_000:
        return f"{int(volume / 1_000_000)}M"
    elif volume >= 1_000:
        return f"{int(volume / 1_000)}K"
    else:
        return str(int(volume))

def get_fallback_data():
    """
    Fallback data when API is unavailable.
    Returns realistic static data for demo purposes.
    """
    return {
        "status": "success",
        "data": [
            {
                "ticker": "USDY (Ondo Treasury)",
                "type": "Tokenized Bond",
                "price": 1.0512,
                "currency": "USD",
                "change": 0.08,
                "volume": "2500K",
                "yield": "5.10%"
            },
            {
                "ticker": "EURC (Circle Euro)",
                "type": "Digital Cash",
                "price": 1.0002,
                "currency": "EUR",
                "change": 0.01,
                "volume": "1200K",
                "yield": "N/A"
            },
            {
                "ticker": "PAXG (Tether Gold)",
                "type": "Commodity-Backed",
                "price": 2685.50,
                "currency": "USD",
                "change": -0.15,
                "volume": "850K",
                "yield": "N/A"
            }
        ],
        "updated": datetime.utcnow().strftime("%H:%M"),
        "source": "Cached Data",
        "note": "Using cached data - API may be unavailable"
    }

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        "service": "Digital Assets & RWA Feed API",
        "status": "online",
        "version": "1.0.0",
        "data_provider": "CoinGecko",
        "endpoints": {
            "/api/digital-bonds": "Get current digital assets data"
        }
    })

@app.route('/api/digital-bonds')
def digital_bonds():
    """
    Main API endpoint for digital assets data.
    Returns real-time data for tokenized assets.
    """
    data = get_digital_assets_data()
    
    # Add CORS headers for GitHub Pages
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET')
    response.headers.add('Cache-Control', 'public, max-age=3600')  # Cache for 1 hour
    
    return response

# For local testing
if __name__ == '__main__':
    print("Testing Digital Assets & RWA Feed API...")
    print("-" * 60)
    data = get_digital_assets_data()
    
    if data['status'] == 'success':
        print(f"✅ Status: {data['status']}")
        print(f"🔌 Source: {data.get('source', 'Unknown')}")
        print(f"🕐 Updated: {data['updated']}")
        print(f"\n📊 Assets ({len(data['data'])}):")
        for asset in data['data']:
            change_symbol = "▲" if asset['change'] >= 0 else "▼"
            print(f"\n  {asset['ticker']}")
            print(f"    Type: {asset['type']}")
            print(f"    Price: {asset['price']} {asset['currency']}")
            print(f"    Change: {change_symbol} {asset['change']}%")
            print(f"    Volume: {asset['volume']}")
            print(f"    Yield: {asset['yield']}")
    else:
        print(f"❌ Error: {data.get('message', 'Unknown error')}")
    
    print("-" * 60)
    print("\nStarting Flask server on http://0.0.0.0:3001")
    app.run(host='0.0.0.0', port=3001, debug=True)
