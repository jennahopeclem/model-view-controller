const addBlog = async (event) => {
  event.preventDefault();

  console.log('adding blog post');

  const newBlogName = document.querySelector('.new-blog-title').value.trim();
  const newBlogText = document.querySelector('.new-blog-text').value.trim();

  console.log(newBlogName, newBlogText);

  if (newBlogName && newBlogText) {
    console.log('Form filled out, now fetching');
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newBlogName,
        content: newBlogText,
      }),
    });

    console.log('RES', response);

    if (response.ok) {
      document.location.replace('/');
    } else {
      if (response.code === 403) {
        document.location.replace('/login');
        return;
      }
      console.log(response.statusText);
      alert(response.statusText);
    }
  }
};

document.querySelector('.blogpost').addEventListener('submit', addBlog);
