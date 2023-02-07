const addBlog = async (event) => {
  event.preventDefault();

  console.log('adding blog');

  const newBlogName = document.querySelector('.new-entry-title').value.trim();
  const newBlogText = document.querySelector('.new-entry-text').value.trim();

  console.log(newBlogName, newBlogText);

  if (newBlogName && newBlogText) {
    console.log('form filled out, starting fetch');
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newBlogName,
        text: newBlogText,
      }),
    });

    console.log('RES:', response);

    if (response.ok) {
      document.location.replace('/blog');
    } else {
      console.log(response.statusText);
      alert(response.statusText);
    }
  }
};

document.querySelector('#entry-btn').addEventListener('click', addBlog);
