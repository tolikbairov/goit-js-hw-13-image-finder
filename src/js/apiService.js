export default class PictureApiService {
  BASE_URL = 'https://pixabay.com/api';
  API_KEY = '23305129-dc426c4ab0f279a7253128e3a';
  searchQuery = '';
  page = 1;
  fetchPictures() {
    const requestParams = `image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.API_KEY}`;
    const url = `${this.BASE_URL}/?${requestParams}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(string) {
    this.searchQuery = string;
  }
}
