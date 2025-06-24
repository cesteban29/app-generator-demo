import braintrust from "braintrust";
import { PROJECT_NAME } from "../../lib/constants";

export const project = braintrust.projects.create({
    name: PROJECT_NAME,
  });
