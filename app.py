"""
Unified Flask Application for Railway Deployment
Combines all API endpoints: Market, Digital Bonds, Economic Calendar
"""

from flask import Flask, jsonify
from flask_cors import CORS
import os

# Import API functions from individual modules
import sys
sys.path.insert(0, os.path.dirname(__file__))

from api.market import get_covered_bond_market_data
from api.digital_bonds import get_digital_assets_data
from api.economic_calendar import get_economic_calendar_data

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    """Health check and API documentation"""
    return jsonify({
        "service": "Covered Bonds Dashboard API",
        "status": "online",
        "version": "3.0.0",
        "platform": "Railway",
        "endpoints": {
            "/api/market": "Covered bond market data (Alpha Vantage/Fallback)",
            "/api/digital-bonds": "Digital assets & RWA feed (CoinGecko)",
            "/api/economic-calendar": "Economic events calendar (Investing.com)"
        },
        "documentation": "https://github.com/JoanLabTest/covered-bonds-dashboard"
    })

@app.route('/api/market')
def market():
    """Covered Bonds Market Data API"""
    data = get_covered_bond_market_data()
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Cache-Control', 'public, max-age=3600')
    return response

@app.route('/api/digital-bonds')
def digital_bonds():
    """Digital Assets & RWA Feed API"""
    data = get_digital_assets_data()
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Cache-Control', 'public, max-age=3600')
    return response

@app.route('/api/economic-calendar')
def economic_calendar():
    """Economic Calendar API"""
    data = get_economic_calendar_data()
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Cache-Control', 'public, max-age=86400')  # 24h cache
    return response

@app.route('/health')
def health():
    """Health check endpoint for Railway"""
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
