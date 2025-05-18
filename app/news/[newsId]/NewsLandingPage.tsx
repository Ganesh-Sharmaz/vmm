// Light theme: white and very light backgrounds, dark text, accent borders
'use client'
import React from "react";
import newsItems from "../../../components/news/newsData";
import { notFound } from "next/navigation";
import AdLeft from "../../../components/news/AdLeft";
import AdRight from "../../../components/news/AdRight";
import Link from "next/link";

type News = {
  id: string;
  title: string;
  date: string;
  content: string;
};

interface Props {
  newsId: string;
}

const NewsLandingPage = ({ newsId }: Props) => {
  const news = (newsItems as News[]).find((n) => n.id === newsId);
  

  if (!news) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <div className="flex flex-row justify-center gap-8 w-full max-w-7xl mx-auto px-4 py-12">
        {/* AdLeft */}
        <div className="hidden lg:block">
          <AdLeft />
        </div>

        {/* Article Content */}
        <article className="max-w-3xl w-full">
          {/* Article Header */}
          <header className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link href="/news" className="hover:text-blue-600">News</Link>
              <span>→</span>
              <span className="text-gray-900">Article</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Breaking News
              </span>
              <time className="text-gray-500">{news.date}</time>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{news.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">VMM</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">VMM News Staff</div>
                  <div className="text-xs text-gray-500">Security Affairs Correspondent</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                5 min read
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div className="text-xl text-gray-600 mb-8 font-serif italic">
              {news.content}
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
              <p className="text-blue-900 mb-4">
                In a world where news is serious, we decided to take a coffee break. Welcome to the only place where security guard exams are tougher than IIT, and Virat Kohli&apos;s true dream is finally revealed.
              </p>
              <p className="text-blue-800 mb-4">
                Stay tuned for more updates, because at VMM News, reality is just a suggestion.
              </p>
              <p className="text-xs text-blue-600 mt-4 italic">
                Disclaimer: This is satire. If you believed any of this, you probably also believe in unicorns at Vishal Mega Mart.
              </p>
            </div>
          </div>

          {/* Share Section */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Share this article</h2>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Tweet
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More VMM News</h2>
            <div className="grid gap-6">
              {(newsItems as News[]).slice(0, 3).filter(n => n.id !== newsId).map((relatedNews) => (
                <Link key={relatedNews.id} href={`/news/${relatedNews.id}`} className="block group">
                  <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-transform group-hover:scale-[1.02]">
                    <div className="p-6">
                      <time className="text-sm text-gray-500 mb-2 block">{relatedNews.date}</time>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedNews.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{relatedNews.content}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* AdRight */}
        <div className="hidden lg:block">
          <AdRight />
        </div>
      </div>
    </div>
  );
};

export default NewsLandingPage;
