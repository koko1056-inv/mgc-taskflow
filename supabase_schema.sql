-- Tasks table definition
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category TEXT NOT NULL DEFAULT 'その他',
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'paused', 'done')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  assignee TEXT,
  due_date DATE,
  notes TEXT,
  repeat TEXT DEFAULT 'none' CHECK (repeat IN ('none', 'daily', 'weekly')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Simple policy for prototype: anyone can read/write (Update this for production!)
CREATE POLICY "Allow all access" ON tasks FOR ALL USING (true) WITH CHECK (true);
