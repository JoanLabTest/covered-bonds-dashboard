"""
Vercel Serverless Function Entry Point for Digital Bonds
Imports the Flask app from digital_bonds.py
"""

from .digital_bonds import app

# This is the handler that Vercel will call
