"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Redirecting = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const { id } = params;
  const [error, setError] = useState("");
  useEffect(() => {
    const getLink = async () => {
      const response = await fetch("/api/getLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: id }),
      });
      if (response.ok) {
        const { link } = await response.json();
        window.location.href= "";
        window.location.href = link;
      } else {
        const { message } = await response.json();
        setLoading(false);
        setError(message);
      }
    };
    getLink();
  }, [id]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {loading && (
        <ClipLoader
          color="white"
          loading={loading}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {error && (
        <div className="">
          <h1 className="text-2xl font-thin">{error}</h1>
          <Link href="/">
            <button className="p-2 text-black bg-white flex rounded-md mt-6 mx-auto">
              Go gome <Home />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Redirecting;
