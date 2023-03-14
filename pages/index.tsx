import { useList } from "react-use";
import Content, { ContentItemProps } from "../components/Content";
import HomeExample from "../components/HomeExample";
import SearchBar, { ValueProps } from "../components/SearchBar";
import Side from "../components/Side";

export default function Home() {
  const [list, { push, updateAt }] = useList<ContentItemProps>([]);

  const fetchAnswer = async (text?: string) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.info(error);
    }
  };
  const onSubmit = async (e: ValueProps) => {
    const item: ContentItemProps = { question: e };
    push(item);

    const result: any = await fetchAnswer(e);
    console.log("data", result);
    const data = result.data.choices[0].text;
    item.answer = <div dangerouslySetInnerHTML={{ __html: data as any }}></div>;
    updateAt(list.length, item);
  };
  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <div className="flex h-full flex-1 flex-col md:pl-[260px]">
          <main className="relative flex flex-col items-stretch flex-1 w-full h-full overflow-hidden transition-width">
            <div className="flex-1 overflow-hidden">
              {list.length ? <Content list={list} /> : <HomeExample />}
            </div>
            <SearchBar onSubmit={onSubmit} />
          </main>
        </div>
        <Side />
      </div>
      <div className="absolute top-0 left-0 right-0 z-[2]"></div>
    </>
  );
}
