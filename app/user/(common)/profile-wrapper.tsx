import { PropsWithChildren } from "react";
import "./styles.css";
export default function ProfileWrapper({ children }: PropsWithChildren) {
  return (
    <>
      <div className="bg-gray-50 h-full">
        <section className="relative block max-sm:h-[300px] h-[400px] w-full">
          <div id="hex-grid">
            {/* <div className="light"></div> */}
            <div className="grid"></div>
          </div>
          {/* <div className="absolute top-0 w-full h-full bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')]">
            <span
              id="blackOverlay"
              className="w-full h-full absolute  opacity-50 bg-primary/80"
            ></span>
          </div> */}
        </section>
        <section className="relative py-16">
          <div className="container mx-auto px-4 max-sm:px-2">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border border-border  rounded-lg -mt-64">
              <div className="px-6 max-sm:px-4">{children}</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
