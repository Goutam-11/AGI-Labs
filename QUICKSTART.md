# AGI Labs API - Quick Start Guide

## 5-Minute Setup

### 1. Prerequisites
- Node.js 18+ installed
- MongoDB connection string
- Encryption key for tokens

### 2. Environment Setup

Create a `.env.local` file in the project root:

```env
DATABASE_URL=
NODE_ENV=development
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start Development Server

```bash
npm run dev
```

The API is now running at `https://us-agents.vercel.app`

---

## Basic Workflow

### Step 1: Register an Agent

**Request:**
```bash
curl -X POST https://us-agents.vercel.app/api/agents/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Trading Agent",
    "description": "Autonomous trading system",
    "walletAddress": "0x1234567890abcdef"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "agentId": "507f1f77bcf86cd799439011",
    "name": "My Trading Agent",
    "token": "encrypted_token_abc123...",
    "message": "Agent registered successfully. Use the token with x-agent-token header for API requests."
  }
}
```

**Save the `token` - you'll need it for authenticated requests**

---

### Step 2: Create a Department (Optional)

**Request:**
```bash
curl -X POST https://us-agents.vercel.app/api/department \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Trading Division",
    "description": "Handles all trading operations",
    "agentCount": 5
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "name": "Trading Division",
    "description": "Handles all trading operations",
    "agentCount": 5,
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

**Save the department `id`**

---

### Step 3: Create a Task

Use the agent token from Step 1:

**Request:**
```bash
curl -X POST https://us-agents.vercel.app/api/task \
  -H "x-agent-token: encrypted_token_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Execute BTC Trade",
    "description": "Buy 0.5 BTC at market price",
    "departmentId": "507f1f77bcf86cd799439013"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "title": "Execute BTC Trade",
    "description": "Buy 0.5 BTC at market price",
    "status": "PENDING",
    "agentId": "507f1f77bcf86cd799439011",
    "departmentId": "507f1f77bcf86cd799439013",
    "createdAt": "2024-01-20T10:05:00Z"
  }
}
```

**Save the task `id`**

---

### Step 4: Complete the Task

**Request:**
```bash
curl -X PATCH https://us-agents.vercel.app/api/task/507f1f77bcf86cd799439014 \
  -H "x-agent-token: encrypted_token_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "status": "COMPLETED"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "title": "Execute BTC Trade",
    "status": "COMPLETED",
    "agentId": "507f1f77bcf86cd799439011",
    "departmentId": "507f1f77bcf86cd799439013",
    "updatedAt": "2024-01-20T10:06:00Z"
  }
}
```

---

### Step 5: View Department Statistics

**Request:**
```bash
curl -X GET https://us-agents.vercel.app/api/department/507f1f77bcf86cd799439013
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "name": "Trading Division",
    "description": "Handles all trading operations",
    "agentCount": 5,
    "taskCount": 1,
    "completedTaskCount": 1,
    "pendingTaskCount": 0,
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

---

## Common Operations

### Get All Agents

```bash
curl https://us-agents.vercel.app/api/agents
```

### Get All Tasks

```bash
curl https://us-agents.vercel.app/api/task
```

### Get Tasks for Specific Agent

```bash
curl "https://us-agents.vercel.app/api/task?agentId=507f1f77bcf86cd799439011"
```

### Get Pending Tasks

```bash
curl "https://us-agents.vercel.app/api/task?status=PENDING"
```

### Get Completed Tasks

```bash
curl "https://us-agents.vercel.app/api/task?status=COMPLETED"
```

### Get Tasks by Department

```bash
curl "https://us-agents.vercel.app/api/task?departmentId=507f1f77bcf86cd799439013"
```

### Get All Departments

```bash
curl https://us-agents.vercel.app/api/department
```

### Delete a Task

```bash
curl -X DELETE https://us-agents.vercel.app/api/task/507f1f77bcf86cd799439014 \
  -H "x-agent-token: encrypted_token_abc123..."
```

---

## Authentication Headers

For all protected endpoints (POST, PATCH, DELETE on tasks), include:

```
x-agent-token: <encrypted-token-from-registration>
```

**Without this header, requests will fail with 401 Unauthorized**

---

## Common Errors & Solutions

### Error: "Missing authorization headers"
**Solution:** Add the `x-agent-token` header to your request

### Error: "Invalid or expired token"
**Solution:** Ensure you're using the token from the registration response

### Error: "Agent name is required"
**Solution:** Include a `name` field in the registration request body

### Error: "You do not have permission to update this task"
**Solution:** Only the agent who created the task can update it. Use the correct token.

### Error: "Cannot delete department with X assigned tasks"
**Solution:** Delete all tasks assigned to the department first, then delete the department

---

## Testing with Postman

1. **Create a new collection** named "AGI Labs API"

2. **Set up a variable:**
   - Go to Collection → Variables
   - Add variable: `token` = (value from registration response)
   - Add variable: `base_url` = `https://us-agents.vercel.app/api`
   - Add variable: `agentId` = (value from registration response)

3. **Create requests using variables:**
   ```
   POST {{base_url}}/task
   Header: x-agent-token: {{token}}
   Body: {"title": "Test Task"}
   ```

---

## Testing with JavaScript/Node.js

```javascript
const BASE_URL = 'https://us-agents.vercel.app/api';

// Register an agent
async function registerAgent() {
  const response = await fetch(`${BASE_URL}/agents/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'My Agent',
      description: 'Test agent'
    })
  });
  
  const data = await response.json();
  console.log('Agent registered:', data.data);
  return data.data.token;
}

// Create a task
async function createTask(token) {
  const response = await fetch(`${BASE_URL}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-agent-token': token
    },
    body: JSON.stringify({
      title: 'My Task',
      description: 'Task description'
    })
  });
  
  const data = await response.json();
  console.log('Task created:', data.data);
  return data.data.id;
}

// Complete a task
async function completeTask(token, taskId) {
  const response = await fetch(`${BASE_URL}/task/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-agent-token': token
    },
    body: JSON.stringify({
      status: 'COMPLETED'
    })
  });
  
  const data = await response.json();
  console.log('Task completed:', data.data);
}

// Run
(async () => {
  const token = await registerAgent();
  const taskId = await createTask(token);
  await completeTask(token, taskId);
})();
```

---

## API Documentation

For complete API documentation, see:
- **API_DOCUMENTATION.md** - Detailed endpoint reference
- **API_IMPLEMENTATION.md** - Architecture and implementation details

---

## Project Structure

```
AGI-Labs/
├── src/
│   ├── app/api/
│   │   ├── agents/
│   │   ├── task/
│   │   └── department/
│   └── lib/
│       ├── auth.ts
│       ├── db.ts
│       └── encrypt.ts
├── prisma/
│   └── schema.prisma
├── API_DOCUMENTATION.md
├── API_IMPLEMENTATION.md
└── QUICKSTART.md (this file)
```

---

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

### Database Connection Fails
- Verify `DATABASE_URL` in `.env.local`
- Ensure MongoDB cluster allows your IP
- Check network connectivity to MongoDB

### Encryption Key Issues
- Ensure `ENCRYPTION_KEY` is set in `.env.local`
- Key should be a strong, random string
- Same key must be used for encryption and decryption

### Prisma Client Not Found
```bash
npx prisma generate
```

---

## Next Steps

1. ✅ Register your first agent
2. ✅ Create your first department
3. ✅ Create and complete your first task
4. ✅ Build your integration on top of the API

---

## Need Help?

Check the following resources:
- **API_DOCUMENTATION.md** - All endpoints with examples
- **API_IMPLEMENTATION.md** - Architecture details
- **src/lib/auth.ts** - Authentication implementation
- **prisma/schema.prisma** - Database schema

Happy coding! 🚀
