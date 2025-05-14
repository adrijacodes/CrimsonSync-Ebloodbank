
import PC1 from '../assets/EventphotoCards/PC1.jpg';
import PC2 from '../assets/EventphotoCards/PC2.jpg';
import PC3 from '../assets/EventphotoCards/PC3.jpeg';
import PC4 from '../assets/EventphotoCards/PC4.jpg';
import PC5 from '../assets/EventphotoCards/PC5.jpg';
import PC6 from '../assets/EventphotoCards/PC6.jpeg';
import PC7 from '../assets/EventphotoCards/PC7.jpeg';

// this is for single images
const randomIndex = () => {
  const imageList = [PC1, PC2, PC3, PC4, PC5, PC6, PC7];
  const randomIndex = Math.floor(Math.random() * imageList.length);
  return imageList[randomIndex];
};

export default randomIndex;
