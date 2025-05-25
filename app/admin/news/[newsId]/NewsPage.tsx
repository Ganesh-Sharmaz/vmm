'use client'
import React, { useState } from "react";
import { getFirestore, doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Save, FileText, Eye, ArrowLeft, Calendar, Hash, BarChart3 } from "lucide-react";

interface Props {
  newsId: string;
  initialData: {
    title: string;
    content: string;
    date?: string;
    lastUpdated?: string;
  };
}

type ValidationState = {
  title: {
    isValid: boolean;
    message: string;
    isDirty: boolean;
    charCount: number;
  };
  content: {
    isValid: boolean;
    message: string;
    isDirty: boolean;
    charCount: number;
    wordCount: number;
  };
};

const NewsPage = ({ newsId, initialData: initialDataProp }: Props) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialDataProp.title);
  const [content, setContent] = useState(initialDataProp.content);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [initialData, setInitialData] = useState(initialDataProp);
  const [showMobileStats, setShowMobileStats] = useState(false);
  const [validation, setValidation] = useState<ValidationState>({
    title: { 
      isValid: true, 
      message: "", 
      isDirty: false, 
      charCount: initialDataProp.title.length 
    },
    content: { 
      isValid: true, 
      message: "", 
      isDirty: false, 
      charCount: initialDataProp.content.length,
      wordCount: initialDataProp.content.trim().split(/\s+/).filter(word => word.length > 0).length
    }
  });
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | null>(null);

  // Check if current data is different from initial data
  const hasDataChanges = title.trim() !== initialData.title.trim() || 
                        content.trim() !== initialData.content.trim();

  const validateTitle = (titleText: string) => {
    const charCount = titleText.length;
    
    if (!titleText.trim()) {
      return { isValid: false, message: "Title is required", charCount };
    }
    
    if (charCount > 250) {
      return { isValid: false, message: "Title cannot exceed 250 characters", charCount };
    }
    
    if (charCount < 5) {
      return { isValid: false, message: "Title must be at least 5 characters", charCount };
    }
    
    return { isValid: true, message: `${charCount} character${charCount !== 1 ? 's' : ''}`, charCount };
  };

  const validateContent = (contentText: string) => {
    const charCount = contentText.length;
    const words = contentText.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    if (!contentText.trim()) {
      return { isValid: false, message: "Content is required", charCount, wordCount: 0 };
    }
    
    if (charCount > 10000) {
      return { isValid: false, message: "Content cannot exceed 10000 characters", charCount, wordCount };
    }
    
    if (charCount < 50) {
      return { isValid: false, message: "Content must be at least 50 characters", charCount, wordCount };
    }
    
    return { 
      isValid: true, 
      message: `${wordCount} word${wordCount !== 1 ? 's' : ''}, ${charCount} character${charCount !== 1 ? 's' : ''}`, 
      charCount, 
      wordCount 
    };
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSaveStatus('unsaved');
    
    const validationResult = validateTitle(value);
    setValidation(prev => ({
      ...prev,
      title: {
        ...validationResult,
        isDirty: true
      }
    }));
    
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setSaveStatus('unsaved');
    
    const validationResult = validateContent(value);
    setValidation(prev => ({
      ...prev,
      content: {
        ...validationResult,
        isDirty: true
      }
    }));
    
    if (error) setError("");
    if (success) setSuccess("");
  };

  const isFormValid = validation.title.isValid && validation.content.isValid && 
                     title.trim() && content.trim();

  const handleSave = async () => {
    if (!isFormValid) return;
    
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const db = getFirestore(app);
      const newsRef = collection(db, "news");
      const q = query(newsRef, where("id", "==", newsId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError("News article not found");
        return;
      }

      const docRef = doc(db, "news", querySnapshot.docs[0].id);
      const lastUpdated = new Date().toISOString();
      await updateDoc(docRef, {
        title: title.trim(),
        content: content.trim(),
        lastUpdated
      });

      // Also update the title in newsListing
      const newsListingRef = collection(db, "newsListing");
      const newsListingQuery = query(newsListingRef, where("id", "==", newsId));
      const newsListingSnapshot = await getDocs(newsListingQuery);
      
      if (!newsListingSnapshot.empty) {
        const listingDocRef = doc(db, "newsListing", newsListingSnapshot.docs[0].id);
        await updateDoc(listingDocRef, {
          title: title.trim(),
          lastUpdated
        });
      }

      // Update initialData with new values
      setInitialData(prev => ({
        ...prev,
        title: title.trim(),
        content: content.trim(),
        lastUpdated
      }));

      setSuccess("Article updated successfully!");
      setSaveStatus('saved');
      
      // Reset dirty flags after successful save
      setValidation(prev => ({
        title: { ...prev.title, isDirty: false },
        content: { ...prev.content, isDirty: false }
      }));

      // Clear the saved status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (err) {
      setError("Unable to update article. Please try again.");
      console.error("Error updating news:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateMobile = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-3 sm:mb-4 touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit News Article</h1>
              <p className="mt-1 sm:mt-2 text-gray-600 text-sm sm:text-base">Update your article content and settings</p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Stats Toggle */}
              <button
                onClick={() => setShowMobileStats(!showMobileStats)}
                className="sm:hidden inline-flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 touch-manipulation"
              >
                <BarChart3 className="h-4 w-4" />
                Stats
              </button>
              
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 touch-manipulation ${
                  isPreviewMode
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">{isPreviewMode ? 'Edit Mode' : 'Preview'}</span>
                <span className="sm:hidden">{isPreviewMode ? 'Edit' : 'Preview'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Stats Panel */}
        {showMobileStats && (
          <div className="sm:hidden mb-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Content Stats</h3>
              <button
                onClick={() => setShowMobileStats(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-medium text-gray-500 mb-1">TITLE</p>
                <p className="text-sm font-medium text-gray-900">{validation.title.charCount}/250</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-medium text-gray-500 mb-1">WORDS</p>
                <p className="text-sm font-medium text-gray-900">{validation.content.wordCount}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-medium text-gray-500 mb-1">CONTENT</p>
                <p className="text-sm font-medium text-gray-900">{validation.content.charCount}/10000</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-medium text-gray-500 mb-1">STATUS</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isFormValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isFormValid ? 'Ready' : 'Needs Fix'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content Area - 3/4 width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-8">
              {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 text-sm sm:text-base">Error</p>
                    <p className="text-red-700 text-xs sm:text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800 text-sm sm:text-base">Success</p>
                    <p className="text-green-700 text-xs sm:text-sm mt-1">{success}</p>
                  </div>
                </div>
              )}

              {!isPreviewMode ? (
                /* Edit Mode */
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      <FileText className="h-4 w-4" />
                      Article Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className={`w-full px-3 sm:px-4 py-3 text-base border-2 rounded-xl transition-all duration-200 bg-white text-black touch-manipulation
                        ${validation.title.isDirty 
                          ? validation.title.isValid 
                            ? 'border-green-200 focus:border-green-400 focus:ring-4 focus:ring-green-50' 
                            : 'border-red-200 focus:border-red-400 focus:ring-4 focus:ring-red-50'
                          : 'border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50'
                        } 
                        focus:outline-none placeholder-gray-400`}
                      placeholder="Enter a compelling article title..."
                      maxLength={250}
                    />
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
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
                          Write a clear, engaging title (5-250 characters)
                        </p>
                      )}
                      <span className={`text-xs ${
                        validation.title.charCount > 200 ? 'text-orange-600' :
                        validation.title.charCount > 250 ? 'text-red-600' : 'text-gray-400'
                      }`}>
                        {validation.title.charCount}/250
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="content" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      <FileText className="h-4 w-4" />
                      Article Content
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      rows={12}
                      className={`w-full px-3 sm:px-4 py-3 text-base border-2 rounded-xl transition-all duration-200 resize-none bg-white text-black touch-manipulation
                        ${validation.content.isDirty 
                          ? validation.content.isValid 
                            ? 'border-green-200 focus:border-green-400 focus:ring-4 focus:ring-green-50' 
                            : 'border-red-200 focus:border-red-400 focus:ring-4 focus:ring-red-50'
                          : 'border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50'
                        } 
                        focus:outline-none placeholder-gray-400`}
                      placeholder="Write your article content here. Use paragraphs to organize your thoughts and make the content easy to read..."
                      maxLength={10000}
                      style={{ minHeight: '300px' }}
                    />
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                      {validation.content.isDirty && (
                        <p className={`text-xs flex items-center gap-1 ${
                          validation.content.isValid ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {validation.content.isValid ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          {validation.content.message}
                        </p>
                      )}
                      {!validation.content.isDirty && (
                        <p className="text-xs text-gray-500">
                          Write comprehensive article content (minimum 50 characters)
                        </p>
                      )}
                      <span className={`text-xs ${
                        validation.content.charCount > 8000 ? 'text-orange-600' :
                        validation.content.charCount > 10000 ? 'text-red-600' : 'text-gray-400'
                      }`}>
                        {validation.content.charCount}/10000
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Preview Mode */
                <div className="prose prose-sm sm:prose-lg max-w-none">
                  <div className="border-l-4 border-blue-500 pl-4 sm:pl-6 mb-6 sm:mb-8">
                    <p className="text-xs sm:text-sm text-blue-600 font-medium mb-2">PREVIEW MODE</p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                      {title || "Untitled Article"}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                        <span className="sm:hidden">
                          {initialData.date && formatDateMobile(initialData.date)}
                        </span>
                        <span className="hidden sm:inline">
                          {initialData.date && formatDate(initialData.date)}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Hash className="h-3 sm:h-4 w-3 sm:w-4" />
                        ID: {newsId}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                    {content || "No content available"}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm order-2 sm:order-1">
                  {saveStatus === 'unsaved' && hasDataChanges && (
                    <>
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-orange-600">Unsaved changes</span>
                    </>
                  )}
                  {saveStatus === 'saved' && (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-600">Changes saved</span>
                    </>
                  )}
                </div>
                
                <div className="flex gap-3 sm:gap-4 order-1 sm:order-2">
                  <button
                    onClick={() => router.back()}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 touch-manipulation text-center"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!isFormValid || loading || !hasDataChanges || saveStatus === 'saved'}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation ${
                      isFormValid && !loading && hasDataChanges && saveStatus !== 'saved'
                        ? "bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Saving...</span>
                        <span className="sm:hidden">Save</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span className="hidden sm:inline">Save Changes</span>
                        <span className="sm:hidden">Save</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar - 1/4 width - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="space-y-6">
              {/* Article Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Article Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Article ID</p>
                    <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded break-all">{newsId}</p>
                  </div>
                  
                  {initialData.date && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Created</p>
                      <p className="text-sm text-gray-900">{formatDate(initialData.date)}</p>
                    </div>
                  )}
                  
                  {initialData.lastUpdated && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Last Updated</p>
                      <p className="text-sm text-gray-900">{formatDate(initialData.lastUpdated)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Stats */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Title Length</span>
                    <span className="text-sm font-medium text-gray-900">
                      {validation.title.charCount}/250
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Content Length</span>
                    <span className="text-sm font-medium text-gray-900">
                      {validation.content.charCount}/10000
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Word Count</span>
                    <span className="text-sm font-medium text-gray-900">
                      {validation.content.wordCount}
                    </span>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        isFormValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {isFormValid ? 'Ready to Save' : 'Needs Attention'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Writing Tips</h3>
                <ul className="space-y-2 text-xs text-blue-700">
                  <li>• Keep titles clear and engaging</li>
                  <li>• Use paragraphs to organize content</li>
                  <li>• Preview your article before saving</li>
                  <li>• Check for typos and grammar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;