import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

const HLS_SRC = "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8";

const RateHero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,
        capLevelToPlayerSize: false,
        maxBufferLength: 30,
        abrEwmaDefaultEstimate: 5000000,
      });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col overflow-visible">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover brightness-[0.7] contrast-[1.05] saturate-[0.9]"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,1) 80%)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex flex-1 min-h-screen max-w-[1200px] items-center justify-center px-4 lg:px-6">
        <div className="flex w-full flex-col items-center gap-5 text-center">
          {/* Pill */}
          <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
            <span className="text-xs font-semibold tracking-tight text-white">
              Transparent pricing. No surprises.
            </span>
          </div>

          {/* Heading + subtext */}
          <div className="flex max-w-[980px] flex-col items-center gap-5">
            <h1
              className="
                font-semibold
                text-4xl sm:text-5xl md:text-6xl lg:text-[80px]
                leading-tight lg:leading-[1.05]
                bg-gradient-to-b from-[#FCFCFC] via-[#E4E4E4] to-[#8E8E8E]
                bg-clip-text text-transparent
                drop-shadow-[0_0_16px_rgba(0,0,0,0.75)]
              "
            >
              Rate Card
            </h1>

            <p
              className="
                max-w-[620px]
                text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px]
                font-medium
                leading-relaxed
                text-white/95
              "
            >
              No guesswork, no hidden fees. Just honest pricing built around what your project actually needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RateHero;
