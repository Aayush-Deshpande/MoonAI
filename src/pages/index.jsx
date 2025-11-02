import dynamic from "next/dynamic";
const VioraRefined = dynamic(() => import("../components/VioraRefined"), {
  ssr: false,
});

export default function Home() {
  return <VioraRefined />;
}

