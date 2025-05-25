import React from "react";
import NewsPage from "./NewsPage";
import { app } from "@/app/firebaseConfig";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

// Define the expected news data structure
interface NewsData {
  title: string;
  content: string;
  date?: string;
  lastUpdated?: string;
}

interface Props {
  params: Promise<{ newsId: string }>;
}

const page = async ({ params }: Props) => {
  // Await the params promise
  const { newsId } = await params;
  
  const db = getFirestore(app);
  const newsRef = collection(db, "news");
  const q = query(newsRef, where("id", "==", newsId));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return <div>News article not found</div>;
  }

  const newsData = querySnapshot.docs[0].data() as NewsData;
  
  return <NewsPage newsId={newsId} initialData={newsData} />;
};

export default page;