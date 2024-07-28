import {
    GoogleGenerativeAI,
    GenerationConfig,
    Content,
} from "@google/generative-ai";
import { useState } from "react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY as string);

const config: GenerationConfig = {
    temperature: 0.9, // Adjust the temperature as needed
    topP: 0.7, // Adjust the topP as needed
    // topK: 20, // Adjust the topK as needed
};

const APITest: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [response, setResponse] = useState<string>("");

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(`You are to estimate the repair cost for a car that breaks down during driving. Consider that the location where the car breaks down is in Indonesia.

Based on the location (which is Indonesia) and the given problem, please estimate the price range for the repair cost by stating the average mechanic fee for a delivery on-site repair service and the product brand used as repair tool and material along with its its measurement in ml, mg, liter, etc. if it does not need a whole bottle of product, in Indonesian Rupiah (Rp). 

Here are some extra instructions you have to implement:
- The mechanic fee is the cost for the mechanic to come to the location and repair the car on-site.
- The car breakdown location is in Indonesia, so estimate the local price tag.
- The product brand used as a repair tool and material is the brand that is commonly used by mechanics in Indonesia.
- Prefer to use the most common product brand used by mechanics in Indonesia.
- Prefer to use cheaper product brands that are still reliable, and prefer to use smaller quantity or measure if it does not need a whole bottle of product. For example, if the whole bottle price is Rp35000, but you only need 1/4 of the bottle, then the price is Rp9000 (rounded to nearest thousand). Dont forget to put the measurement beside the product name.
- The numbering rule for the price range is using the nearest thousand.
- Use dots (.) as a thousand separators, and do not use commas (,) since we round the price to the nearest thousand.
- Calculate the price range for the repair cost based on the problem that causes the car to break down.

Respond in this format:
<Product Name>,<MinimumPriceinRp>,<MaximumPriceinRp>
<Product Name>,<MinimumPriceinRp>,<MaximumPriceinRp>
...
Service Fee,<MinimumPriceinRp>,<MaximumPriceinRp>
Total,<MinimumPriceinRp>,<MaximumPriceinRp>

For example, if the problem is "Dead Battery", respond with:
ACDelco,100000,150000
Service Fee,25000,35000
Total,130000,195000

Another example, if the problem is "Empty Fuel Tank", respond with:
Pertamina Pertamax (5 liter),75000,85000
Service Fee,5000,15000
Total,95000,115000

Please respond in the correct format. If you have multiple answers, respond with the most common one. If you have multiple common answers, respond with the most common one in Indonesia. If you have multiple common answers in Indonesia, respond with the cheapest one. Make sure the respond is only in the correct format:
<Product Name>,<MinimumPriceinRp>,<MaximumPriceinRp>
<Product Name>,<MinimumPriceinRp>,<MaximumPriceinRp>
...
Service Fee,<MinimumPriceinRp>,<MaximumPriceinRp>
Total,<MinimumPriceinRp>,<MaximumPriceinRp>

Here is the problem:
"${e.target.value}"`);
        console.log(prompt);
    };

    const fetchApi = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const promptContent: Content = {
            role: "user",
            parts: [{ text: prompt }],
        };

        const result = await model.generateContent({
            contents: [promptContent],
            generationConfig: config,
        });

        const text = await result.response.text();
        setResponse(text);
        console.log(text);
    };

    return (
        <div className="my-8 flex flex-col items-center space-y-4">
            <h1 className="text-xl font-bold">API Test</h1>
            <input
                className="border border-gray-300 p-2"
                type="text"
                placeholder="Enter a prompt"
                onChange={handlePromptChange}
            />
            <button className="bg-blue-500 p-2 text-white" onClick={fetchApi}>
                Generate
            </button>
            <div className="w-1/2 border border-gray-300 p-4">{response}</div>
        </div>
    );
};

export default APITest;
