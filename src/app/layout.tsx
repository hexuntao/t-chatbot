import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head />
      <body>
        <div className="relative w-full h-full overflow-hidden">
          <div className="flex h-full flex-1 flex-col md:pl-[260px]">
            {children}
          </div>
          <div className="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
            <div className="flex flex-col h-full min-h-0 ">
              <div className="flex items-start flex-1 w-full h-full border-white/20">
                <nav className="flex flex-col flex-1 h-full p-2 space-y-1">
                  {/* <a className="flex items-center flex-shrink-0 gap-3 px-3 py-3 mb-2 text-sm text-white transition-colors duration-200 border rounded-md cursor-pointer hover:bg-gray-500/10 border-white/20">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New chat
                  </a> */}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
