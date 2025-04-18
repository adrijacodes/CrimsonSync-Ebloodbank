import React from 'react';
import PC1 from '../assets/EventphotoCards/PC1.jpg';
import PC2 from '../assets/EventphotoCards/PC2.jpg';
import PC3 from '../assets/EventphotoCards/PC3.jpeg';
import PC4 from '../assets/EventphotoCards/PC4.jpg';
import PC5 from '../assets/EventphotoCards/PC5.jpg';
import PC6 from '../assets/EventphotoCards/PC6.jpeg';
//import PC1 from '../../assets/EventphotoCards/PC1.jpg';
const ImageList = () => {
  const imageList = [PC1, PC2, PC3, PC4, PC5, PC6];

  const randomIndex = Math.floor(Math.random() * imageList.length);
  const selectedImage = imageList[randomIndex];

  return (
    <div>
      <img src={selectedImage} alt="Random" style={{ width: '300px' }} />
    </div>
  );
};

export default ImageList;
