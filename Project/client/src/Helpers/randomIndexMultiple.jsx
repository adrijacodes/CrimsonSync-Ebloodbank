import PC1 from '../assets/EventphotoCards/PC1.jpg';
import PC2 from '../assets/EventphotoCards/PC2.jpg';
import PC3 from '../assets/EventphotoCards/PC3.jpeg';
import PC4 from '../assets/EventphotoCards/PC4.jpg';
import PC5 from '../assets/EventphotoCards/PC5.jpg';
import PC6 from '../assets/EventphotoCards/PC6.jpeg';
import PC7 from '../assets/EventphotoCards/PC7.jpeg';

const imageList = [PC1, PC2, PC3, PC4, PC5, PC6, PC7]; 
// this is for multiple images
const randomIndexMultiple = (count = 3) => {
  const shuffled = [...imageList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default randomIndexMultiple;
