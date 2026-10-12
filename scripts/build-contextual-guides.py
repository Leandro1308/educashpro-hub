#!/usr/bin/env python3
"""Generate user help as static language assets. Translation runs only in GitHub Actions."""
import argparse, json, re, time
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PAIRS={"en":[("pt","en")],"es":[("pt","en"),("en","es")],"ru":[("pt","en"),("en","ru")]}

def source():
    raw=(ROOT/"contextual-guides-pt.js").read_text(encoding="utf8")
    marker="const D="
    start=raw.index(marker)+len(marker)
    end=raw.index(";\nwindow.EduCashProGuideTranslations",start)
    obj=json.loads(raw[start:end])
    assert len(obj)>=40
    assert all(len(row)==4 and len(row[2])>=4 for row in obj.values())
    return obj

def model(lang):
    from argostranslate import package,translate
    package.update_package_index()
    available=package.get_available_packages()
    for src,dest in PAIRS[lang]:
        candidate=next((p for p in available if (p.from_code,p.to_code)==(src,dest)),None)
        if candidate is None:raise RuntimeError(f"Translation model missing {src}->{dest}")
        print("Installing model",src,dest,flush=True)
        package.install_from_path(candidate.download())
    return translate

def generate(lang):
    translate=model(lang)
    output,cache={},{}
    t0=time.monotonic()
    def loc(text):
        if text in cache:return cache[text]
        result=re.sub(r"\s+"," ",translate.translate(text,"pt",lang)).strip()
        if not result or len(result)<2:raise ValueError("Translation missing for "+repr(text))
        cache[text]=result
        return result
    for i,(key,(title,summary,steps,note)) in enumerate(source().items(),1):
        output[key]=[loc(title),loc(summary),[loc(x) for x in steps],loc(note)]
        if i%5==0:print(lang, f"{i}/{len(source())} guides", "elapsed",round(time.monotonic()-t0,1),flush=True)
    dest=ROOT/f"contextual-guides-{lang}.js"
    dest.write_text("(function(){'use strict';window.EduCashProGuideTranslations=window.EduCashProGuideTranslations||{};window.EduCashProGuideTranslations."+lang+"="+json.dumps(output,ensure_ascii=False,separators=(",",":"))+";})();\n",encoding="utf8")
    assert dest.stat().st_size>5000
    print("Created",dest.name,dest.stat().st_size,"characters",len(cache),"translated items",flush=True)
if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("--language",required=True,choices=("en","es","ru"))
    generate(parser.parse_args().language)
