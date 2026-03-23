#!/bin/fish
while true
    echo "Starting..."
    tsc
    bun "./dist/main.js"
    echo "Restarting..."
end