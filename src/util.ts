import * as fs from "fs";
import * as path from "path";

export function readFromFile(fileName: string): string[] {
  try {
    const filePath = path.join(__dirname, fileName);
    const data = fs.readFileSync(filePath, "utf-8");
    return data.split("\n").filter((a) => !!a);
  } catch (err) {
    console.error(`Error reading file ${fileName}: ${(err as Error).message}`);
    return [];
  }
}
