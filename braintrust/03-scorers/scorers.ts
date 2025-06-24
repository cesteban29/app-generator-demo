import { project } from "../01-config/project";
import { z } from "zod";

// 1. FUNCTIONAL SCORER - JSON Format Compliance
export const jsonFormatScorer = project.scorers.create({
  name: "JSON Format Compliance Scorer",
  slug: "json-format-scorer",
  version: "v2",
  description: "Validates that output follows the required JSON structure",
  parameters: z.object({
    output: z.string(),
  }),
  handler: async ({ output }) => {
    try {
      const parsed = JSON.parse(output);
      
      // Check required top-level fields
      const requiredFields = ['files', 'description'];
      const hasRequiredFields = requiredFields.every(field => field in parsed);
      
      if (!hasRequiredFields) return 0;
      
      // Check files array structure
      if (!Array.isArray(parsed.files) || parsed.files.length === 0) return 0;
      
      // Check each file object has required fields
      const requiredFileFields = ['path', 'content', 'type'];
      const filesValid = parsed.files.every((file: any) => 
        requiredFileFields.every(field => field in file && file[field])
      );
      
      if (!filesValid) return 0;
      
      // Check file types are valid
      const validTypes = ['component', 'page', 'layout', 'api', 'config', 'style', 'middleware', 'lib'];
      const typesValid = parsed.files.every((file: any) => 
        validTypes.includes(file.type)
      );
      
      return typesValid ? 1 : 0.5; // Partial credit for wrong types
      
    } catch (error) {
      return 0; // Invalid JSON
    }
  },
});

// 2. LLM SCORER - Requirements Fulfillment
export const requirementsFulfillmentScorer = project.scorers.create({
  name: "Requirements Fulfillment Scorer",
  slug: "requirements-fulfillment-scorer",
  version: "v2",
  description: "Evaluates how well the generated app meets user requirements",
  messages: [
    {
      role: "system",
      content: `You are evaluating how well a generated Next.js application fulfills the user's requirements.

**Task**: Rate how completely the generated code addresses the specified requirements.

**Input Data**:
- User requirements: {{input.requirements}}
- Expected structure: {{expected}}
- App complexity: {{metadata.complexity}}
- App category: {{metadata.category}}
- Required features: {{#metadata.features}}{{.}} {{/metadata.features}}
- Generated output: {{output}}

**Evaluation Focus - Requirements Fulfillment**:
Based on the {{metadata.complexity}} complexity {{metadata.category}} application, assess requirement satisfaction:

1. **Core Functionality**: Does the app implement the main features requested in "{{input.requirements}}"?
2. **Required Features**: Are the expected features implemented: {{#metadata.features}}{{.}} {{/metadata.features}}?
3. **File Structure**: Does the output match the expected file structure and organization?
4. **User Experience**: Does the implementation provide the intended user experience for a {{metadata.category}}?
5. **Technical Specifications**: Are technical requirements (responsive design, TypeScript, API endpoints, etc.) met?

**Context-Aware Evaluation**:
{{#metadata.complexity}}
{{#simple}}For this simple application, focus on clean implementation of core features with minimal complexity.{{/simple}}
{{#medium}}For this medium complexity application, expect proper state management, component organization, and feature completeness.{{/medium}}
{{#complex}}For this complex application, expect sophisticated architecture, proper data flow, advanced features, and scalable patterns.{{/complex}}
{{/metadata.complexity}}

**Fulfillment Levels**:

**Excellent**: All requirements fully implemented with thoughtful implementation that meets or exceeds expectations for a {{metadata.complexity}} {{metadata.category}} application.

**Good**: Most requirements met with solid implementation, minor features might be missing or simplified but core functionality is complete.

**Fair**: Core requirements met but some important features missing or poorly implemented, may not fully deliver the intended {{metadata.category}} experience.

**Poor**: Many requirements unmet or incorrectly implemented, core functionality incomplete or doesn't match the {{metadata.category}} category expectations.

**Output Format**:
Reasoning: [Detailed comparison of requirements vs implementation, noting fulfilled and missing features specific to {{metadata.category}} applications]
Choice: Excellent, Good, Fair, or Poor`,
    }
  ],
  model: "gpt-4.1",
  useCot: true,
  choiceScores: {
    Excellent: 1,
    Good: 0.75,
    Fair: 0.5,
    Poor: 0.25,
  },
});

// 3. LLM SCORER - Code Completeness
export const codeCompletenessScorer = project.scorers.create({
  name: "Next.js Code Completeness Scorer",
  slug: "nextjs-code-completeness-scorer",
  version: "v2",
  description: "Evaluates if all necessary files and dependencies are included",
  messages: [
    {
      role: "system",
      content: `You are evaluating the completeness of a generated Next.js application.

**Task**: Rate how complete and functional the generated code package is.

**Input Data**:
- User requirements: {{input.requirements}}
- Expected files: {{#expected.files}}{{path}} ({{type}}) {{/expected.files}}
- App complexity: {{metadata.complexity}}
- App category: {{metadata.category}}
- Generated output: {{output}}

**Evaluation Focus - Completeness**:
For this {{metadata.complexity}} {{metadata.category}} application, assess if the generated code includes:

1. **Required Files**: Compare against expected files structure
2. **File Types Coverage**: Ensure proper mix of file types (components, pages, layouts, etc.)
3. **Dependencies & Imports**: All imports are properly declared and available
4. **Component Structure**: Complete component implementations with all props and logic
5. **Feature-Specific Files**: Files needed for core functionality

**Complexity-Specific Requirements**:
- Simple apps: basic layout, main page, styling, and core components
- Medium apps: structured components, proper state management, API routes, organized file structure  
- Complex apps: advanced architecture, context providers, utility libraries, comprehensive component structure

**Completeness Levels**:

**Excellent**: All required files present, proper file types, all imports resolved, complete implementations that would run immediately without errors.

**Good**: Nearly complete with only minor missing pieces that wouldn't prevent the app from running, matches most expected file structure.

**Fair**: Most essential files present but missing some important components or has unresolved dependencies.

**Poor**: Missing critical files from expected structure, many unresolved imports, or incomplete implementations.

**Output Format**:
Reasoning: [Analysis comparing generated files to expected structure. Note missing files, unresolved imports, incomplete implementations]
Choice: Excellent, Good, Fair, or Poor`,
    }
  ],
  model: "gpt-4.1",
  useCot: true,
  choiceScores: {
    Excellent: 1,
    Good: 0.75,
    Fair: 0.5,
    Poor: 0.25,
  },
});