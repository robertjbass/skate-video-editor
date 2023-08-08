"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [dragActive, setDragActive] = useState<Boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>();

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
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files) {
      const droppedFiles: File[] = Array.from(e.target.files);
      setFiles(droppedFiles);
    }
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
              {files.map((file: File) => (
                <div
                  onClick={() => setVideoUrl(URL.createObjectURL(file))}
                  key={file.name}
                >
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          id="preview"
          className="flex flex-grow bg-red-200 align-middle justify-center p-8"
        >
          <div id="video" className="bg-black w-full">
            <video
              id="video-player"
              src={videoUrl}
              className="w-full"
              controls={true}
            />
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
