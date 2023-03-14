import create from "zustand";
import { persist } from "zustand/middleware";

interface ChatStore {
  chats: any[];
  chat: any;
  answer: string;
  loading: boolean;
  addChat: (e: string) => void;
  removeAllChat: () => void;
}

// initial chat store
export const useChatStore = create<any>(
  persist(
    set => ({
      chats: [],
      chat: {},
      answer: "",
      loading: false,
      addChat: async (requestMessage: string) => {
        try {
          set(() => ({ chat: { chat: requestMessage, date: new Date() } }));

          set(() => ({ loading: true }));

          const response = await fetch("/api/gpt3", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: requestMessage }),
          });

          if (!response.ok) {
            throw new Error("访问出错了!");
          }

          const data = response.body;
          if (!data) return;

          const reader = data.getReader();
          const decoder = new TextDecoder();

          let done = false;
          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            const chunkValue = decoder.decode(value);

            set(({ answer }: any) => ({
              answer: answer + chunkValue,
            }));
          }
          //
          set((state: any) => ({
            chats: [
              ...state.chats,
              {
                chat: requestMessage,
                answer: state.answer,
                date: new Date(),
              },
            ],
          }));
          // 清空
          set(() => ({ answer: "" }));
          set(() => ({ loading: false }));
        } catch (err) {
          set(() => ({ chat: {} }));
          set(() => ({ loading: false }));
        }
      },
      removeAllChat: () => {
        set({ chats: [] });
      },
    }),
    {
      name: "t-chatbot",
      getStorage: () => localStorage,
    }
  )
);
