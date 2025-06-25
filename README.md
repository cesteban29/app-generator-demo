# App Generator Demo

A Next.js application evaluation framework using Braintrust to test and compare different AI prompt strategies for generating complete web applications.

## Prerequisites

- Node.js 18+
- pnpm
- Braintrust account and API key

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Configure Braintrust (set your API key in environment):
```bash
export BRAINTRUST_API_KEY=your_api_key_here
```

3. Push configuration to Braintrust (Go to package.json to view the full command)

```bash
pnpm run braintrust-dataset
pnpm run braintrust-scorers
pnpm run braintrust-prompts
```


## Usage

Run evaluations to test prompt performance:
```bash
pnpm run eval
```
Feel free to uncomment the 2 additional Evals evaluating the other prompts.

## Project Structure

- `braintrust/` - Evaluation configuration, prompts, datasets, and scoring functions
- `eval/` - Evaluation scripts and test runners
- `lib/` - Shared constants and utilities

## Evaluation System

The framework tests three prompt strategies (`generateApp1`, `generateApp2`, `generateApp3`) against multiple criteria:
- JSON format compliance
- Requirements fulfillment
- Code completeness

Results are tracked and compared in Braintrust for prompt optimization.

