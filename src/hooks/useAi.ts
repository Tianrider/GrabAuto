import {
    GoogleGenerativeAI,
    GenerationConfig,
    Content,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY as string);

// function that return number
async function getProblemNumber(prompt: string) {
    const config: GenerationConfig = {
        temperature: 0, // Adjust the temperature as needed
        topP: 0.75, // Adjust the topP as needed
        topK: 10, // Adjust the topK as needed
    };

    const finalPrompt = `Consider these common problems that cause a car to break down:
1. Flat Tire
2. Empty Fuel Tank
3. Dead Battery
4. Out of Oil
5. Faulty Spark Plugs
6. Radiator Hose Leak
7. Low Coolant Level
8. Blown Fuse
9. Engine Failure
10. Brake Failure
11. Overheating
12. Transmission Failure
13. Steering Failure
14. Clutch Failure
15. Converter Failure

Based on the following brief description of a car breaking down during driving, identify and conclude by narrowing down to 1 choice of which common problem is the cause. Respond only with the corresponding number of the problem. 

For example, if the problem is described as the car's engine making strange noises and then stopping, respond with '2' (Engine Failure).

Do note that the user may not always provide a clear description of the problem.

Please narrow down and conclude which common problem is the reason that causes the car to break down based on the brief description by just responding with the common problem's number.

Description: 
"${prompt}"`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const promptContent: Content = {
        role: "user",
        parts: [{ text: finalPrompt }],
    };

    const result = await model.generateContent({
        contents: [promptContent],
        generationConfig: config,
    });

    const text = await result.response.text();

    return text;
}

async function getPriceRange(prompt: string) {
    const finalPrompt = `You are to estimate the repair cost for a car that breaks down during driving. Consider that the location where the car breaks down is in Indonesia.

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

For example, if the problem is "Dead Battery", respond with:
ACDelco,100000,150000
Service Fee,25000,35000

Another example, if the problem is "Empty Fuel Tank", respond with:
Pertamina Pertamax (5 liter),75000,85000
Service Fee,5000,15000

Please respond in the correct format. If you have multiple answers, respond with the most common one. If you have multiple common answers, respond with the most common one in Indonesia. If you have multiple common answers in Indonesia, respond with the cheapest one. Make sure the respond is only in the correct format:
<Product Name>,<MinimumPriceinRp>,<MaximumPriceinRp>
<Product Name>,<MinimumPriceinRp>,<MaximumPriceinRp>
...
Service Fee,<MinimumPriceinRp>,<MaximumPriceinRp>

Here is the problem:
"${prompt}"`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const promptContent: Content = {
        role: "user",
        parts: [{ text: finalPrompt }],
    };

    const result = await model.generateContent({
        contents: [promptContent],
        // generationConfig: config,
    });

    const text = await result.response.text();

    return text;
}

export { getProblemNumber, getPriceRange };
