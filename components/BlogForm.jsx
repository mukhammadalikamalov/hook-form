import React, { useState } from 'react';

// Sample function to generate a unique ID (for demonstration purposes)
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false); // Track form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get current date and time in YYYY-MM-DD HH:MM format
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    try {
      // Simulate adding a blog to a local array
      const newBlog = {
        id: generateId(),
        title: formData.title,
        imageUrl: formData.imageUrl,
        description: formData.description,
        time: currentTime,
      };

      // Update the blogs state with the new blog
      setBlogs([...blogs, newBlog]);

      // Clear form fields after submission
      setFormData({
        title: '',
        imageUrl: '',
        description: '',
      });

      // Set submitted to true to hide the form and show blogs
      setSubmitted(true);

      // Optionally, handle success feedback or redirection
      alert('Blog added successfully!');
    } catch (error) {
      console.error('Error adding blog entry:', error.message);
      alert('Failed to add blog. Please try again.');
    }
  };

  return (
    <div>
      {!submitted ? (
        // Show the form if not submitted
        <div style={{ maxWidth: 600, margin: 'auto', marginTop: 20, padding: 20, textAlign: 'center', border: '1px solid #ccc', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Add a Blog Entry</h2>
          <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <div style={styles.inputGroup}>
              <label htmlFor="title" style={styles.label}>Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="imageUrl" style={styles.label}>Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
                style={styles.input}
              />
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Image Preview" style={styles.imagePreview} />
              )}
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="description" style={styles.label}>Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                style={styles.textarea}
              />
            </div>
            <button type="submit" style={styles.button}>Add Blog</button>
          </form>
        </div>
      ) : (
        // Show blog cards if form submitted
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 40 }}>
          {blogs.map(blog => (
            <div key={blog.id} style={styles.card}>
              <h3>{blog.title}</h3>
              {blog.imageUrl && (
                <img src={blog.imageUrl} alt="Blog" style={styles.cardImage} />
              )}
              <p>{blog.description}</p>
              <p>Published on: {blog.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  inputGroup: {
    marginBottom: 20,
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: '1rem',
    minHeight: 100,
  },
  imagePreview: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: 10,
    borderRadius: 4,
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  card: {
    width: 300,
    margin: 20,
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 8,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  cardImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 4,
  },
};

export default Home;
