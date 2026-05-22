// src/components/common/TypingText.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const wordVariants = {
  hidden: { opacity: 0, y: "0.35em" },
  visible: (delayValue = 0) => ({
    opacity: 1,
    y: "0em",
    transition: {
      duration: 0.22,
      ease: [0.22, 0.61, 0.36, 1],
      delay: delayValue,
    },
  }),
};

/**
 * TypingText — word-by-word reveal animation.
 *
 * Props:
 *  - text          string to animate
 *  - as            wrapper tag (default "p")
 *  - delay         seconds before first word starts (default 0)
 *  - wordStep      seconds between words (default 0.12)
 *  - startWhen     if provided, animation waits until this is true
 *                  (when omitted, falls back to whileInView behaviour)
 *  - onComplete    fired when the last word finishes animating
 */
const TypingText = ({
  text = "",
  as: Tag = "p",
  className = "",
  delay = 0,
  wordStep = 0.12,
  startWhen,
  onComplete,
  ...rest
}) => {
  const MotionTag = motion(Tag);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });

  // Decide whether the animation should be playing
  const shouldAnimate =
    startWhen !== undefined ? Boolean(startWhen) : isInView;

  const [animState, setAnimState] = useState("hidden");

  // ---- FIX: store onComplete in a ref so it doesn't trigger re-runs ----
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // ---- FIX: guard against double-firing ----
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (shouldAnimate && animState === "hidden") {
      setAnimState("visible");
    }
  }, [shouldAnimate]); // eslint-disable-line react-hooks/exhaustive-deps

  // Split into tokens (words + spaces/newlines preserved)
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);

  const animatedTokenCount = useMemo(
    () => tokens.filter((t) => !/^\s+$/.test(t)).length,
    [tokens]
  );

  // Fire onComplete when the last word should be done animating
  // FIX: onComplete is NOT in the dependency array — stored in ref instead
  useEffect(() => {
    if (hasCompleted.current || animState !== "visible") return;

    if (!animatedTokenCount) {
      hasCompleted.current = true;
      onCompleteRef.current?.();
      return;
    }

    const totalSeconds = delay + animatedTokenCount * wordStep + 0.22;
    const timer = setTimeout(() => {
      if (!hasCompleted.current) {
        hasCompleted.current = true;
        onCompleteRef.current?.();
      }
    }, totalSeconds * 1000);

    return () => clearTimeout(timer);
  }, [animState, delay, animatedTokenCount, wordStep]);

  let runningIndex = 0;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={animState}
      {...rest}
    >
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) {
          return (
            <span key={`space-${i}`} style={{ whiteSpace: "pre-wrap" }}>
              {token}
            </span>
          );
        }

        const wordDelay = delay + runningIndex * wordStep;
        runningIndex += 1;

        return (
          <motion.span
            key={`word-${i}`}
            variants={wordVariants}
            custom={wordDelay}
            style={{ display: "inline-block" }}
          >
            {token}
          </motion.span>
        );
      })}
    </MotionTag>
  );
};

export default TypingText;
