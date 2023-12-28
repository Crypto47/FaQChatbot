import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({
            message: 'Hello friends! The API server is up and running. This API was built by Viraj.',
        });
    } else if (req.method === 'POST') {
        try {
            const prompt = req.body.prompt;

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${prompt}`,
                temperature: 0,
                max_tokens: 3000,
                top_p: 1,
                frequency_penalty: 0.5,
                presence_penalty: 0,
            });

            res.status(200).json({
                bot: response.data.choices[0].text,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Something went wrong.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
