import PictureApiService from './asyncApiService';
import pictureListTmpl from '../templates/picture-card';
import LoadMoreBtn from './loadMoreBtn';
const refs = {
  searchForm: document.querySelector('.search-form'),
  pictureContainer: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const pictureApi = new PictureApiService();
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', loadMoreBtnHandler);

function onSearch(e) {
  e.preventDefault();

  pictureApi.query = e.currentTarget.elements.query.value;
  loadMoreBtn.show();
  pictureApi.resetPage();
  clearGallery();
  fetchPictures();
}
function loadMoreBtnHandler() {
  fetchPictures();
}
async function fetchPictures() {
  loadMoreBtn.disable();
  try {
    const pictures = await pictureApi.fetchPictures();
    insertGalleryItems(pictures);
    loadMoreBtn.enable();
    refs.pictureContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  } catch (error) {
    alert(error);
  }
}
// function fetchPictures() {
//   loadMoreBtn.disable();
//   pictureApi
//     .fetchPictures()
//     .then(pictures => {
//       insertGalleryItems(pictures);
//       loadMoreBtn.enable();
//       refs.pictureContainer.scrollIntoView({
//         behavior: 'smooth',
//         block: 'end',
//       });
//     })
//     .catch(error => {
//       console.warn(error);
//     });
// }
function clearGallery() {
  refs.pictureContainer.innerHTML = '';
}
function insertGalleryItems(items) {
  // console.log(items);
  const markup = pictureListTmpl(items);
  refs.pictureContainer.insertAdjacentHTML('beforeend', markup);
}
