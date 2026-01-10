
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Character, Message } from "../types";

export class CharacterChatService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;
  private character: Character;

  constructor(character: Character) {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.character = character;
  }

  public initChat() {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: this.character.systemInstruction,
        temperature: 0.8,
        topP: 0.95,
      },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      this.initChat();
    }

    try {
      const result: GenerateContentResponse = await this.chat!.sendMessage({ message });
      return result.text || "ごめん、ちょっと考えがまとまらなかったみたい...";
    } catch (error) {
      console.error("Gemini Error:", error);
      throw new Error("通信に失敗したよ。APIキーの設定を確認してね。");
    }
  }
}
