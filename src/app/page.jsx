import { Download } from 'lucide-react';
import Header from '../Components/Header'; // Adjust path as needed
import Image from "next/image";
import DiscriptionWriter from '../Components/DiscriptionWriter';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1>
          Hello World !!!
        </h1>
      </main>
      <DiscriptionWriter />
    </>
  );
}
