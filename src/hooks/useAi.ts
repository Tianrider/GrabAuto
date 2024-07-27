import {
    GoogleGenerativeAI,
    GenerationConfig,
    Content,
} from "@google/generative-ai";

// function that return number
async function getProblemNumber(prompt: string) {
    const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_AI_API_KEY as string,
    );

    const config: GenerationConfig = {
        temperature: 0, // Adjust the temperature as needed
        topP: 0.75, // Adjust the topP as needed
        topK: 10, // Adjust the topK as needed
    };

    const finalPrompt = `Consider these common problems that cause a car to break down:
1. Flat Tire
2. Engine Failure
3. Empty Fuel Tank
4. Overheating
5. Brake Failure
6. Dead Battery
7. Out of Oil

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

export { getProblemNumber };
