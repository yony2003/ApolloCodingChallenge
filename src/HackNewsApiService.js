import axios from "axios";

const newsUrl = "https://api.hnpwa.com/v0/news/1.json";
const singleNewsUrl = "https://api.hnpwa.com/v0/item/";

class HackNewsApiService {
  async getNews() {
    const response = await axios.get(newsUrl);
    return response.data;
  }

  async getSelectedNews(newsId) {
    const _url = singleNewsUrl + newsId + ".json";
    const response = await axios.get(_url);

    return response.data;
  }
}

export default new HackNewsApiService();
