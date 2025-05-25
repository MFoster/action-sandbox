import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import yaml from 'js-yaml';

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    // Only allow .yml or .yaml files for safety
    const safeFilename = params.filename.replace(/[^a-zA-Z0-9_\-\.]/g, '');
    const workflowDir = path.join(process.cwd(), '.github', 'workflows');
    const filePath = path.join(workflowDir, safeFilename);

    // Read file
    const fileContents = await fs.readFile(filePath, 'utf8');
    // Parse YAML to JSON
    const data = yaml.load(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'File not found or invalid YAML' },
      { status: 404 }
    );
  }
}