#!/usr/bin/env python3
"""
Generate realistic Traditional Covered Bonds data for 2010-2026
Creates ~480 emissions with historically accurate characteristics
"""

import json
import random
from datetime import datetime, timedelta

# Émetteurs principaux par pays
ISSUERS = {
    "Germany": [
        {"name": "Deutsche Pfandbriefbank", "type": "Mortgage Pfandbrief", "rating": "Aaa/AAA"},
        {"name": "Münchener Hypothekenbank", "type": "Mortgage Pfandbrief", "rating": "Aaa/AAA"},
        {"name": "Berlin Hyp", "type": "Mortgage Pfandbrief", "rating": "Aa1/AA+"},
        {"name": "Aareal Bank", "type": "Mortgage Pfandbrief", "rating": "Aa3/AA-"},
        {"name": "DZ HYP", "type": "Public Pfandbrief", "rating": "Aaa/AAA"},
        {"name": "Commerzbank", "type": "Mortgage Pfandbrief", "rating": "Aa2/AA"},
        {"name": "Deutsche Bank", "type": "Mortgage Pfandbrief", "rating": "A3/BBB+"},
        {"name": "Helaba", "type": "Public Pfandbrief", "rating": "Aa1/AA+"},
    ],
    "France": [
        {"name": "Crédit Foncier de France", "type": "Obligations Foncières", "rating": "Aaa/AAA"},
        {"name": "SFIL", "type": "Obligations Foncières", "rating": "Aaa/AAA"},
        {"name": "Compagnie de Financement Foncier", "type": "Obligations Foncières", "rating": "Aaa/AAA"},
        {"name": "Caisse Française de Financement Local", "type": "Obligations Foncières", "rating": "Aaa/AAA"},
        {"name": "Crédit Agricole", "type": "Obligations Foncières", "rating": "Aa3/AA-"},
        {"name": "BNP Paribas Home Loan SFH", "type": "Obligations Foncières", "rating": "Aa3/AA-"},
    ],
    "Sweden": [
        {"name": "Nordea Hypotek", "type": "Covered Bond", "rating": "Aaa/AAA"},
        {"name": "Swedbank Hypotek", "type": "Covered Bond", "rating": "Aaa/AAA"},
        {"name": "SEB", "type": "Covered Bond", "rating": "Aa1/AA+"},
        {"name": "Handelsbanken", "type": "Covered Bond", "rating": "Aaa/AAA"},
    ],
    "Denmark": [
        {"name": "Danske Bank", "type": "Covered Bond", "rating": "Aa1/AA+"},
        {"name": "Nykredit", "type": "Covered Bond", "rating": "Aaa/AAA"},
        {"name": "Realkredit Danmark", "type": "Covered Bond", "rating": "Aaa/AAA"},
    ],
    "Norway": [
        {"name": "DNB Boligkreditt", "type": "Covered Bond", "rating": "Aaa/AAA"},
        {"name": "Sparebank 1 Boligkreditt", "type": "Covered Bond", "rating": "Aaa/AAA"},
    ],
    "Netherlands": [
        {"name": "ABN AMRO Covered Bonds", "type": "Covered Bond", "rating": "Aaa/AAA"},
        {"name": "ING Covered Bonds", "type": "Covered Bond", "rating": "Aa3/AA-"},
        {"name": "Rabobank Covered Bonds", "type": "Covered Bond", "rating": "Aaa/AAA"},
    ],
    "Spain": [
        {"name": "Cédulas TDA", "type": "Cédulas Hipotecarias", "rating": "Aa2/AA"},
        {"name": "BBVA Cédulas", "type": "Cédulas Hipotecarias", "rating": "A1/A+"},
        {"name": "Santander Cédulas", "type": "Cédulas Territoriales", "rating": "A2/A"},
    ],
    "Canada": [
        {"name": "RBC Covered Bonds", "type": "Covered Bond", "rating": "Aaa/AAA"},
        {"name": "TD Bank Covered Bonds", "type": "Covered Bond", "rating": "Aaa/AAA"},
        {"name": "BMO Covered Bonds", "type": "Covered Bond", "rating": "Aa1/AA+"},
    ],
    "UK": [
        {"name": "Lloyds Covered Bonds", "type": "Covered Bond", "rating": "A1/A+"},
        {"name": "Nationwide Covered Bonds", "type": "Covered Bond", "rating": "Aa3/AA-"},
        {"name": "Barclays Covered Bonds", "type": "Covered Bond", "rating": "A2/A"},
    ],
    "Italy": [
        {"name": "UniCredit Covered Bonds", "type": "Obbligazioni Bancarie Garantite", "rating": "Baa1/BBB+"},
        {"name": "Intesa Sanpaolo Covered Bonds", "type": "Obbligazioni Bancarie Garantite", "rating": "Baa2/BBB"},
    ],
    "Austria": [
        {"name": "Erste Bank Covered Bonds", "type": "Covered Bond", "rating": "Aa2/AA"},
    ],
    "Belgium": [
        {"name": "KBC Covered Bonds", "type": "Covered Bond", "rating": "Aa3/AA-"},
    ],
    "Portugal": [
        {"name": "Caixa Geral Covered Bonds", "type": "Obrigações Hipotecárias", "rating": "Baa3/BBB-"},
    ],
}

# Devises par pays
CURRENCIES = {
    "Germany": "EUR", "France": "EUR", "Spain": "EUR", "Netherlands": "EUR",
    "Italy": "EUR", "Austria": "EUR", "Belgium": "EUR", "Portugal": "EUR",
    "Sweden": "SEK", "Denmark": "DKK", "Norway": "NOK",
    "Canada": "EUR",  # Canadian banks often issue in EUR
    "UK": "GBP"
}

# Paramètres historiques par période
PERIODS = {
    "2010-2011": {"coupon_range": (4.0, 5.5), "spread_range": (80, 120), "green_prob": 0.0},
    "2012-2013": {"coupon_range": (3.0, 4.5), "spread_range": (70, 100), "green_prob": 0.02},
    "2014-2015": {"coupon_range": (2.0, 3.5), "spread_range": (50, 80), "green_prob": 0.05},
    "2016-2017": {"coupon_range": (1.5, 2.5), "spread_range": (40, 70), "green_prob": 0.08},
    "2018-2019": {"coupon_range": (1.0, 2.0), "spread_range": (35, 60), "green_prob": 0.10},
    "2020-2021": {"coupon_range": (0.5, 1.5), "spread_range": (30, 55), "green_prob": 0.12},
    "2022-2023": {"coupon_range": (2.5, 4.0), "spread_range": (40, 65), "green_prob": 0.14},
    "2024-2026": {"coupon_range": (2.75, 4.0), "spread_range": (40, 60), "green_prob": 0.15},
}

def get_period_params(year):
    """Get parameters for a specific year"""
    if year <= 2011:
        return PERIODS["2010-2011"]
    elif year <= 2013:
        return PERIODS["2012-2013"]
    elif year <= 2015:
        return PERIODS["2014-2015"]
    elif year <= 2017:
        return PERIODS["2016-2017"]
    elif year <= 2019:
        return PERIODS["2018-2019"]
    elif year <= 2021:
        return PERIODS["2020-2021"]
    elif year <= 2023:
        return PERIODS["2022-2023"]
    else:
        return PERIODS["2024-2026"]

def generate_isin(country, year, index):
    """Generate a realistic ISIN"""
    country_codes = {
        "Germany": "DE", "France": "FR", "Spain": "ES", "Netherlands": "NL",
        "Sweden": "SE", "Denmark": "DK", "Norway": "NO", "Canada": "CA",
        "UK": "GB", "Italy": "IT", "Austria": "AT", "Belgium": "BE", "Portugal": "PT"
    }
    code = country_codes.get(country, "XX")
    return f"{code}{random.randint(1000, 9999)}{year % 100:02d}{index:04d}"

def generate_emission(country, issuer_data, issue_date, index):
    """Generate a single emission"""
    year = issue_date.year
    params = get_period_params(year)
    
    # Déterminer si c'est un Green Bond
    is_green = random.random() < params["green_prob"]
    
    # Montant (varie selon la devise)
    currency = CURRENCIES[country]
    if currency == "SEK":
        amount = random.choice([2000, 3000, 4000, 5000, 6000])
    elif currency == "DKK":
        amount = random.choice([1500, 2000, 2500, 3000, 3500])
    elif currency == "NOK":
        amount = random.choice([1000, 1500, 2000, 2500])
    elif currency == "GBP":
        amount = random.choice([300, 500, 750, 1000])
    else:  # EUR
        amount = random.choice([250, 500, 750, 1000, 1250, 1500, 2000])
    
    # Maturité (3-10 ans)
    maturity_years = random.choice([3, 5, 7, 10])
    maturity_date = issue_date + timedelta(days=365 * maturity_years)
    
    # Coupon et spread
    coupon = round(random.uniform(*params["coupon_range"]), 3)
    spread = random.randint(*params["spread_range"])
    
    # Statut
    today = datetime(2026, 1, 12)
    if issue_date > today:
        status = "Upcoming"
    elif maturity_date < today:
        status = "Mature"
    else:
        status = "Active"
    
    # Type (ajouter "Green" si applicable)
    bond_type = issuer_data["type"]
    if is_green and "Green" not in bond_type:
        bond_type = f"Green {bond_type}"
    
    return {
        "issuer": issuer_data["name"],
        "amount": amount,
        "currency": currency,
        "type": bond_type,
        "issueDate": issue_date.strftime("%Y-%m-%d"),
        "maturity": maturity_date.strftime("%Y-%m-%d"),
        "coupon": coupon,
        "spread": spread,
        "status": status,
        "rating": issuer_data["rating"],
        "greenBond": is_green,
        "country": country,
        "isin": generate_isin(country, year, index)
    }

def generate_all_emissions():
    """Generate all emissions from 2010 to 2023"""
    emissions = []
    index = 0
    
    # Distribution par année
    emissions_per_year = {
        2010: 20, 2011: 22, 2012: 24, 2013: 26, 2014: 28,
        2015: 30, 2016: 32, 2017: 34, 2018: 36, 2019: 38,
        2020: 40, 2021: 42, 2022: 44, 2023: 46
    }
    
    # Distribution géographique (en pourcentage)
    country_weights = {
        "Germany": 0.35, "France": 0.25, "Sweden": 0.10, "Denmark": 0.05,
        "Netherlands": 0.08, "Spain": 0.05, "Norway": 0.03, "Canada": 0.04,
        "UK": 0.03, "Italy": 0.01, "Austria": 0.005, "Belgium": 0.005, "Portugal": 0.005
    }
    
    for year in range(2010, 2024):
        num_emissions = emissions_per_year[year]
        
        for _ in range(num_emissions):
            # Sélectionner un pays selon les poids
            country = random.choices(
                list(country_weights.keys()),
                weights=list(country_weights.values())
            )[0]
            
            # Sélectionner un émetteur
            issuer_data = random.choice(ISSUERS[country])
            
            # Générer une date d'émission aléatoire dans l'année
            month = random.randint(1, 12)
            day = random.randint(1, 28)
            issue_date = datetime(year, month, day)
            
            # Générer l'émission
            emission = generate_emission(country, issuer_data, issue_date, index)
            emissions.append(emission)
            index += 1
    
    return emissions

if __name__ == "__main__":
    print("Generating Traditional Covered Bonds data (2010-2023)...")
    emissions = generate_all_emissions()
    
    print(f"Generated {len(emissions)} emissions")
    print(f"Date range: {min(e['issueDate'] for e in emissions)} to {max(e['issueDate'] for e in emissions)}")
    print(f"Green bonds: {sum(1 for e in emissions if e['greenBond'])} ({sum(1 for e in emissions if e['greenBond'])/len(emissions)*100:.1f}%)")
    
    # Sauvegarder en JSON
    output_file = "traditional-bonds-historical-data.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(emissions, f, indent=2, ensure_ascii=False)
    
    print(f"\nData saved to {output_file}")
    print("\nSample emission:")
    print(json.dumps(emissions[0], indent=2, ensure_ascii=False))
