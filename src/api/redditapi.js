export const getSubredditPosts = async (subreddit) => {
  const response = await fetch(`https://www.reddit.com${subreddit}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSearchedSubreddits = async (searchTerm) => {
  const response = await fetch(
    `https://www.reddit.com/subreddits/search.json?q=${searchTerm}`
  );
  const json = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

export const getSubreddits = async () => {
  const response = await fetch(`https://www.reddit.com/subreddits.json`);
  const json = await response.json();

  return json.data.childre.map((subreddit) => subreddit.data);
};
