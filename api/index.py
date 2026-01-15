"""
Vercel Serverless Function Entry Point
Imports the Flask app from market.py
"""

from market import app

# This is the handler that Vercel will call
# Vercel looks for 'app' in index.py, app.py, or main.py
