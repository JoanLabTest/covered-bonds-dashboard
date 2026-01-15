"""
Covered Bonds Market Data API
Serverless function for Vercel that fetches real-time Euro Covered Bond market data
using iShares Euro Covered Bond UCITS ETF (ICOV.L) as a market proxy.
"""

from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
import yfinance as yf

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_covered_bond_market_data():
    """
    Fetch the latest covered bond market data using ICOV.L ETF as proxy.
    
    Returns:
        dict: Market data including price, change, trend, and metadata
    """
    try:
        # iShares Core € Corp Bond UCITS ETF - Widely available proxy for Euro bond market
        # Using corporate bonds as proxy since covered bonds ETF (ICOV.L) is not available on Yahoo Finance
        ticker_symbol = "IEAC"
        etf = yf.Ticker(ticker_symbol)
        
        # Fetch recent history (5 days to ensure we have data even after weekends)
        hist = etf.history(period="5d")
        
        if hist.empty:
            return {
                "status": "error",
                "message": "No data available from Yahoo Finance"
            }
        
        # Get the last two available data points
        last_quote = hist.iloc[-1]
        prev_quote = hist.iloc[-2] if len(hist) > 1 else last_quote
        
        # Extract key metrics
        current_price = float(last_quote['Close'])
        prev_price = float(prev_quote['Close'])
        volume = int(last_quote['Volume'])
        
        # Calculate daily change percentage
        if prev_price > 0:
            change_percent = ((current_price - prev_price) / prev_price) * 100
        else:
            change_percent = 0.0
        
        # Determine trend
        trend = "Hausse" if change_percent >= 0 else "Baisse"
        
        # Get additional ETF info
        info = etf.info
        currency = info.get('currency', 'GBP')
        
        return {
            "status": "success",
            "date": str(last_quote.name.date()),
            "asset": "Euro Corporate Bond Market (Proxy ETF)",
            "ticker": ticker_symbol,
            "price": round(current_price, 2),
            "currency": currency,
            "daily_change_percent": round(change_percent, 2),
            "trend": trend,
            "volume": volume,
            "data_source": "Yahoo Finance",
            "last_updated": datetime.utcnow().isoformat() + "Z"
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to fetch market data: {str(e)}",
            "date": datetime.utcnow().date().isoformat()
        }

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        "service": "Covered Bonds Market Data API",
        "status": "online",
        "version": "1.0.0",
        "endpoints": {
            "/api/market": "Get current covered bond market data"
        }
    })

@app.route('/api/market')
def market_data():
    """
    Main API endpoint for covered bond market data.
    This is what the dashboard will call.
    """
    data = get_covered_bond_market_data()
    
    # Add CORS headers for GitHub Pages
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET')
    
    return response

# For local testing
if __name__ == '__main__':
    print("Testing Covered Bonds Market Data API...")
    print("-" * 50)
    data = get_covered_bond_market_data()
    
    if data['status'] == 'success':
        print(f"✅ Status: {data['status']}")
        print(f"📅 Date: {data['date']}")
        print(f"💰 Price: {data['price']} {data['currency']}")
        print(f"📊 Change: {data['daily_change_percent']}%")
        print(f"📈 Trend: {data['trend']}")
        print(f"📦 Volume: {data['volume']:,}")
    else:
        print(f"❌ Error: {data['message']}")
    
    print("-" * 50)
    print("\nStarting Flask server on http://0.0.0.0:3000")
    app.run(host='0.0.0.0', port=3000, debug=True)
