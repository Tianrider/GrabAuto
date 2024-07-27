import { GoogleGenerativeAI, GenerationConfig, Content } from '@google/generative-ai';
import { useState } from 'react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY as string);

const config: GenerationConfig = {
    temperature: 0,     // Adjust the temperature as needed
    topP: 0.75,         // Adjust the topP as needed
    topK: 10            // Adjust the topK as needed
};

const APITest: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [response, setResponse] = useState<string>("");

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(`Consider these common problems that cause a car to break down:
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
"${e.target.value}"`);
        console.log(prompt);
    };

    const fetchApi = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const promptContent: Content = { role: "user", parts: [{ text: prompt }] };

        const result = await model.generateContent({
            contents: [promptContent],
            generationConfig: config
        });

        const text = await result.response.text();
        setResponse(text);
        console.log(text);
    };
    
    return (
        <div className='flex flex-col space-y-4 my-8 items-center'>
            <h1 className='font-bold text-xl'>API Test</h1>
            <input className='p-2 border border-gray-300' type='text' placeholder='Enter a prompt' onChange={handlePromptChange} />
            <button className='p-2 bg-blue-500 text-white' onClick={fetchApi}>Generate</button>
            <div className='p-4 border border-gray-300 w-1/2'>{response}</div>
        </div>
    );
}

export default APITest;