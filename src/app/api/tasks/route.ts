import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ tasks: data });
}

export async function POST(request: Request) {
  const newTask = await request.json();
  
  const { data, error } = await supabase
    .from('tasks')
    .insert([{
      category: newTask.category,
      title: newTask.title,
      status: newTask.status,
      priority: newTask.priority,
      assignee: newTask.assignee,
      due_date: newTask.dueDate,
      notes: newTask.notes,
      repeat: newTask.repeat || 'none'
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
