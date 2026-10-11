#!/usr/bin/env python3
"""Smoke-test third-party machine translation availability for a one-time static localization build."""
import json,urllib.parse,urllib.request
sample="Uma empresa considerada estável anuncia uma demissão coletiva."
for lang in ("en","es","ru"):
  args=urllib.parse.urlencode({"client":"gtx","sl":"pt","tl":lang,"dt":"t","q":sample})
  url="https://translate.googleapis.com/translate_a/single?"+args
  req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0"})
  with urllib.request.urlopen(req,timeout=20) as resp: result=json.load(resp)
  translated="".join(part[0] for part in result[0] if part[0])
  assert translated and translated!=sample,(lang,translated)
  print(lang,repr(translated),flush=True)
