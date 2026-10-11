#!/usr/bin/env python3
"""Create static pt->en/es/ru learning content with offline Argos Translate.
This is a one-time content generation tool. The EduCashPro website never calls an MT service.
"""
import argparse
import json
import re
import time
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PARTS=[ROOT/f"book-quiz-content-part{i}.js" for i in range(1,5)]
PAIRS={"en":[("pt","en")],"es":[("pt","es")],"ru":[("pt","en"),("en","ru")]}
LOCALES=("en","es","ru")

def original_chapters():
    chapters=[]
    for path in PARTS:
        s=path.read_text(encoding="utf8")
        start=s.index("const chapters=")+len("const chapters=")
        end=s.index("; (window.EduCashProBookQuizChapters",start)
        chapters.extend(json.loads(s[start:end]))
    assert len(chapters)==21 and sum(len(c["lessons"]) for c in chapters)==252
    return chapters

def setup_translation(locale):
    from argostranslate import package,translate
    package.update_package_index()
    available=package.get_available_packages()
    for src,dest in PAIRS[locale]:
        installed=translate.get_installed_languages()
        has_model=any(l.code==src and any(to.code==dest for to in l.translations_to) for l in installed)
        if has_model:continue
        model=next((p for p in available if p.from_code==src and p.to_code==dest),None)
        if model is None:raise RuntimeError(f"Offline language model missing: {src}->{dest}")
        print(f"Installing {src}->{dest}",flush=True)
        package.install_from_path(model.download())
    return translate

def normalize_source(value):
    # The Portuguese financial term means involuntary layoffs rather than resignation.
    return value.replace("demissão coletiva","dispensa em massa de trabalhadores")

def produce(locale):
    translator=setup_translation(locale)
    chapters=original_chapters()
    cache={}
    count=0
    begin=time.time()
    def translate(value):
        nonlocal count
        if value in cache:return cache[value]
        out=translator.translate(normalize_source(value),"pt",locale).strip()
        out=re.sub(r"\s+"," ",out).strip()
        if not out or len(out)<3:raise ValueError(f"Invalid translation ({locale}): {value!r} -> {out!r}")
        cache[value]=out
        count+=1
        return out
    for chapter in chapters:
        chapter["title"]=translate(chapter["title"])
        chapter["overview"]=translate(chapter["overview"])
        chapter["lessons"]=[[translate(field) for field in lesson] for lesson in chapter["lessons"]]
        print(f"{locale}: chapter {chapter['id']:02d}/21; strings {count}; {round(time.time()-begin,1)}s",flush=True)
    assert sum(len(c["lessons"]) for c in chapters)==252
    assert all(len(c["lessons"])==12 and all(len(l)==4 and all(isinstance(x,str) and x.strip() for x in l) for l in c["lessons"]) for c in chapters)
    path=ROOT/f"book-quiz-content-{locale}.js"
    code="(function(){'use strict';window.EduCashProBookQuizTranslations=window.EduCashProBookQuizTranslations||{};window.EduCashProBookQuizTranslations."+locale+"="+json.dumps(chapters,ensure_ascii=False,separators=(",",":"))+";})();\n"
    path.write_text(code,encoding="utf8")
    print(f"CREATED {path.name} size={path.stat().st_size} strings={count}",flush=True)

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--language",choices=LOCALES,required=True)
    a=p.parse_args()
    produce(a.language)
