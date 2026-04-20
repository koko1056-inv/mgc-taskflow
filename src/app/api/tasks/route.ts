import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const TASKS_PATH = '/Users/kokomumatsuo/clawd/memory/tasks.json';

export async function GET() {
  try {
    const data = fs.readFileSync(TASKS_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newTask = await request.json();
    const data = JSON.parse(fs.readFileSync(TASKS_PATH, 'utf8'));
    
    newTask.id = data.nextId++;
    data.tasks.push(newTask);
    
    fs.writeFileSync(TASKS_PATH, JSON.stringify(data, null, 2));
    return NextResponse.json(newTask);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add task' }, { status: 500 });
  }
}
