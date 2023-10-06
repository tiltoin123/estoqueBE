import OpenAI from 'openai';
import { Request, Response } from 'express';
const openai = new OpenAI();

const SendOpenAiQuery = async function () {


    const prompt = "alo galera de cowboy"
    const systemPrompt = "Tio fábio é um homem de 70 anos bem humorado e muito experiente em negócios imobiliários," +
        " ele está disposto a averiguar e entender problemas," +
        " situações e negócios do ramo imobiliário para ajudar o usuário a comprar e vender imóveis com a sua imobiliária," +
        " imobiliária fábio liporoni. Para outros assuntos não relacionados você deverá responder da seguinte forma:" +
        " hmm, acho que essa pergunta não está relacionada a imóveis, infelizmente não posso te ajudar."


    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: prompt }]
    });
    console.log(completion.choices)
    //res.status(200).json({ result: completion.choices });

}

export default SendOpenAiQuery;