import { invoke, Eval, initDataset, initFunction } from "braintrust";
import { z } from "zod";
import { PROJECT_NAME } from "../lib/constants";
import { generateApp1, generateApp2, generateApp3 } from "../braintrust/04-prompts/prompts";

const PROMPT_SLUG1 = generateApp1.slug;
const PROMPT_SLUG2 = generateApp2.slug;
const PROMPT_SLUG3 = generateApp3.slug;

const jsonFormatScorer = initFunction({
  projectName: PROJECT_NAME,
  slug: "json-format-scorer",
})

const requirementsFulfillmentScorer = initFunction({
  projectName: PROJECT_NAME,
  slug: "requirements-fulfillment-scorer",
})

const codeCompletenessScorer = initFunction({
  projectName: PROJECT_NAME,
  slug: "nextjs-code-completeness-scorer",
})

/*
// Eval 1 for generateApp1
Eval(PROJECT_NAME, {
  data: initDataset({project: PROJECT_NAME, dataset: 'App Generator Dataset'}),
  task: async (input) =>
    await invoke({
      projectName: PROJECT_NAME,
      slug: PROMPT_SLUG1,
      input,
      schema: z.string(),
    }),
  scores: [jsonFormatScorer, requirementsFulfillmentScorer, codeCompletenessScorer],
});


// Eval 2 for generateApp2
Eval(PROJECT_NAME, {
  data: initDataset({project: PROJECT_NAME, dataset: 'App Generator Dataset'}),
  task: async (input) =>
    await invoke({
      projectName: PROJECT_NAME,
      slug: PROMPT_SLUG2,
      input,
      schema: z.string(),
    }),
  scores: [jsonFormatScorer, requirementsFulfillmentScorer, codeCompletenessScorer],
});
*/

// Eval 3 for generateApp3
Eval(PROJECT_NAME, {
  data: initDataset({project: PROJECT_NAME, dataset: 'App Generator Dataset'}),
  task: async (input) =>
    await invoke({
      projectName: PROJECT_NAME,
      slug: PROMPT_SLUG3,
      input,
      schema: z.string(),
    }),
  scores: [jsonFormatScorer, requirementsFulfillmentScorer, codeCompletenessScorer],
});