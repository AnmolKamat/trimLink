"use client";
import React, { useEffect, useState } from "react";
import cryptoRandomString from "crypto-random-string";
import { DicesIcon } from "lucide-react";
import { ClipLoader } from "react-spinners";

type Props = {};

const Home = (props: Props) => {
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [loading, setloading] = useState(false);
  const createLink = async () => {
    setloading(true);
    const response = await fetch("/api/addLink", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link, text }),
      method: "POST",
    });

    if (response.ok) {
      setAlert({ message: "Successfull, Link copied", type: "success" });
      const newLink = `https://trimlinc.vercel.app/${text}`;
      navigator.clipboard.writeText(newLink);
      setloading(false);
    } else {
      const { message } = await response.json();
      setAlert({ message, type: "error" });
      setloading(false);
    }
  };
  const generateRandom = () => {
    setText(cryptoRandomString({ length: 7 }));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 15000);

    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="h-screen w-screen relative">
      <video
        src="/assets/bg.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
      <div className="absolute w-full h-full bg-black/5 top-0">
        <div className="w-1/3 mx-auto mt-32 bg-black/40 backdrop-blur-lg p-8 rounded-md">
          <h1 className="mb-20 mx-auto w-fit font-thin text-4xl">TrimLinc</h1>
          <div className="flex w-full flex-col justify-center gap-8 items-center">
            <div className="relative  w-[98%] xl:w-3/4 mb-4">
              <label htmlFor="" className="absolute -top-8 left-2">
                Link
              </label>
              <input
                type="text"
                className="w-full py-3 px-2 bg-black/20 backdrop-blur-sm rounded-md  placeholder:text-gray-400 text-white !outline-none"
                placeholder="Enter the Link"
                onChange={(e) => setLink(e.target.value)}
                value={link}
              />
            </div>
            <div className=" w-[98%] xl:w-3/4 grid grid-cols-10 relative">
              <label htmlFor="" className="absolute -top-8 left-2">
                Text
              </label>
              <input
                type="text"
                className=" col-span-7 py-3 px-2 bg-black/20 backdrop-blur-md rounded-l-md placeholder:text-gray-400 text-white !outline-none"
                placeholder="Enter text"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <button
                className=" col-span-3 py-3 bg-black/20 backdrop-blur-md rounded-r-md border-l border-zinc-700 flex justify-center gap-2 items-center"
                onClick={generateRandom}
              >
                <p className="hidden xl:block font-light text-sm">Random</p>{" "}
                <DicesIcon strokeWidth={1} size={20} />
              </button>
            </div>
            <button
              className=" w-[98%] xl:w-3/4 bg-stone-300 text-black py-2 rounded-md hover:bg-white font-light text-lg"
              onClick={createLink}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader
                  color="black"
                  loading={loading}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Continue"
              )}
            </button>
          </div>
          {alert.message && (
            <div //alert div
              className={`${alert.type === "success" ? "bg-green-700" : ""}${
                alert.type === "error" ? "bg-red-700" : ""
              } p-3 w-fit h-fit rounded-full backdrop-blur-md mx-auto mt-10`}
            >
              {alert.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
