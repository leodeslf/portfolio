import { useEffect } from "react";
import { initLiveBG } from "../js/liveBG/setup";

export default function LiveBG() {
  useEffect(() => {
    initLiveBG();
  }, []);

  return (
    <>
      <canvas className="live-bg__canvas live-bg__canvas--birds"></canvas>
      <canvas className="live-bg__canvas live-bg__canvas--fireflies"></canvas>
    </>
  );
}
