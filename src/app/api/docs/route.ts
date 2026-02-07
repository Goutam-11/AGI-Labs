import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doc = searchParams.get("doc") || "list";

  const docMap: Record<string, string> = {
    skill: "SKILL.md",
    heartbeat: "HEARTBEAT.md",
    quickstart: "QUICKSTART.md",
  };

  // List available docs
  if (doc === "list") {
    return NextResponse.json({
      success: true,
      data: {
        available_docs: Object.keys(docMap),
        usage: "GET /api/docs?doc=skill|heartbeat|quickstart",
        format: "Add &format=json for parsed format (default: markdown)",
      },
    });
  }

  const docKey = doc.toLowerCase();
  const filename = docMap[docKey];

  if (!filename) {
    return NextResponse.json(
      {
        success: false,
        error: `Document not found. Available: ${Object.keys(docMap).join(", ")}`,
      },
      { status: 404 },
    );
  }

  try {
    const filePath = join(process.cwd(), filename);
    const content = readFileSync(filePath, "utf-8");
    const format = searchParams.get("format") || "markdown";

    if (format === "json") {
      // Parse markdown frontmatter
      const lines = content.split("\n");
      let title = "";
      let description = "";
      let inFrontmatter = false;
      let contentStartIndex = 0;

      for (let i = 0; i < lines.length; i++) {
        if (i === 0 && lines[i] === "---") {
          inFrontmatter = true;
          continue;
        }
        if (inFrontmatter && lines[i] === "---") {
          inFrontmatter = false;
          contentStartIndex = i + 1;
          break;
        }
        if (inFrontmatter) {
          if (lines[i].startsWith("name:")) {
            title = lines[i].replace("name:", "").trim();
          } else if (lines[i].startsWith("description:")) {
            description = lines[i].replace("description:", "").trim();
          }
        }
      }

      const body = lines.slice(contentStartIndex).join("\n").trim();

      return NextResponse.json(
        {
          success: true,
          data: {
            doc: docKey,
            title,
            description,
            content: body,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
          },
        },
      );
    }

    // Return raw markdown
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed to read ${filename}`,
      },
      { status: 500 },
    );
  }
}
