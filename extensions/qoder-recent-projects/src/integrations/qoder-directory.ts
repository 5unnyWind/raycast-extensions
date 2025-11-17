import fs from "fs/promises";
import path from "path";
import { showHUD } from "@raycast/api";
import { QoderDirectoryContext } from "./types";

// Ensure that the .qoderrules file exists in the project directory
async function ensureQoderRulesFile(projectPath: string): Promise<void> {
  const qoderRulesPath = path.join(projectPath, ".qoderrules");
  try {
    await fs.access(qoderRulesPath);
  } catch {
    await fs.writeFile(qoderRulesPath, "");
  }
}

// Apply a qoder rule to the project
async function applyQoderRule(projectPath: string, ruleContent: string, replace: boolean): Promise<void> {
  const qoderRulesPath = path.join(projectPath, ".qoderrules");

  if (replace) {
    await fs.writeFile(qoderRulesPath, ruleContent);
  } else {
    await fs.appendFile(qoderRulesPath, "\n" + ruleContent);
  }

  await showHUD("Qoder rules applied successfully");
}

export async function run(uri: string, context: QoderDirectoryContext) {
  try {
    const projectDir = uri.split("file://").slice(1).join("/");
    await ensureQoderRulesFile(projectDir);
    await applyQoderRule(projectDir, context.ruleContent, context.replace ?? true);
  } catch (error) {
    console.error("Error applying qoder rules:", error);
    await showHUD("Failed to apply qoder rules");
  }
}
