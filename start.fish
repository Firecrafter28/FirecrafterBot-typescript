#!/bin/fish

if test (count $argv) -gt 0 -a $argv[1] = "compile"
    echo "Compiling TypeScript..."
    tsc
    if test $status -ne 0
        echo "Compilation failed!"
        exit 1
    end
end

if not test -f ./.TOKEN
    echo "Put your bot token in \"./.TOKEN\"!"
    exit 255
end

set -x TOKEN (cat ./.TOKEN)

bun ./dist/main.js
