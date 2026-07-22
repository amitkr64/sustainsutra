#!/usr/bin/env python3
import json
import sys

# Read the package.json
with open('package.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Fix dependencies
if 'dependencies' in data:
    deps = data['dependencies']

    # Create new dict with correct keys
    new_deps = {}
    for key, value in deps.items():
        # Fix: helment -> helmet
        if 'helment' == key:
            new_deps['helmet'] = value
            print(f"✓ Fixed: helment -> helmet")
        # Fix: multer -> multer
        elif 'multer' == key:
            new_deps['multer'] = value
            print(f"✓ Fixed: multer -> multer")
        # Fix: nodemailer -> nodemailer
        elif 'nodemailer' == key:
            new_deps['nodemailer'] = value
            print(f"✓ Fixed: nodemailer -> nodemailer")
        # Fix: pdfkit -> pdfkit
        elif 'pdfkit' == key:
            new_deps['pdfkit'] = value
            print(f"✓ Fixed: pdfkit -> pdfkit")
        # Fix: winston -> winston
        elif 'winston' == key:
            new_deps['winston'] = value
            print(f"✓ Fixed: winston -> winston")
        else:
            new_deps[key] = value

    data['dependencies'] = new_deps

# Fix devDependencies
if 'devDependencies' in data:
    dev_deps = data['devDependencies']
    new_dev_deps = {}

    for key, value in dev_deps.items():
        # Fix: nodemon -> nodemon
        if 'nodemon' == key:
            new_dev_deps['nodemon'] = value
            print(f"✓ Fixed: nodemon -> nodemon")
        else:
            new_dev_deps[key] = value

    data['devDependencies'] = new_dev_deps

# Write corrected package.json
with open('package.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("\n✅ All typos fixed in package.json!")
