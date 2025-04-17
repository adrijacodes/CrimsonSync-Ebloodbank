import React from "react";
import { useLocation, useParams } from "react-router-dom";

const mockEvents = [
  {
    id: 1,
    name: 'Blood Donation Camp',
    city: 'Delhi',
    date: '2025-04-20',
    location: 'AIIMS Hospital',
    images: [
      'https://ahduni.edu.in/site/assets/files/4653/87259dsc02399-1.1600x0.1400x0.webp',
    ],
  },
  {
    id: 2,
    name: 'Health Awareness Walk',
    city: 'Mumbai',
    date: '2025-04-25',
    location: 'Marine Drive',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkDAC0-KDCYqrfzBi0_Pco6ZiImXq6mWswQ&s',
    ],
  },
  {
    id: 3,
    name: 'Plasma Donation Drive',
    city: 'Delhi',
    date: '2025-04-22',
    location: 'Red Cross Center',
    images: [
      'https://delhitechnicalcampus.ac.in/wp-content/uploads/2019/10/blood-camp-2.jpeg',
    ],
  },
  {
    id: 4,
    name: 'Free Health Checkup Camp',
    city: 'Chennai',
    date: '2025-04-30',
    location: 'Apollo Hospital',
    images: [
      'https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2016/06/14/Pictures/blood-donation-camp-at-iehe_06c40a76-322c-11e6-a1a7-3aade94c5b51.jpg',
    ],
  },
  {
    id: 5,
    name: 'Amra Sobai Club',
    city: 'Kolkata',
    date: '2025-04-22',
    location: 'LakeTown',
    image:
      ['https://www.mckv.edu.in/site/assets/files/1689/e11ce922-5c1f-4614-8cd1-351830211b02.jpg'],
  },
  {
    id: 6,
    name: 'Mega voluntary Blood Donation Camp',
    city: 'Kolkata',
    date: '2025-09-10',
    location: 'Gariahat',
    images: [
      'https://www.tripurastarnews.com/wp-content/uploads/2023/07/30-07-2023-Mega-Voluntary-Blood-Donation-Camp-Organized-By-AMURT-At-Ananda-Marga-School-Bishalgarh.Pic-1.jpeg',
      'https://t3.ftcdn.net/jpg/02/76/71/88/360_F_276718846_1mDkxI8gb6FrfuwAiPb6OuB4M7BbeuoV.jpg',
      'https://c8.alamy.com/comp/2RR9FHE/210614-kangra-june-14-2021-a-medical-officer-checks-a-bag-of-blood-at-a-blood-donation-camp-on-world-blood-donor-day-in-kangra-district-of-india-s-himachal-pradesh-state-june-14-2021-strxinhua-india-himachal-pradesh-kangra-world-blood-donor-day-javedxdar-publicationxnotxinxchn-2RR9FHE.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAvZlx3P6ow2RHNfAi6vItsnQqhMjwQs5xEQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6eUzCVrq126q6wxVytBvAa1dtJ09Pp-V8ow&s',
    ],
  },
];

const EventDetails = () => {
  const location = useLocation();
  const { id } = useParams();

  let event = location.state?.event;
  if (!event) {
    event = mockEvents.find(e => e.id === parseInt(id));
  }

  if (!event) return <div className="text-center text-xl">❌ Event not found</div>;

  // Fallback: if only one image exists
  const displayedImages = event.images.length > 1
    ? event.images.slice(0, 5)
    : [...event.images, ...Array(4).fill(event.images[0])];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-red-700 font-serif">{event.name}</h1>

      {/* Grid Gallery */}
      <div className="grid grid-cols-3 gap-2 h-[400px] rounded-xl overflow-hidden">
        <div className="col-span-2">
          <img
            src={displayedImages[0]}
            alt="Main"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <img src={displayedImages[1]} alt="" className="w-full h-full object-cover" />
            <img src={displayedImages[2]} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative grid grid-cols-2 gap-2">
            <img src={displayedImages[3]} alt="" className="w-full h-full object-cover" />
            <div className="relative">
              <img src={displayedImages[4]} alt="" className="w-full h-full object-cover brightness-75" />
              <div className="absolute inset-0 flex items-center justify-center">
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="mt-6 space-y-2 text-lg text-gray-700">
        <p>📅 Date: {event.date}</p>
        <p>📍 Location: {event.location}</p>
        <p>🏙️ City: {event.city}</p>
      </div>
    </div>
  );
};

export default EventDetails;
