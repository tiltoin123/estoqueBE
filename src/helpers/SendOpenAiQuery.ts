import OpenAI from 'openai';
import ListStoreAiService from '../services/StoreAiServices.ts/ListStoreAiService';
import ShowStoreAiService from '../services/StoreAiServices.ts/ShowStoreAiService';
const openai = new OpenAI();

const SendOpenAiQuery = async function (storeAiId: number, userQuery: string): Promise<String> {
    const storeAi = await ShowStoreAiService(storeAiId)
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: storeAi.systemPrompt.toString() }, { role: "user", content: userQuery }]
    });
    const gptResponse = completion.choices[0].message.content

    return gptResponse!
}

export default SendOpenAiQuery;