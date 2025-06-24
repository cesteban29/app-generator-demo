import { initDataset } from "braintrust";
import dataset from "./dataset.json";
import { PROJECT_NAME } from "../../lib/constants";

interface AppGeneratorData {
  input: {
    requirements: string;
  };
  expected: {
    files: {
      path: string;
      content: string;
      type: string;
    }[];
    description: string;
  };
  metadata: {
    complexity: string;
    category: string;
    features: string[];
  };
}

const appGeneratorData: AppGeneratorData[] = dataset as AppGeneratorData[]; 

export const evalDataset = async () => {
    const dataset = initDataset(PROJECT_NAME, { dataset: "App Generator Dataset" });
  
    for (let i = 0; i < appGeneratorData.length; i++) {
      dataset.update({
        id: `app-generator-record-${i}`, // Use stable IDs for idempotency
        input: appGeneratorData[i].input,
        expected: appGeneratorData[i].expected,
        metadata: appGeneratorData[i].metadata,
      });
    }
  
  };

evalDataset();