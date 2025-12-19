
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private static getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  static async getAdvisorResponse(prompt: string, history: { role: 'user' | 'model', content: string }[]) {
    const ai = this.getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `You are the "Grand Vizier of Wealth," an expert economic advisor for a player who has $50 billion. 
        Your tone is dramatic, world-class, and highly intelligent. 
        When the player asks for advice on what to build, provide deep reasoning. 
        YOU MUST USE THE THINKING BUDGET TO CALCULATE THE IMPACT OF THEIR CHOICES. 
        Explain the second-order effects of their investments.`,
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text;
  }

  static async generateProjectVision(prompt: string, size: '1K' | '2K' | '4K' = '1K') {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: `A photorealistic, awe-inspiring concept art of the following project: ${prompt}. High detail, cinematic lighting, futuristic or humanitarian aesthetic.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  static async editVision(imageData: string, editPrompt: string) {
    const ai = this.getAI();
    const base64Data = imageData.split(',')[1];
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/png'
            }
          },
          { text: editPrompt }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  static async analyzeProjectDossier(videoBase64: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: videoBase64,
              mimeType: 'video/mp4'
            }
          },
          { text: "Analyze this project proposal video. What are the key risks and rewards?" }
        ]
      }
    });
    return response.text;
  }
}
