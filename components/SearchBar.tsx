import { ChangeEvent, MouseEventHandler, MouseEvent, useState } from "react";

export type ValueProps = string | undefined;

export type SearchBarProps = {
  onSubmit?: (e?: ValueProps) => void;
};

export default function SearchBar(props: SearchBarProps) {
  const [value, setValue] = useState<ValueProps>();
  const onChange = (e?: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e?.target.value);
  };
  const onSubmit = () => {
    props.onSubmit?.(value);
    setValue("");
  };
  return (
    <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0  md:border-transparent md:bg-vert-light-gradient bg-white  md:!bg-transparent ">
      <form className="flex flex-row gap-3 pt-2 mx-2 stretch last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
        <div className="relative flex flex-1 h-full md:flex-col">
          <div className="flex ml-1 mt-1.5 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center"></div>
          <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white    rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] ">
            <textarea
              value={value}
              style={{
                maxHeight: 200,
                height: 24,
                overflowY: "hidden",
              }}
              rows={1}
              onChange={onChange}
              className="w-full p-0 pl-2 m-0 bg-transparent border-0 resize-none pr-7 focus:ring-0 focus-visible:ring-0 md:pl-0"
            ></textarea>
            <button
              onClick={e => {
                e.preventDefault();
                onSubmit();
              }}
              className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100  disabled:hover:bg-transparent "
            >
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
  );
}
