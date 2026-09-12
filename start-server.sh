#!/bin/bash
# Simple HTTP server for Covered Bonds Dashboard
# This allows the dashboard to load data correctly without file:// protocol restrictions

echo "🚀 Starting Covered Bonds Dashboard Server..."
echo "📍 Server will be available at: http://localhost:8000"
echo "📂 Serving from: $(pwd)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
# Fallback to Python 2
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "❌ Error: Python is not installed"
    echo "Please install Python to run the local server"
    exit 1
fi
