import OpenAI from 'openai';
import { Request, Response } from 'express';
import ShowStoreAiService from '../services/StoreAiServices.ts/ShowStoreAiService';
import ListStoreAiService from '../services/StoreAiServices.ts/ListStoreAiService';
const openai = new OpenAI();

const SendOpenAiQuery = async function (storeId: number, userQuery: string): Promise<String> {
    //arrumar isso aqui storeAi nao pode ser um array isso tem que buscar a ia por id(pk)
    const storeAi = await ListStoreAiService(storeId)
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: storeAi[0].systemPrompt.toString() }, { role: "user", content: userQuery }]
    });
    const gptResponse = completion.choices[0].message.content
    console.log(completion.usage)
    //res.status(200).json({ result: completion.choices });
    return gptResponse!
}

export default SendOpenAiQuery;