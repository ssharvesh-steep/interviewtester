# Execution Service

Backend service for secure code execution supporting multiple programming languages.

## Features

- **Multi-language support**: C, C++, Java, Python, JavaScript, TypeScript
- **Judge0 Integration**: Production-ready code execution with sandboxing
- **Fallback Execution**: Local execution for JavaScript/Python when Judge0 is not configured
- **Security**: Time and memory limits, isolated execution
- **Two Workflows**:
  - `/execute`: Run code with public test cases only
  - `/submit`: Submit code with all test cases for evaluation

## Setup

1. Install dependencies:
```bash
cd execution-service
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env and add your Judge0 API key (optional)
```

3. Start the service:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

## API Endpoints

### POST /execute
Execute code with public test cases (RUN workflow)

**Request:**
```json
{
  "language": "python",
  "source_code": "def sum(a, b):\n    return a + b",
  "test_cases": [
    {"input": "5\n7", "expected_output": "12", "is_public": true}
  ],
  "time_limit": 2,
  "memory_limit": 256000
}
```

**Response:**
```json
{
  "verdict": "pass",
  "testCases": [
    {
      "input": "5\n7",
      "expected": "12",
      "actual": "12",
      "status": "Passed",
      "execution_time": 0.05,
      "memory_used": 2048
    }
  ]
}
```

### POST /submit
Submit code with all test cases (SUBMIT workflow)

**Request:**
```json
{
  "language": "python",
  "source_code": "def sum(a, b):\n    return a + b",
  "test_cases": [
    {"input": "5\n7", "expected_output": "12", "is_public": true},
    {"input": "10\n20", "expected_output": "30", "is_public": false}
  ],
  "time_limit": 2,
  "memory_limit": 256000
}
```

**Response:**
```json
{
  "verdict": "Accepted",
  "test_cases_passed": 2,
  "total_test_cases": 2,
  "execution_time": 50,
  "memory_used": 2048,
  "error_message": null,
  "public_results": [
    {
      "input": "5\n7",
      "expected": "12",
      "actual": "12",
      "status": "Passed"
    }
  ]
}
```

## Verdict Types

- `Accepted`: All test cases passed
- `Wrong Answer`: Output doesn't match expected
- `Time Limit Exceeded`: Execution took too long
- `Runtime Error`: Code crashed during execution
- `Compilation Error`: Code failed to compile
- `Memory Limit Exceeded`: Used too much memory

## Judge0 Setup (Optional)

For production use with all languages, sign up for Judge0:

1. Go to https://rapidapi.com/judge0-official/api/judge0-ce
2. Subscribe to a plan (free tier available)
3. Copy your API key
4. Add to `.env`: `JUDGE0_API_KEY=your_key_here`

Without Judge0, the service will use fallback execution (JavaScript and Python only).
