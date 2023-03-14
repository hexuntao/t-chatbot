"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
import Chat from "@/components/Chat";

export default function HomePage() {
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateResponse = async (e: any) => {
    if (loading) {
      return;
    }
    e.preventDefault();
    setResponseMessage("");
    setLoading(true);

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
      setResponseMessage(prev => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    <main className="relative flex flex-col items-stretch flex-1 w-full h-full overflow-hidden transition-width">
      <div className="flex-1 overflow-hidden">
        <div className="h-full dark:bg-gray-800">
          <div className="flex flex-col items-center h-full text-sm dark:bg-gray-800">
            {responseMessage === "" ? (
              loading ? (
                <div className="flex flex-col items-center justify-center h-full font-bold text-gray-100">
                  远程生成中...
                </div>
              ) : (
                <Hero />
              )
            ) : (
              <Chat
                requestMessage={requestMessage}
                responseMessage={responseMessage}
              />
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient">
        <form
          className="flex flex-row gap-3 pt-2 mx-2 stretch last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
          onSubmit={e => generateResponse(e)}
        >
          <div className="relative flex flex-1 h-full md:flex-col">
            <div className="flex ml-1 mt-1.5 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center"></div>
            <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
              <input
                className="w-full p-0 pl-2 m-0 bg-transparent border-0 outline-none resize-none pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
                type="text"
                value={requestMessage}
                onChange={e => setRequestMessage(e.target.value)}
              ></input>
              <button className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 mr-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
