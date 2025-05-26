const axios = require('axios')

const token = process.env.HF_TOKEN?.trim()

const chatBotHuggingFace = async (req, res) => {
    try {
        const { message } = req.body

        if (!message || typeof message !== 'string' || message.trim() === '') {
            return res
                .status(400)
                .json({ status: 400, error: 'A valid non-empty message is required' })
        }

        const prompt = `You are a helpful and friendly assistant. Please answer briefly and naturally in conversational style.

User: ${message.trim()}
Assistant:`

        const response = await axios.post(
            'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
            {
                inputs: prompt,
                parameters: {
                    max_new_tokens: 256,
                    temperature: 0.7
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        let generatedText =
            Array.isArray(response.data) && response.data[0]?.generated_text
                ? response.data[0].generated_text
                : ''

        generatedText = generatedText.replace(/```[\s\S]*?```/g, '').trim()

        const promptEndIndex = generatedText.indexOf('Assistant:')
        if (promptEndIndex !== -1) {
            generatedText = generatedText
                .slice(promptEndIndex + 'Assistant:'.length)
                .trim()
        }

        const maxLength = 300
        if (generatedText.length > maxLength) {
            generatedText = generatedText.slice(0, maxLength).trim() + '...'
        }

        res.status(200).json({
            status: 200,
            response:
                generatedText || "Sorry, I couldn't generate a response this time."
        })
    } catch (error) {
        console.error(
            'Error in chatbot controller:',
            error.response?.status,
            error.response?.data || error.message
        )
        res.status(500).json({
            status: 500,
            error: 'Failed to process chat request',
            details: error.message
        })
    }
}

module.exports = { chatBotHuggingFace }
