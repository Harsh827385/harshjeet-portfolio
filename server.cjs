var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in the 'Secrets' panel under Settings.");
  }
  if (!aiClient) {
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.post("/api/generate-theme", async (req, res) => {
  try {
    const { concept, industry, mood, primaryColorPreference } = req.body;
    if (!concept || !industry || !mood) {
      return res.status(400).json({ error: "Missing required parameters: concept, industry, mood." });
    }
    const ai = getGeminiClient();
    const systemInstruction = `You are an elite Digital Branding Architect & Creative Director. 
Given a product concept, industry, mood selection, and an optional color preference, formulate a highly cohesive visual brand identity package. 
Return complete hexadecimal values for colors that have outstanding color contrast (such as light background colors with deep text, or dark backgrounds with crisp light text).
Ensure values correspond to: background, surface card background, borders, contrast primary brand color, and secondary accents.
Select gorgeous typography combinations available on Google Fonts:
For heading font: choose beautiful display serif or geometric sans-serif fonts (e.g. "Space Grotesk", "Outfit", "Playfair Display", "Syne", "Cabinet Grotesk", "Unbounded").
For body font: choose high legibility sans-serif variables (e.g., "Inter", "Plus Jakarta Sans").
Recommend imagery keywords tailored specifically for abstract or photography context to hotlink high-quality aesthetic layout photos.
Draft brilliant, compelling brand copy including a tagline, pitch, values, and copy structure.
Propose a visual mockup layout type ("bento", "split", "minimalist-hero", or "feature-grid") with feature cards using standard Lucide-react icon terms.`;
    const prompt = `Formulate a comprehensive visual brand identity for:
    IMPORTANT:
Generate a PROFESSIONAL DATA ANALYST PORTFOLIO for a college student.

Navigation must be:
About, Projects, Skills, Contact

Hero Title:
Harshjeet Chauhan - Data Analyst Portfolio

Hero Subtitle:
Aspiring Data Analyst skilled in Python, SQL, Excel, Power BI and Data Visualization.

Tagline:
Data Analyst Portfolio

Call To Action:
View Projects

Imagery:
Use data dashboards, charts, analytics, business intelligence visuals.
Do NOT use flowers, nature photography, architecture, abstract art or decorative images.

Projects should include:
1. Sales Dashboard (Power BI)
2. Student Performance Analysis (Python & Pandas)
3. Excel Business Analytics Dashboard

Skills:
Python, SQL, Excel, Power BI, Pandas, NumPy, Data Visualization
- Product Concept: "${concept}"
- Industry: "${industry}"
- Intended Aesthetic/Mood: "${mood}"
${primaryColorPreference ? `- Color Preference hint: "${primaryColorPreference}"` : ""}`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          required: ["name", "moodDescription", "colors", "typography", "imageryKeywords", "brandCopy", "uiMockup"],
          properties: {
            name: {
              type: import_genai.Type.STRING,
              description: "A gorgeous, poetic, branded theme name (e.g. 'Chrono Minimal', 'Warm Hearth Editorial', 'Vapour Cyber', 'Slate Oasis')"
            },
            moodDescription: {
              type: import_genai.Type.STRING,
              description: "Brief paragraph explaining the artistic direction and layout philosophy designed for this brand."
            },
            colors: {
              type: import_genai.Type.OBJECT,
              required: ["primary", "secondary", "accent", "background", "surface", "border", "text", "subtext"],
              properties: {
                primary: { type: import_genai.Type.STRING, description: "Highly contrastful branding primary color (HEX)" },
                secondary: { type: import_genai.Type.STRING, description: "Secondary brand color, complements primary (HEX)" },
                accent: { type: import_genai.Type.STRING, description: "Bright spotlight color for active highlights, hover, pills (HEX)" },
                background: { type: import_genai.Type.STRING, description: "Dominant content/site background color (HEX) - ensure proper contrast with readable text" },
                surface: { type: import_genai.Type.STRING, description: "Card container / box surface color (HEX)" },
                border: { type: import_genai.Type.STRING, description: "Outline border / separator color (HEX)" },
                text: { type: import_genai.Type.STRING, description: "Primary text color (HEX) - must pass WCAG contrast rule on background" },
                subtext: { type: import_genai.Type.STRING, description: "Secondary sub-header or caption text color (HEX)" }
              }
            },
            typography: {
              type: import_genai.Type.OBJECT,
              required: ["headingFont", "bodyFont", "headingStyle"],
              properties: {
                headingFont: { type: import_genai.Type.STRING, description: "Suggested Google Font for titles (e.g. Space Grotesk, Syne, Cormorant Garamond, Unbounded, Outfit)" },
                bodyFont: { type: import_genai.Type.STRING, description: "Suggested Google Font for content body (e.g. Inter, Plus Jakarta Sans)" },
                headingStyle: { type: import_genai.Type.STRING, description: "Tailwind classes for headers (e.g. 'font-extrabold tracking-tight', 'italic font-semibold')" }
              }
            },
            imageryKeywords: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Exactly 3 descriptive architectural, abstract, or aesthetic search terms for Unsplash background integration"
            },
            brandCopy: {
              type: import_genai.Type.OBJECT,
              required: ["tagline", "elevatorPitch", "coreValues", "heroTitle", "heroSubtitle"],
              properties: {
                tagline: { type: import_genai.Type.STRING, description: "Punchy 3-5 word tagline" },
                elevatorPitch: { type: import_genai.Type.STRING, description: "One-sentence magnetic elevator pitch" },
                coreValues: {
                  type: import_genai.Type.ARRAY,
                  items: {
                    type: import_genai.Type.OBJECT,
                    required: ["title", "description"],
                    properties: {
                      title: { type: import_genai.Type.STRING },
                      description: { type: import_genai.Type.STRING }
                    }
                  },
                  description: "Exactly 3 values aligning with the brand purpose"
                },
                heroTitle: { type: import_genai.Type.STRING, description: "Compelling primary landing page title" },
                heroSubtitle: { type: import_genai.Type.STRING, description: "Underlying descriptive subtitle copy" }
              }
            },
            uiMockup: {
              type: import_genai.Type.OBJECT,
              required: ["layoutType", "navigation", "features", "callToAction"],
              properties: {
                layoutType: { type: import_genai.Type.STRING, description: "Thematic layout: bento, split, minimalist-hero, or feature-grid" },
                navigation: {
                  type: import_genai.Type.ARRAY,
                  items: { type: import_genai.Type.STRING },
                  description: "Exactly 4 simple navbar link labels"
                },
                features: {
                  type: import_genai.Type.ARRAY,
                  items: {
                    type: import_genai.Type.OBJECT,
                    required: ["title", "description", "iconName"],
                    properties: {
                      title: { type: import_genai.Type.STRING },
                      description: { type: import_genai.Type.STRING },
                      iconName: { type: import_genai.Type.STRING, description: "A Lucide icon name, e.g. Zap, Shield, Sparkles, Cpu, Layers, Globe, Compass, Activity" }
                    }
                  },
                  description: "Exactly 3 feature cards illustrating value propositions"
                },
                callToAction: { type: import_genai.Type.STRING, description: "Text for the primary call-to-action button" }
              }
            }
          }
        }
      }
    });
    const parsedTheme = JSON.parse(response.text || "{}");
    const customTheme = {
      id: Math.random().toString(36).substring(2, 11),
      ...parsedTheme,
      createdAt: Date.now()
    };
    res.json(customTheme);
  } catch (error) {
    console.error("Theme generation error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate aesthetic theme.",
      details: "Verify your GEMINI_API_KEY is configured in Settings > Secrets."
    });
  }
});
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}
initServer().catch((err) => {
  console.error("Server boot failed:", err);
});
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
