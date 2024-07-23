import React, { useState } from 'react';
import PrimarySearchAppBar from '../layout/Header'; // Adjust the import path accordingly
import Box from '@mui/material/Box';

// Function to generate random lorem ipsum blocks
const generateLoremBlocks = (count) => {
  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla, leo eget fermentum fringilla, magna diam dignissim odio, et porttitor lectus purus at nunc. Suspendisse potenti. Morbi molestie, libero quis lacinia ultrices, sapien odio scelerisque lacus, sed lacinia nunc nisl id odio. Donec nec pharetra augue. Sed aliquet ullamcorper neque, nec posuere ipsum sodales id. Nullam suscipit arcu sed sem laoreet, id feugiat nisi consequat. Nullam accumsan id dui et fermentum. Nullam id dui eget nulla eleifend suscipit ac a libero.`;

  const blocks = [];
  for (let i = 0; i < count; i++) {
    blocks.push(
      <div key={i} style={{ marginBottom: '20px' }}>
        <p>{loremIpsum}</p>
      </div>
    );
  }
  return blocks;
};

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
  };

  // Generate random lorem ipsum blocks
  const leftSidebarContent = generateLoremBlocks(5); // Adjust the count as needed
  const rightSidebarContent = generateLoremBlocks(3); // Adjust the count as needed

  return (
    <div>
      <PrimarySearchAppBar onAddBlog={addBlog} /> {/* Pass addBlog as prop */}
      <Box sx={{ display: 'flex' }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: '20%',
            minWidth: '250px',
            borderRight: '1px solid #ddd',
            padding: '20px',
            position: 'fixed',
            left: 0,
            top: 80,
            bottom: 0,
            overflowY: 'auto',
            backgroundColor: '#f5f5f5',
            zIndex: 1000,
          }}
        >
          {/* Render left sidebar content */}
          {leftSidebarContent}
        </Box>

        {/* Main Content */}
        <Box sx={{ width: '60%', marginLeft: '20%', padding: '20px' }}>
          <main>
            {/* Render blogs */}
            {blogs.map((blog, index) => (
              <div key={index} style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#333' }}>{blog.title}</h3>
                <p style={{ color: '#666', marginBottom: '10px' }}>{blog.description}</p>
                {blog.imageUrl && <img src={blog.imageUrl} alt="Blog" style={{ maxWidth: '100%', marginBottom: '10px', borderRadius: '4px' }} />}
                <p style={{ color: '#999', fontSize: '0.9rem' }}>Time: {blog.time}</p>
              </div>
            ))}
          </main>
        </Box>

        {/* Right Sidebar */}
        <Box
          sx={{
            width: '20%',
            minWidth: '250px',
            borderLeft: '1px solid #ddd',
            padding: '20px',
            position: 'fixed',
            right: 0,
            top: 80,
            bottom: 0,
            overflowY: 'auto',
            backgroundColor: '#f5f5f5',
            zIndex: 1000,
          }}
        >
          {/* Render right sidebar content */}
          {rightSidebarContent}
        </Box>
      </Box>
    </div>
  );
}
