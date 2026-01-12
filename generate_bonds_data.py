import json
import random
from datetime import datetime, timedelta

issuers = [
    {"name": "Deutsche Pfandbriefbank", "country": "Germany", "type": "Mortgage Pfandbrief", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "Münchener Hypothekenbank", "country": "Germany", "type": "Mortgage Pfandbrief", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "Berlin Hyp", "country": "Germany", "type": "Green Pfandbrief", "rating": "Aa1/AA+", "currency": "EUR"},
    {"name": "Aareal Bank", "country": "Germany", "type": "Mortgage Pfandbrief", "rating": "Aa3/AA-", "currency": "EUR"},
    {"name": "Commerzbank", "country": "Germany", "type": "Mortgage Pfandbrief", "rating": "Aa2/AA", "currency": "EUR"},
    {"name": "Crédit Foncier de France", "country": "France", "type": "Obligations Foncières", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "SFIL", "country": "France", "type": "Obligations Foncières", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "Compagnie de Financement Foncier", "country": "France", "type": "Obligations Foncières", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "Crédit Agricole", "country": "France", "type": "Green Obligations Foncières", "rating": "Aa3/AA-", "currency": "EUR"},
    {"name": "BPCE SFH", "country": "France", "type": "Obligations de Financement de l'Habitat", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "Cédulas TDA", "country": "Spain", "type": "Cédulas Hipotecarias", "rating": "Aa2/AA", "currency": "EUR"},
    {"name": "BBVA", "country": "Spain", "type": "Cédulas Hipotecarias", "rating": "A1/A+", "currency": "EUR"},
    {"name": "Santander", "country": "Spain", "type": "Cédulas Territoriales", "rating": "A2/A", "currency": "EUR"},
    {"name": "CaixaBank", "country": "Spain", "type": "Cédulas Hipotecarias", "rating": "Baa1/BBB+", "currency": "EUR"},
    {"name": "ABN AMRO", "country": "Netherlands", "type": "Covered Bond", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "ING Bank", "country": "Netherlands", "type": "Green Covered Bond", "rating": "Aa3/AA-", "currency": "EUR"},
    {"name": "Rabobank", "country": "Netherlands", "type": "Covered Bond", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "Nordea", "country": "Sweden", "type": "Covered Bond", "rating": "Aaa/AAA", "currency": "SEK"},
    {"name": "Swedbank", "country": "Sweden", "type": "Green Covered Bond", "rating": "Aaa/AAA", "currency": "SEK"},
    {"name": "Danske Bank", "country": "Denmark", "type": "Covered Bond", "rating": "Aa1/AA+", "currency": "DKK"},
    {"name": "Nykredit", "country": "Denmark", "type": "SDO", "rating": "Aaa/AAA", "currency": "DKK"},
    {"name": "DNB Boligkreditt", "country": "Norway", "type": "Covered Bond", "rating": "Aaa/AAA", "currency": "NOK"},
    {"name": "RBC", "country": "Canada", "type": "Covered Bond", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "TD Bank", "country": "Canada", "type": "Covered Bond", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "BMO", "country": "Canada", "type": "Covered Bond", "rating": "Aa1/AA+", "currency": "EUR"},
    {"name": "CIBC", "country": "Canada", "type": "Covered Bond", "rating": "Aaa/AAA", "currency": "EUR"},
    {"name": "Lloyds Bank", "country": "UK", "type": "Covered Bond", "rating": "A1/A+", "currency": "GBP"},
    {"name": "Nationwide", "country": "UK", "type": "Covered Bond", "rating": "Aa3/AA-", "currency": "GBP"},
    {"name": "Barclays", "country": "UK", "type": "Covered Bond", "rating": "A2/A", "currency": "GBP"},
    {"name": "HSBC UK", "country": "UK", "type": "Covered Bond", "rating": "Aa3/AA-", "currency": "GBP"},
    {"name": "UniCredit", "country": "Italy", "type": "OBG", "rating": "Baa1/BBB+", "currency": "EUR"},
    {"name": "Intesa Sanpaolo", "country": "Italy", "type": "OBG", "rating": "Baa2/BBB", "currency": "EUR"},
    {"name": "Erste Group", "country": "Austria", "type": "Covered Bond", "rating": "Aa2/AA", "currency": "EUR"},
    {"name": "KBC Bank", "country": "Belgium", "type": "Covered Bond", "rating": "Aa3/AA-", "currency": "EUR"},
    {"name": "Belfius", "country": "Belgium", "type": "Pandbrieven", "rating": "A1/A+", "currency": "EUR"},
    {"name": "Caixa Geral", "country": "Portugal", "type": "Obrigações Hipotecárias", "rating": "Baa3/BBB-", "currency": "EUR"}
]

start_date = datetime(2015, 1, 1)
end_date = datetime(2026, 12, 31)
data = []

# Generate roughly 450-500 bonds
for _ in range(480):
    issuer = random.choice(issuers)
    
    # Date logic
    days_range = (end_date - start_date).days
    random_days = random.randint(0, days_range)
    issue_date = start_date + timedelta(days=random_days)
    
    # Maturity (3 to 10 years)
    maturity_years = random.randint(3, 10)
    maturity_date = issue_date + timedelta(days=maturity_years*365)
    
    # Coupon logic based on year (simplified market trends)
    year = issue_date.year
    base_rate = 0.5
    if year >= 2022: base_rate = 2.5
    if year >= 2023: base_rate = 3.5
    if year <= 2021: base_rate = 0.1
    
    coupon = round(base_rate + random.uniform(0, 1.5), 3)
    
    # Amount (300M to 2000M)
    amounts = [500, 750, 1000, 1250, 1500, 2000]
    amount = random.choice(amounts)
    
    # Spread
    spread = random.randint(15, 65)
    if year >= 2023: spread += 15 # Wider spreads recently
    
    # Status
    status = "Active"
    if maturity_date < datetime.now():
        status = "Mature"
    elif issue_date > datetime.now():
        status = "Upcoming"
        
    # Green bond override
    green = "Green" in issuer['type'] or random.random() < 0.15
    if green: 
        if "Green" not in issuer['type']:
            # Append green to type if not there but selected
            pass 
    
    isin = "{}{}".format(issuer['country'][:2].upper(), ''.join(random.choices('0123456789ABCDEF', k=10)))

    bond = {
        "issuer": issuer['name'],
        "amount": amount,
        "currency": issuer['currency'],
        "type": issuer['type'],
        "issueDate": issue_date.strftime("%Y-%m-%d"),
        "maturity": maturity_date.strftime("%Y-%m-%d"),
        "coupon": coupon,
        "spread": spread,
        "status": status,
        "rating": issuer['rating'],
        "greenBond": green,
        "country": issuer['country'],
        "isin": isin
    }
    data.append(bond)

# Sort by issue date descending
data.sort(key=lambda x: x['issueDate'], reverse=True)

print(json.dumps(data, indent=2))
