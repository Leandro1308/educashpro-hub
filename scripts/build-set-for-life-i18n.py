#!/usr/bin/env python3
"""Create read-only static translations of the author's educational interpretations."""
import argparse
import json
import re
import time
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PATHS=[ROOT/f"set-for-life-part{i}.js" for i in range(1,5)]
ROUTES={"en":[("pt","en")],"es":[("pt","en"),("en","es")],"ru":[("pt","en"),("en","ru")]}
TITLES={
"en":["Building the First $25,000 Through Frugality","How to Live an Efficient Lifestyle","What to Do with Savings","Turning Housing into an Income-Producing Asset","The Financial Impact of Housing Choices","How to Earn More Income","Growing a Scalable Career","Understanding Financial Freedom","Principles of Investing for Early Freedom","Investing in the Stock Market","Real Estate Investing","Tracking Financial Progress","Habits That Support Financial Freedom","Putting the Plan into Practice","Appendix: U.S. Retirement Accounts"],
"es":["Construir los primeros 25.000 dólares con frugalidad","Cómo vivir de manera eficiente","Qué hacer con el dinero ahorrado","Convertir la vivienda en un activo que genera ingresos","El impacto financiero de las decisiones de vivienda","Cómo aumentar los ingresos","Desarrollar una carrera con potencial de crecimiento","Comprender la libertad financiera","Principios de inversión para la independencia financiera","Invertir en bolsa","Inversión inmobiliaria","Cómo medir el progreso financiero","Hábitos para la libertad financiera","Poner en práctica el plan","Apéndice: cuentas de jubilación de Estados Unidos"],
"ru":["Первые 25 000 долларов благодаря бережливости","Как жить экономно и эффективно","Как распорядиться накоплениями","Как превратить жильё в источник дохода","Финансовые последствия выбора жилья","Как увеличить доход","Развитие карьеры с потенциалом роста","Что такое финансовая свобода","Принципы инвестирования для финансовой независимости","Инвестиции в фондовый рынок","Инвестиции в недвижимость","Как отслеживать финансовый прогресс","Привычки на пути к финансовой свободе","Как применять финансовый план","Приложение: пенсионные счета в США"]
}
def load_data():
    all_chapters=[]
    for p in PATHS:
        data=p.read_text(encoding="utf8")
        match=re.search(r"\.push\(\.\.\.(\[.*\])\);\}\)\(\);",data,re.S)
        if not match:raise ValueError("Unable to extract course data "+str(p))
        all_chapters.extend(json.loads(match.group(1)))
    all_chapters.sort(key=lambda c:c["id"])
    assert [c["id"] for c in all_chapters]==list(range(1,16))
    assert all(len(c["lessons"])==12 for c in all_chapters)
    return all_chapters
def install(lang):
    from argostranslate import package,translate
    package.update_package_index()
    models=package.get_available_packages()
    for a,b in ROUTES[lang]:
        found=next((p for p in models if p.from_code==a and p.to_code==b),None)
        if not found:raise RuntimeError("Model unavailable "+a+" -> "+b)
        package.install_from_path(found.download())
    return translate
def main(lang):
    engine=install(lang)
    cache={}
    def loc(text):
        if text not in cache:
            result=engine.translate(text,"pt",lang).strip()
            if not result or len(result)<5:raise ValueError("No translation: "+text)
            cache[text]=result
        return cache[text]
    data=load_data();out=[];start=time.monotonic()
    for i,ch in enumerate(data):
        copy={k:ch[k] for k in ("id","part")}
        copy["title"]=TITLES[lang][i]
        copy["overview"]=loc(ch["overview"])
        copy["lessons"]=[[loc(value) for value in lesson] for lesson in ch["lessons"]]
        assert len(copy["lessons"])==12
        out.append(copy)
        print(lang,"module",i+1,"/15",round(time.monotonic()-start,1),"seconds",flush=True)
    asset=ROOT/f"set-for-life-{lang}.js"
    asset.write_text("(function(){'use strict';window.EduCashProSetForLifeTranslations=window.EduCashProSetForLifeTranslations||{};window.EduCashProSetForLifeTranslations."+lang+"="+json.dumps(out,ensure_ascii=False,separators=(",",":"))+";})();\n",encoding="utf8")
    print("Wrote",asset.name,asset.stat().st_size,"bytes",len(cache),"translated strings",flush=True)
if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--language",choices=list(ROUTES),required=True)
    main(p.parse_args().language)
