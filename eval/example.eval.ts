import { invoke, Eval, initDataset, initFunction } from "braintrust";
import { z } from "zod";
import { PROJECT_NAME, PROMPT_SLUG } from "../lib/constants";


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

Eval(PROJECT_NAME, {
  data: initDataset({project: PROJECT_NAME, dataset: 'App Generator Dataset'}),
  task: async (input) =>
    await invoke({
      projectName: PROJECT_NAME,
      slug: PROMPT_SLUG,
      input,
      schema: z.string(),
    }),
  scores: [jsonFormatScorer, requirementsFulfillmentScorer, codeCompletenessScorer],
});