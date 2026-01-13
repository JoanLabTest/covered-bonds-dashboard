#!/usr/bin/env python3
"""
Merge historical data (2010-2023) with existing data (2024-2026)
and create the complete traditional-bonds-data.js file
"""

import json
import re

# Charger les données historiques
with open('traditional-bonds-historical-data.json', 'r') as f:
    historical_data = json.load(f)

# Charger les données existantes 2024-2026 depuis traditional-bonds-data.js
with open('traditional-bonds-data.js', 'r') as f:
    existing_content = f.read()

# Extraire les données 2024-2026 existantes
# On cherche le tableau traditionalBondsData
match = re.search(r'const traditionalBondsData = \[(.*?)\];', existing_content, re.DOTALL)
if match:
    # Parser manuellement les objets JavaScript
    existing_data_str = match.group(1)
    # Pour simplifier, on va juste compter combien il y en a
    existing_count = existing_data_str.count('"issuer":') + existing_data_str.count('issuer:')
    print(f"Found {existing_count} existing emissions (2024-2026)")
else:
    print("Could not find existing data")
    existing_count = 0

# Extraire les données secondaires et news
secondary_match = re.search(r'const traditionalSecondaryMarket = \{(.*?)\};', existing_content, re.DOTALL)
news_match = re.search(r'const traditionalNews = \[(.*?)\];', existing_content, re.DOTALL)

secondary_data = secondary_match.group(0) if secondary_match else ""
news_data = news_match.group(0) if news_match else ""

# Créer le nouveau fichier JavaScript
js_content = '''// ============================================
// TRADITIONAL COVERED BONDS DATA
// Historical Market Data 2010-2026
// Total: ''' + str(len(historical_data) + existing_count) + ''' emissions
// ============================================

// ============================================
// PRIMARY MARKET - EMISSIONS (2010-2026)
// ============================================
const traditionalBondsData = [
'''

# Ajouter les données historiques (2010-2023)
for i, emission in enumerate(historical_data):
    js_content += '    {\n'
    js_content += f'        issuer: "{emission["issuer"]}",\n'
    js_content += f'        amount: {emission["amount"]},\n'
    js_content += f'        currency: "{emission["currency"]}",\n'
    js_content += f'        type: "{emission["type"]}",\n'
    js_content += f'        issueDate: "{emission["issueDate"]}",\n'
    js_content += f'        maturity: "{emission["maturity"]}",\n'
    js_content += f'        coupon: {emission["coupon"]},\n'
    js_content += f'        spread: {emission["spread"]},\n'
    js_content += f'        status: "{emission["status"]}",\n'
    js_content += f'        rating: "{emission["rating"]}",\n'
    js_content += f'        greenBond: {str(emission["greenBond"]).lower()},\n'
    js_content += f'        country: "{emission["country"]}",\n'
    js_content += f'        isin: "{emission["isin"]}"\n'
    js_content += '    },\n'

# Ajouter un commentaire pour séparer
js_content += '\n    // ============================================\n'
js_content += '    // EMISSIONS 2024-2026 (Current Period)\n'
js_content += '    // ============================================\n'

# Extraire et ajouter les données 2024-2026 existantes
if match:
    # On va extraire chaque objet individuellement
    objects = []
    current_obj = ""
    brace_count = 0
    in_object = False
    
    for char in existing_data_str:
        if char == '{':
            brace_count += 1
            in_object = True
        if in_object:
            current_obj += char
        if char == '}':
            brace_count -= 1
            if brace_count == 0 and in_object:
                objects.append(current_obj)
                current_obj = ""
                in_object = False
    
    # Ajouter chaque objet
    for i, obj in enumerate(objects):
        js_content += '    ' + obj.strip()
        if i < len(objects) - 1:
            js_content += ','
        js_content += '\n'

js_content += '];\n\n'

# Ajouter les données secondaires et news
js_content += '// ============================================\n'
js_content += '// SECONDARY MARKET DATA\n'
js_content += '// ============================================\n'
js_content += secondary_data + '\n\n'

js_content += '// ============================================\n'
js_content += '// NEWS DATA\n'
js_content += '// ============================================\n'
js_content += news_data + '\n'

# Sauvegarder le nouveau fichier
output_file = 'traditional-bonds-data-new.js'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"\n✅ Successfully created {output_file}")
print(f"📊 Total emissions: {len(historical_data) + existing_count}")
print(f"   - Historical (2010-2023): {len(historical_data)}")
print(f"   - Current (2024-2026): {existing_count}")
print(f"\n🌱 Green bonds: {sum(1 for e in historical_data if e['greenBond'])} ({sum(1 for e in historical_data if e['greenBond'])/len(historical_data)*100:.1f}%)")
print(f"\n📅 Date range: {min(e['issueDate'] for e in historical_data)} to 2026-xx-xx")
