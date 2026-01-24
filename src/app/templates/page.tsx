import { Metadata } from "next";
import TemplatesClient from "./TemplatesClient";

export const metadata: Metadata = {
  title: "Templates | FlexPost",
  description: "Choose from our collection of social media templates including Twitter posts, LinkedIn updates, and Crypto PnL cards.",
};

export default function TemplatesPage() {
  return <TemplatesClient />;
}