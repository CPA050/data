#!/bin/bash
cd "C:/Users/cpa/Desktop/dsh/repo/fixed" || exit 1
export DB_FILE="C:/Users/cpa/AppData/Local/Temp/oq-selfcheck.db"
rm -f "$DB_FILE" "$DB_FILE-shm" "$DB_FILE-wal"
node dev/server.mjs > /tmp/srv-selfcheck.log 2>&1 &
SRV=$!
node node_modules/vite/bin/vite.js --port 5173 --strictPort > /tmp/vite-selfcheck.log 2>&1 &
VIT=$!
ready=0
for i in $(seq 1 60); do
  if curl -s -o /dev/null http://localhost:5173/ && curl -s -o /dev/null http://127.0.0.1:8788/api/health; then ready=1; break; fi
  sleep 0.5
done
if [ "$ready" != "1" ]; then
  echo "SERVERS NOT READY"; cat /tmp/srv-selfcheck.log | tail -5; kill $SRV $VIT 2>/dev/null; exit 1
fi
node dev/selfcheck-bank.mjs
CODE=$?
kill $SRV $VIT 2>/dev/null
exit $CODE
