'use client'
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, query, where, getFirestore } from "firebase/firestore";
import { app } from "@/app/firebaseConfig";
import { AlertCircle, CheckCircle2, Clock, FileText, Hash } from "lucide-react";
import { useRouter } from "next/navigation";

type NewsItem = {
  id: string;
  title: string;
  date: string;
};

type ValidationState = {
  newsId: {
    isValid: boolean;
    message: string;
    isDirty: boolean;
  };
  title: {
    isValid: boolean;
    message: string;
    isDirty: boolean;
    wordCount: number;
  };
};

function NewsComponent() {
  const router = useRouter();
  const [newsId, setNewsId] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [validation, setValidation] = useState<ValidationState>({
    newsId: { isValid: false, message: "", isDirty: false },
    title: { isValid: false, message: "", isDirty: false, wordCount: 0 }
  });

  const db = getFirestore(app);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const newsRef = collection(db, "newsListing");
      const querySnapshot = await getDocs(newsRef);
      const news = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsItem[];
      setNewsList(news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const validateNewsId = (id: string) => {
    if (!id.trim()) {
      return { isValid: false, message: "News ID is required" };
    }
    
    if (id.length < 3) {
      return { isValid: false, message: "News ID must be at least 3 characters long" };
    }
    
    if (id.length > 50) {
      return { isValid: false, message: "News ID must be less than 50 characters" };
    }
    
    const regex = /^[a-z0-9-]+$/;
    if (!regex.test(id)) {
      return { isValid: false, message: "Only lowercase letters, numbers, and hyphens are allowed" };
    }
    
    if (id.startsWith('-') || id.endsWith('-')) {
      return { isValid: false, message: "News ID cannot start or end with a hyphen" };
    }
    
    if (id.includes('--')) {
      return { isValid: false, message: "Consecutive hyphens are not allowed" };
    }
    
    return { isValid: true, message: "Valid news ID format" };
  };

  const validateTitle = (titleText: string) => {
    if (!titleText.trim()) {
      return { isValid: false, message: "Title is required", wordCount: 0 };
    }
    
    const words = titleText.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    if (wordCount > 50) {
      return { isValid: false, message: "Title cannot exceed 50 words", wordCount };
    }
    
    if (titleText.length > 200) {
      return { isValid: false, message: "Title is too long (max 200 characters)", wordCount };
    }
    
    return { isValid: true, message: `${wordCount} word${wordCount !== 1 ? 's' : ''}`, wordCount };
  };

  const handleNewsIdChange = (value: string) => {
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setNewsId(cleanValue);
    
    const validationResult = validateNewsId(cleanValue);
    setValidation(prev => ({
      ...prev,
      newsId: {
        ...validationResult,
        isDirty: true
      }
    }));
    
    // Clear any existing errors when user starts typing
    if (error) setError("");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    
    const validationResult = validateTitle(value);
    setValidation(prev => ({
      ...prev,
      title: {
        ...validationResult,
        isDirty: true
      }
    }));
    
    // Clear any existing errors when user starts typing
    if (error) setError("");
  };

  const isFormValid = validation.newsId.isValid && validation.title.isValid && newsId.trim() && title.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Check if news ID exists in news collection
      const newsRef = collection(db, "news");
      const newsQuery = query(newsRef, where("id", "==", newsId));
      const newsSnapshot = await getDocs(newsQuery);

      // Check if news ID exists in newsListing collection
      const newsListingRef = collection(db, "newsListing");
      const newsListingQuery = query(newsListingRef, where("id", "==", newsId));
      const newsListingSnapshot = await getDocs(newsListingQuery);

      if (!newsSnapshot.empty || !newsListingSnapshot.empty) {
        setError("This News ID is already taken. Please choose a different one.");
        return;
      }

      const currentDate = new Date().toISOString();
      
      // Validate that dates are present and valid
      if (!currentDate) {
        setError("Date information is missing. Please try again.");
        return;
      }

      // Add to news collection
      await addDoc(newsRef, {
        id: newsId,
        title: title.trim(),
        date: currentDate,
        lastUpdated: currentDate,
        content: "" // Initialize with empty content
      });

      // Add to newsListing collection
      await addDoc(newsListingRef, {
        id: newsId,
        title: title.trim(),
        date: currentDate,
        lastUpdated: currentDate
      });

      setSuccess("News article created successfully!");
      setNewsId("");
      setTitle("");
      setValidation({
        newsId: { isValid: false, message: "", isDirty: false },
        title: { isValid: false, message: "", isDirty: false, wordCount: 0 }
      });
      fetchNews();
      
      // Redirect to the edit page
      router.push(`/admin/news/${newsId}`);
    } catch (err) {
      setError("Unable to create news article. Please try again.");
      console.error("Error creating news:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (newsId: string) => {
    router.push(`/admin/news/${newsId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <p className="mt-2 text-gray-600">Create and manage news articles for your platform</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Create News Form - 3/5 width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Create New Article</h2>
                <p className="text-gray-500 text-sm">Fill in the details below to publish a new news article</p>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">Error</p>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Success</p>
                    <p className="text-green-700 text-sm mt-1">{success}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="newsId" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Hash className="h-4 w-4" />
                    News ID
                  </label>
                  <input
                    type="text"
                    id="newsId"
                    value={newsId}
                    onChange={(e) => handleNewsIdChange(e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-white text-black
                      ${validation.newsId.isDirty 
                        ? validation.newsId.isValid 
                          ? 'border-green-200 focus:border-green-400 focus:ring-4 focus:ring-green-50' 
                          : 'border-red-200 focus:border-red-400 focus:ring-4 focus:ring-red-50'
                        : 'border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50'
                      } 
                      focus:outline-none placeholder-gray-400`}
                    placeholder="e.g., breaking-news-update-2024"
                    maxLength={50}
                  />
                  {validation.newsId.isDirty && (
                    <p className={`mt-2 text-xs flex items-center gap-1 ${
                      validation.newsId.isValid ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {validation.newsId.isValid ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      {validation.newsId.message}
                    </p>
                  )}
                  {!validation.newsId.isDirty && (
                    <p className="mt-2 text-xs text-gray-500">
                      Use lowercase letters, numbers, and hyphens only. Must be 3-50 characters.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <FileText className="h-4 w-4" />
                    Article Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 text-black bg-white
                      ${validation.title.isDirty 
                        ? validation.title.isValid 
                          ? 'border-green-200 focus:border-green-400 focus:ring-4 focus:ring-green-50' 
                          : 'border-red-200 focus:border-red-400 focus:ring-4 focus:ring-red-50'
                        : 'border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50'
                      } 
                      focus:outline-none placeholder-gray-400`}
                    placeholder="Enter a compelling news title..."
                    maxLength={200}
                  />
                  <div className="mt-2 flex items-center justify-between">
                    {validation.title.isDirty && (
                      <p className={`text-xs flex items-center gap-1 ${
                        validation.title.isValid ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {validation.title.isValid ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {validation.title.message}
                      </p>
                    )}
                    {!validation.title.isDirty && (
                      <p className="text-xs text-gray-500">
                        Write a clear, engaging title (max 50 words)
                      </p>
                    )}
                    <span className={`text-xs ${
                      validation.title.wordCount > 45 ? 'text-orange-600' :
                      validation.title.wordCount > 50 ? 'text-red-600' : 'text-gray-400'
                    }`}>
                      {validation.title.wordCount}/50 words
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`w-full py-3 px-6 rounded-xl font-medium text-base transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                    isFormValid && !loading
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow focus:ring-blue-500'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                      Creating Article...
                    </span>
                  ) : (
                    'Publish News Article'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* News List - 2/5 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Recent Articles</h3>
                <p className="text-gray-500 text-sm">Latest published news</p>
              </div>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="text-sm">Loading articles...</span>
                  </div>
                </div>
              ) : newsList.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {newsList.slice(0, 10).map((news) => (
                    <div 
                      key={news.id} 
                      onClick={() => handleArticleClick(news.id)}
                      className="p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-all duration-200 cursor-pointer group"
                    >
                      <h4 className="font-medium text-gray-900 text-sm leading-relaxed mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(news.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  {newsList.length > 10 && (
                    <p className="text-center text-xs text-gray-400 pt-2">
                      Showing 10 of {newsList.length} articles
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 text-sm">No articles published yet</p>
                  <p className="text-gray-400 text-xs mt-1">Create your first news article to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsComponent;