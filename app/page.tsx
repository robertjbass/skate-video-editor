"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [dragActive, setDragActive] = useState<Boolean>(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const timelineHeight = 200;

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileDrop = (e: any) => {
    setFiles(e.target.files);
    setDragActive(false);
  };

  useEffect(() => {
    const preventDefaultBehavior = (e: any) => {
      if (e.target.id !== "input-file-upload") {
        e.preventDefault();
      }
    };

    window.addEventListener("dragover", preventDefaultBehavior);
    window.addEventListener("drop", preventDefaultBehavior);

    return () => {
      window.removeEventListener("dragover", preventDefaultBehavior);
      window.removeEventListener("drop", preventDefaultBehavior);
    };
  }, []);

  return (
    <main className="min-h-screen flex">
      <div
        id="sidebar"
        style={{ height: `calc(100dvh - ${timelineHeight}px)` }}
        className="flex flex-grow h-full"
      >
        <div
          id="filesystem"
          onDragOver={handleDrag}
          onDragLeave={() => setDragActive(false)}
          className={[
            "h-full w-72",
            dragActive ? "bg-gray-200" : "bg-blue-200",
          ].join(" ")}
        >
          {dragActive && (
            <input
              type="file"
              id="input-file-upload"
              className="h-full w-full"
              multiple={true}
              onChange={handleFileDrop}
            />
          )}

          {files && (
            <div>
              {Array.from(files).map((file: File, index: number) => {
                return <div key={index}>{file.name}</div>;
              })}
            </div>
          )}
        </div>
        <div
          id="preview"
          className="flex flex-grow bg-red-200 align-middle justify-center p-8"
        >
          <div id="video" className="bg-black w-full">
            video
          </div>
        </div>
      </div>
      <div
        id="timeline"
        style={{ height: `${timelineHeight}px` }}
        className="absolute bottom-0 bg-pink-500 w-full"
      >
        asd
      </div>
    </main>
  );
}
