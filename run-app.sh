# #!/usr/bin/env bash

# WORKSPACE="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; git rev-parse --show-toplevel )"
# echo $WORKSPACE
# UI_PATH=$WORKSPACE/vita-app
# echo $UI_PATH
# # cd $WORKSPACE/vita-app
# cd $UI_PATH
# # pushd ${UI_PATH}

# # npm run dev

#!/usr/bin/env bash

#!/bin/bash

# Start Flask server in the background
echo "Starting Flask server..."
python3 app.py &
WORKSPACE="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; git rev-parse --show-toplevel )"
eh
# Wait for a few seconds to ensure Flask is up and running
sleep 2

# Start npm run dev
echo "Starting npm run dev..."
npm run dev