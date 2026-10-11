#!/usr/bin/env python3
"""Check offline translation models; no website or runtime translation API needed."""
import time
from argostranslate import package, translate
started=time.time()
print("Checking Argos Translate package index",flush=True)
package.update_package_index()
available=package.get_available_packages()
print("Package pairs",[(p.from_code,p.to_code) for p in available if (p.from_code,p.to_code) in {("pt","en"),("en","es"),("en","ru"),("pt","es"),("pt","ru")}],flush=True)
required=[("pt","en"),("en","es"),("en","ru")]
for pair in required:
    item=next((p for p in available if (p.from_code,p.to_code)==pair),None)
    if item is None:
        raise RuntimeError("Required language model unavailable: "+str(pair))
    print("Downloading",pair,flush=True)
    package.install_from_path(item.download())
print("Packages installed",round(time.time()-started,2),"s",flush=True)
for lang in ("en","es","ru"):
    original="Uma empresa considerada estável anuncia uma demissão coletiva."
    print(lang,translate.translate(original,"pt",lang),flush=True)
print("TOTAL",round(time.time()-started,2),"s")
