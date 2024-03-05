import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, imageUrl } from '../../constants/baseUrl';

function Tekshiruv() {
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend API
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get(`${baseUrl}categories/`)
      .then(response => {
        const data = response.data;
        // console.log('Categories:', data.all_categ);
        setCategories([{ name: 'All', ctg_img: '' }, ...data.all_categ]);
      })
      // .catch(error => console.error('Error fetching categories:', error));
  };

  const fetchImages = (url) => {
    if (loading) return;
    setLoading(true);

    axios.get(url)
      .then(response => {
        const data = response.data;
        // console.log('Images:', data.results.category_imgs);

        const imagesContainer = document.getElementById('images-container');

        // Clear existing images when fetching the first page
        if (!nextPageUrl) {
          imagesContainer.innerHTML = '';
        }

        // Iterate over images and create image elements dynamically
        data.results.category_imgs.forEach(imageData => {
          const image = document.createElement('img');
          image.src = `${imageUrl}${imageData.image}`;
          image.alt = imageData.custom_name;
          image.className = 'image';

          // Append image to the container
          imagesContainer.appendChild(image);
        });

        // Update nextPageUrl for fetching the next page
        setNextPageUrl(data.next || '');
        setLoading(false); // Reset loading flag
      })
      .catch(error => {
        // console.error('Error fetching images:', error);
        setLoading(false); // Reset loading flag
      });
  };

  const handleCategorySelection = (categoryName) => {
    const url = categoryName
      ? `${baseUrl}ctg-filter/${categoryName}/`
      : `${baseUrl}ctg-filter/`;

    fetchImages(url);
  };

  useEffect(() => {
    // Add event listener for infinite scroll
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (nextPageUrl) {
          fetchImages(nextPageUrl);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextPageUrl]);

  return (
    <div>
      <div id="categories-container" className='flex flex-row gap-3 p-5'>
        <button
          className="category-button bg-blue-500 p-4 rounded-xl"
          onClick={() => handleCategorySelection("All")}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.name}
            className="category-button bg-blue-500 p-4 rounded-xl"
            onClick={() => handleCategorySelection(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div id="images-container">
        {/* Render images here */}
      </div>
    </div>
  );
};

export default Tekshiruv;