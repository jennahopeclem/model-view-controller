const addBlog = async (event) => {
  event.preventDefault();

  console.log('adding blog post');

  const newBlogName = document
    .querySelector('.new-blog-title')
    .ariaValueMax.trim();
  const newBlogText = document
    .querySelector('.new-blog-text')
    .ariaValueMax.trim();

  console.log(newBlogName, newBlogText);

  if (newBlogName && newBlogText) {
    console.log('Form filled out, now fetching');
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newBlogName,
        text: newBlogText,
      }),
    });

    console.log('RES', response);

    if (response.ok) {
      document.location.replace * '/blogpost';
    } else {
      console.log(response.statusText);
      alert(response.statusText);
    }
  }
};

document.querySelector('#blog-btn').addEventListener('click', addBlog);
