import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { NextResponse } from "next/server";
import { WorkflowItem } from "@/data/type/WorkflowItem";

const WORKFLOWS_DIR = path.resolve(process.cwd(), ".github/workflows");

export async function GET() {
  try {
    const files = await fs.readdir(WORKFLOWS_DIR);
    const list: WorkflowItem[] = [];

    for (const file of files) {
      const filePath = path.join(WORKFLOWS_DIR, file);
      const stat = await fs.stat(filePath);
      if (stat.isFile() && (file.endsWith(".yml") || file.endsWith(".yaml"))) {
        const content = await fs.readFile(filePath, "utf8");
        const data = yaml.load(content) as { name?: string };
        if (data && data.name) {
          list.push({ title: data.name, name: file });
        }
      }
    }

    return NextResponse.json(list);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
