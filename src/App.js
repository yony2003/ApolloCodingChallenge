import React, { useEffect, useState } from "react";
import HackNewsApiService from "./HackNewsApiService";
import "./styles.css";

export default function App() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);

  const showPreview = async (e, newsId) => {
    e.preventDefault();
    try {
      const _news = await HackNewsApiService.getSelectedNews(newsId);
      setSelectedNews(_news);
    } catch (_error) {
      console.log(_error);
    }
  };

  const getNews = async () => {
    try {
      const _news = await HackNewsApiService.getNews();
      setNews(_news);
    } catch (_error) {
      console.log(_error);
    }
  };

  const closePreview = () => {
    setSelectedNews(null);
  };

  useEffect(() => {
    getNews();
  });

  return (
    <div className="App">
      <h1>HackNews Api</h1>

      {!news && <span>Loading News...</span>}

      {selectedNews?.id > 0 && (
        <div className="preview">
          <button onClick={closePreview}>close</button>
          <h2>{selectedNews.title}</h2>
          <div>{selectedNews.content}</div>
          <div>
            full new :{" "}
            <a href={selectedNews.url} title={selectedNews.title}>
              {selectedNews.url}
            </a>
          </div>
        </div>
      )}

      <section className="news">
        {news &&
          news.map((newsItem, index) => {
            return (
              <article className="news-item">
                <span className="domain">{newsItem.domain}</span>

                <h2>
                  {index} -{" "}
                  <a
                    href="#"
                    title={newsItem.title}
                    onClick={(e) => showPreview(e, newsItem.id)}
                  >
                    {newsItem.title}
                  </a>
                  &nbsp;
                </h2>

                <ul>
                  <li>
                    <b>{newsItem.points}</b> points
                  </li>
                  <li>
                    {" "}
                    by <b>{newsItem.user}</b> -{" "}
                  </li>
                  <li>
                    <b>{newsItem.time_ago}</b> -{" "}
                  </li>
                  <li>
                    <b>{newsItem.comments_count}</b> comments
                  </li>
                </ul>
              </article>
            );
          })}
      </section>
    </div>
  );
}
