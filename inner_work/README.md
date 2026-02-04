# HackerRank-Like Coding Platform

A complete competitive coding platform similar to HackerRank, built with React, Node.js, and Supabase. Features secure code execution, multiple programming languages, test case evaluation, and user progress tracking.

## 🚀 Features

### Core Functionality
- **Multi-Language Support**: C, C++, Java, Python, JavaScript, TypeScript
- **Secure Code Execution**: Sandboxed execution with time and memory limits
- **Test Case Evaluation**: Public and hidden test cases
- **Two Workflows**:
  - **Run**: Execute code with public test cases only (instant feedback)
  - **Submit**: Evaluate with all test cases and save to database
- **Real-time Results**: See execution time, memory usage, and detailed verdicts

### User Features
- User authentication and profiles
- Problem browsing with difficulty filters
- Submission history tracking
- Performance statistics (problems solved, success rate, language usage)
- User rankings and leaderboards

### Admin Features
- Problem creation and management
- Test case management (public/hidden)
- Code template creation for all languages
- Submission monitoring

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Judge0 API key (optional, for production use)

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install execution service dependencies
cd execution-service
npm install
cd ..
```

### 2. Set Up Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema:
   ```bash
   # Copy the contents of scripts/setup-database.sql
   # Paste and execute in Supabase SQL Editor
   ```
3. (Optional) Seed sample problems:
   ```bash
   # Copy the contents of scripts/seed-problems.sql
   # Paste and execute in Supabase SQL Editor
   ```

### 3. Configure Environment Variables

**Frontend (.env):**
```bash
cp .env.example .env
```

Edit `.env`:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_EXECUTION_API_URL=http://localhost:8000
```

**Backend (execution-service/.env):**
```bash
cd execution-service
cp .env.example .env
```

Edit `execution-service/.env`:
```bash
PORT=8000

# Optional: For production with all languages
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key

# Get Judge0 API key from: https://rapidapi.com/judge0-official/api/judge0-ce
```

### 4. Start the Services

**Terminal 1 - Execution Service:**
```bash
cd execution-service
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Architecture

### Frontend (React + Vite)
- **Components**:
  - `CodeSpace`: Main coding interface with Monaco editor
  - `ProblemPanel`: Problem description and examples
  - `OutputPanel`: Test results and execution metrics
  - `Dashboard`: User profile and statistics
  - `Admin`: Problem management interface

### Backend (Node.js + Express)
- **Execution Service**: Handles code compilation and execution
- **Judge0 Integration**: Production-ready sandboxed execution
- **Fallback Execution**: Local execution for JS/Python in development

### Database (Supabase/PostgreSQL)
- `problems`: Problem metadata and constraints
- `test_cases`: Public and hidden test cases
- `submissions`: User submission history
- `user_stats`: Performance tracking
- `code_templates`: Language-specific starter code

## 📝 Usage

### For Users

1. **Browse Problems**: View available coding problems with difficulty levels
2. **Select a Problem**: Click to open in CodeSpace
3. **Write Code**: Use the Monaco editor with syntax highlighting
4. **Run Code**: Test with public test cases (instant feedback)
5. **Submit**: Evaluate with all test cases and save submission
6. **Track Progress**: View statistics and submission history

### For Admins

1. **Login as Admin**: Use admin credentials
2. **Create Problem**: Add title, description, constraints
3. **Add Test Cases**: Mark as public or hidden
4. **Upload Templates**: Provide starter code for each language
5. **Monitor Submissions**: View all user submissions

## 🔒 Security

- **Sandboxed Execution**: Code runs in isolated containers
- **Resource Limits**: Enforced CPU time and memory limits
- **No File Access**: Prevented file system operations
- **No Network Access**: Blocked external network calls
- **Rate Limiting**: Prevents spam and abuse

## 🧪 Verdict Types

- **Accepted**: All test cases passed ✅
- **Wrong Answer**: Output doesn't match expected ❌
- **Time Limit Exceeded**: Execution took too long ⏱️
- **Runtime Error**: Code crashed during execution 💥
- **Compilation Error**: Code failed to compile 🔧
- **Memory Limit Exceeded**: Used too much memory 💾

## 📊 Database Schema

See `scripts/setup-database.sql` for the complete schema including:
- Tables with proper relationships
- Indexes for performance
- Row Level Security (RLS) policies
- Triggers for automatic updates

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Railway/Render/Heroku)
```bash
cd execution-service
# Deploy with your platform's CLI
```

### Database
- Supabase handles hosting automatically
- Configure production environment variables

## 🛠️ Development

### Project Structure
```
interview-tester/
├── src/
│   ├── components/
│   │   ├── CodeSpace/
│   │   ├── Admin/
│   │   └── Dashboard.jsx
│   ├── lib/
│   │   ├── api.js          # Execution service client
│   │   ├── supabase.js     # Database helpers
│   │   └── compiler.js     # Code execution wrapper
│   └── App.jsx
├── execution-service/
│   ├── controllers/
│   ├── services/
│   └── server.js
├── scripts/
│   ├── setup-database.sql
│   └── seed-problems.sql
└── package.json
```

### Adding a New Language

1. Update `execution-service/services/judge0Client.js`:
   ```javascript
   const LANGUAGE_IDS = {
     'newlang': XX  // Judge0 language ID
   };
   ```

2. Add default template in `CodeSpace.jsx`:
   ```javascript
   const DEFAULT_TEMPLATES = {
     newlang: `// Your template code`
   };
   ```

3. Update language selector in `CodeSpace.jsx`

## 📚 API Documentation

### POST /execute
Execute code with public test cases (RUN workflow)

**Request:**
```json
{
  "language": "python",
  "source_code": "print('Hello')",
  "test_cases": [
    {"input": "", "expected_output": "Hello", "is_public": true}
  ]
}
```

**Response:**
```json
{
  "verdict": "pass",
  "testCases": [
    {
      "input": "",
      "expected": "Hello",
      "actual": "Hello",
      "status": "Passed"
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
  "source_code": "print('Hello')",
  "test_cases": [
    {"input": "", "expected_output": "Hello", "is_public": true},
    {"input": "", "expected_output": "Hello", "is_public": false}
  ]
}
```

**Response:**
```json
{
  "verdict": "Accepted",
  "test_cases_passed": 2,
  "total_test_cases": 2,
  "execution_time": 45,
  "memory_used": 2048,
  "public_results": [...]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🐛 Troubleshooting

### Execution service not starting
- Check if port 8000 is available
- Verify Node.js version (18+)
- Check execution-service/.env configuration

### Database connection issues
- Verify Supabase URL and anon key
- Check RLS policies are configured
- Ensure tables are created

### Code execution failing
- If Judge0 not configured, only JS/Python work in fallback mode
- Check execution service logs
- Verify API key if using Judge0

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review execution service logs
- Verify environment variables
- Check Supabase dashboard for database issues

---

**Built with ❤️ using React, Node.js, and Supabase**
