#!/bin/bash
newman run cognitest_tasks.collection.json 
  -e cognitest_tasks.env.json 
  --reporters cli,html 
  --reporter-html-export newman-report.html