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
  try {
    console.log(`Starting dataset population for project: ${PROJECT_NAME}`);
    console.log(`Processing ${appGeneratorData.length} records...`);
    
    const dataset = initDataset(PROJECT_NAME, { dataset: "App Generator Dataset" });
    
    for (let i = 0; i < appGeneratorData.length; i++) {
      dataset.update({
        id: `app-generator-record-${i}`, // Use stable IDs for idempotency
        input: appGeneratorData[i].input,
        expected: appGeneratorData[i].expected,
        metadata: appGeneratorData[i].metadata,
      });
      
      // Show progress for every 10 records or on the last record
      if ((i + 1) % 10 === 0 || i === appGeneratorData.length - 1) {
        console.log(`Processed ${i + 1}/${appGeneratorData.length} records`);
      }
    }
    
    console.log(`Dataset population completed successfully!`);
    console.log(`Total records added: ${appGeneratorData.length}`);
    
  } catch (error) {
    console.error(`Dataset population failed:`, error);
    process.exit(1);
  }
};

// Call the function to populate the dataset
evalDataset();
