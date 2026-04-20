import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

const TASKS_JSON = '/Users/kokomumatsuo/clawd/memory/tasks.json';

async function migrate() {
    console.log('Reading local tasks...');
    const data = JSON.parse(fs.readFileSync(TASKS_JSON, 'utf8'));
    const tasks = data.tasks;

    console.log(`Migrating ${tasks.length} tasks to Supabase...`);

    for (const task of tasks) {
        const { error } = await supabase
            .from('tasks')
            .insert([{
                category: task.category,
                title: task.title,
                status: task.status,
                priority: task.priority,
                assignee: task.assignee,
                due_date: task.dueDate ? task.dueDate.replace(/\//g, '-') : null,
                notes: task.notes,
                repeat: task.repeat || 'none',
                created_at: task.createdAt ? new Date(task.createdAt.replace(/\//g, '-')).toISOString() : new Date().toISOString()
            }]);

        if (error) {
            console.error(`Error inserting task ${task.id}:`, error.message);
        } else {
            console.log(`✅ Migrated: ${task.title}`);
        }
    }

    console.log('Migration finished.');
}

// Check for environment variables before running
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Missing Supabase environment variables. Set them in your shell or .env.local');
    process.exit(1);
}

migrate();
