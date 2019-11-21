const api = `https://hacker-news.firebaseio.com/v0`;
const json = `.json?print=pretty`;

function removeDeleted(posts) {
  return posts.filter(({ deleted }) => deleted !== true);
}
function removeDead(posts) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true);
}
function onlyComments(posts) {
  return posts.filter(({ type }) => type === "comment");
}
function onlyPosts(posts) {
  return posts.filter(({ type }) => type === "story");
}
export function fetchItem(id) {
  return fetch(`${api}/item/${id}${json}`).then(res => res.json());
}
export function fetchMainPosts(type) {
  return fetch(`${api}/${type}stories${json}`)
    .then(res => res.json())
    .then(ids => {
      if (!ids) {
        throw new Error(ids.message);
      }
      return ids.slice(0, 10);
    })
    .then(ids => Promise.all(ids.map(fetchItem)));
}

export function fetchComments(ids) {
  return Promise.all(ids.map(fetchItem)).then(comments =>
    removeDeleted(onlyComments(removeDead(comments)))
  );
}
export function fetchUser(id) {
  return fetch(`${api}/user/${id}${json}`).then(res => res.json());
}
export function fetchPosts(ids) {
  // ids.slice(0, 100);
  return Promise.all(ids.map(fetchItem)).then(posts =>
    removeDeleted(onlyPosts(removeDead(posts)))
  );
}
