name: Equitee Autonomous Cycle

on:
  schedule:
    # This runs every 2 hours. Note the single quotes!
    - cron: '0 */2 * * *'
  workflow_dispatch: # Allows you to run it manually to test

jobs:
  run-cycle:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Dependencies
        run: npm install

      - name: Execute Autonomous Cycle
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
        # Use node --experimental-strip-types to run .ts natively in Node 22+
        run: node --experimental-strip-types services/autonomousOrchestrator.ts
