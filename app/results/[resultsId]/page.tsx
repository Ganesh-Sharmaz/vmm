import React from "react";
import { app } from "@/app/firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ResultLandingPage from "./ResultLandingPage";
import { Metadata } from "next";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";
export const metadata: Metadata = {
  title: "VMM Scorecard & AIR | Vishal Mega Mart Result Analysis",
  description: "View your VMM result with AIR, percentile, and performance breakdown. Share your fake glory and claim your spot in Vishal history.",
};

// Fetch data from Firestore
async function getData(id: string) {
  try {
    const db = getFirestore(app);
    const docRef = doc(db, "applications", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// ✅ Correct way to define params in Next.js App Router
interface Props {
  params: Promise<{ resultsId: string }> 
}

// export default async function ResultPage({ params }: Readonly<ResultPageProps>) {
//   const id = params.id;

//   if (!id) {
//     notFound();
//   }

//   const data = await getData(id);

//   if (!data) {
//     notFound();
//   }

//   return <ResultLandingPage data={data} id={id} />;
// }


const Page = async ({ params }: Props) => {
  
  const resolvedParams = await params;
  const data = await getData(resolvedParams.resultsId);
  return <HomeLayout>
    <ResultLandingPage data={data} id={resolvedParams.resultsId}/>
  </HomeLayout>
};

export default Page;
