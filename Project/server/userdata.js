// member dummy data
// export const userdata = [
//   {
//     "name": "Rahul Deshmukh",
//     "email": "rahul@example.com",
//     "password": "hashedpassword1",
//     "bloodType": "B+",
//     "location": { "city": "Kolkata", "state": "West Bengal" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["MON", "WED", "THURS"]
//   },
//   {
//     "name": "Amit Patil",
//     "email": "amit@example.com",
//     "password": "hashedpassword2",
//     "bloodType": "A-",
//     "location": { "city": "Mumbai", "state": "Maharashtra" },
//     "isDonor": false,
//     "isRecipient": true,
//     "role": "member",
//     "availability": ["TUES", "THURS", "SAT"]
//   },
//   {
//     "name": "Priya Jadhav",
//     "email": "priya@example.com",
//     "password": "hashedpassword3",
//     "bloodType": "B+",
//     "location": { "city": "Delhi", "state": "Delhi" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["MON", "THURS", "FRI"]
//   },
//   {
//     "name": "Soham Kulkarni",
//     "email": "soham@example.com",
//     "password": "hashedpassword4",
//     "bloodType": "AB+",
//     "location": { "city": "Bangalore", "state": "Karnataka" },
//     "isDonor": false,
//     "isRecipient": true,
//     "role": "member",
//     "availability": ["THURS", "SUN"]
//   },
//   {
//     "name": "Neha Shinde",
//     "email": "neha@example.com",
//     "password": "hashedpassword5",
//     "bloodType": "O-",
//     "location": { "city": "Hyderabad", "state": "Telangana" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["WED", "THURS", "SAT"]
//   },
//   {
//     "name": "Ravi Bhosale",
//     "email": "ravi@example.com",
//     "password": "hashedpassword6",
//     "bloodType": "B-",
//     "location": { "city": "Chennai", "state": "Tamil Nadu" },
//     "isDonor": false,
//     "isRecipient": true,
//     "role": "member",
//     "availability": ["THURS", "FRI", "SUN"]
//   },
//   {
//     "name": "Ayesha Gaikwad",
//     "email": "ayesha@example.com",
//     "password": "hashedpassword7",
//     "bloodType": "A+",
//     "location": { "city": "Pune", "state": "Maharashtra" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["TUES", "THURS", "SUN"]
//   },
//   {
//     "name": "Vikram More",
//     "email": "vikram@example.com",
//     "password": "hashedpassword8",
//     "bloodType": "O+",
//     "location": { "city": "Ahmedabad", "state": "Gujarat" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["MON", "THURS", "SAT"]
//   },
//   {
//     "name": "Meera Pawar",
//     "email": "meera@example.com",
//     "password": "hashedpassword9",
//     "bloodType": "AB-",
//     "location": { "city": "Lucknow", "state": "Uttar Pradesh" },
//     "isDonor": false,
//     "isRecipient": true,
//     "role": "member",
//     "availability": ["THURS", "FRI", "SAT"]
//   },
//   {
//     "name": "Rohit Salunkhe",
//     "email": "rohit@example.com",
//     "password": "hashedpassword10",
//     "bloodType": "A+",
//     "location": { "city": "Jaipur", "state": "Rajasthan" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["WED", "THURS", "SUN"]
//   },
//   {
//     "name": "Kavita Singh",
//     "email": "kavita@example.com",
//     "password": "hashedpassword11",
//     "bloodType": "B+",
//     "location": { "city": "Mumbai", "state": "Maharashtra" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["MON", "THURS", "SAT"]
//   },
//   {
//     "name": "Rajesh Naik",
//     "email": "rajesh@example.com",
//     "password": "hashedpassword12",
//     "bloodType": "B+",
//     "location": { "city": "Mumbai", "state": "Maharashtra" },
//     "isDonor": false,
//     "isRecipient": true,
//     "role": "member",
//     "availability": ["TUES", "THURS", "SUN"]
//   },
//   {
//     "name": "Shruti Verma",
//     "email": "shruti@example.com",
//     "password": "hashedpassword13",
//     "bloodType": "B+",
//     "location": { "city": "Mumbai", "state": "Maharashtra" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["WED", "THURS", "FRI"]
//   },
//   {
//     "name": "Rina Joshi",
//     "email": "rina@example.com",
//     "password": "hashedpassword14",
//     "bloodType": "B+",
//     "location": { "city": "Mumbai", "state": "Maharashtra" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["MON", "THURS", "SUN"]
//   },
//   {
//     "name": "Sandeep Reddy",
//     "email": "sandeep@example.com",
//     "password": "hashedpassword15",
//     "bloodType": "B+",
//     "location": { "city": "Mumbai", "state": "Maharashtra" },
//     "isDonor": false,
//     "isRecipient": true,
//     "role": "member",
//     "availability": ["TUES", "THURS", "SAT"]
//   },
//   {
//     "name": "Maya Shah",
//     "email": "maya@example.com",
//     "password": "hashedpassword16",
//     "bloodType": "B+",
//     "location": { "city": "Mumbai", "state": "Maharashtra" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["WED", "THURS", "SAT"]
//   },
//   {
//     "name": "Vishal Kapoor",
//     "email": "vishal@example.com",
//     "password": "hashedpassword17",
//     "bloodType": "B+",
//     "location": { "city": "Mumbai", "state": "Maharashtra" },
//     "isDonor": false,
//     "isRecipient": true,
//     "role": "member",
//     "availability": ["MON", "THURS", "FRI"]
//   },
//   {
//     "name": "Alok Gupta",
//     "email": "alok@example.com",
//     "password": "hashedpassword18",
//     "bloodType": "B+",
//     "location": { "city": "Mumbai", "state": "Maharashtra" },
//     "isDonor": true,
//     "isRecipient": false,
//     "role": "member",
//     "availability": ["TUES", "THURS", "FRI"]
//   }
// ];

// event dummy data
export const eventData = [
  // Mumbai
  {
    "eventName": "Mumbai Blood Connect Drive",
    "date": "2025-05-10T09:00:00Z",
    "venue": "Lokmanya Tilak Hospital, Mumbai",
    "city": "Mumbai",
    "description": "Join the Blood Connect Drive in Mumbai to support local hospitals and save lives through your noble donation."
  },
  {
    "eventName": "Youth for Blood - Mumbai",
    "date": "2025-05-18T09:00:00Z",
    "venue": "Azad Maidan, Mumbai",
    "city": "Mumbai",
    "description": "The youth of Mumbai are gathering for a powerful blood donation rally – your contribution can make a big difference!"
  },
  {
    "eventName": "Mumbai Rakta Utsav",
    "date": "2025-06-05T09:00:00Z",
    "venue": "CST Railway Station, Mumbai",
    "city": "Mumbai",
    "description": "A city-wide Rakta Utsav at the heart of Mumbai – step in and become someone’s hero today."
  },
  {
    "eventName": "Mumbai Red Drop Day",
    "date": "2025-05-01T10:00:00Z",
    "venue": "Bandra Blood Bank, Mumbai",
    "city": "Mumbai",
    "description": "This May Day, give the gift of life. Participate in Mumbai’s Red Drop Day and save lives."
  },
  {
    "eventName": "Andheri Camp - Mumbai",
    "date": "2025-05-01T10:00:00Z",
    "venue": "Andheri Community Center, Mumbai",
    "city": "Mumbai",
    "description": "Walk in and donate! Join us for a local blood camp in Andheri this morning."
  },
  {
    "eventName": "Mumbai Maha Raktdaan Abhiyaan",
    "date": "2025-03-04T09:00:00Z",
    "venue": "Tata Memorial Hospital, Mumbai",
    "city": "Mumbai",
    "description": "4 March ko Mumbai mein ho raha hai Maha Raktdaan Abhiyaan. Ek boond khoon kisi ki saans ban sakti hai – aaiye aur is mahaabhiyan ka hissa baniye!"
  },
  {
    "eventName": "Mumbai Lifeline Camp",
    "date": "2025-02-21T09:00:00Z",
    "venue": "JJ Hospital, Mumbai",
    "city": "Mumbai",
    "description": "February mein Mumbai mein hoga Lifeline Blood Donation Camp – ek zaruratmand ke liye aap hi ho sakte hain devdoot."
  },

  // Kolkata
  {
    "eventName": "Kolkata Blood Warriors Drive",
    "date": "2025-05-07T09:00:00Z",
    "venue": "NRS Medical College, Kolkata",
    "city": "Kolkata",
    "description": "Support the Blood Warriors Drive in Kolkata and become a lifesaver in just a few minutes."
  },
  {
    "eventName": "Save a Life - Kolkata Camp",
    "date": "2025-05-15T09:00:00Z",
    "venue": "Rabindra Sadan, Kolkata",
    "city": "Kolkata",
    "description": "Donate blood. Be a hero. Join us in Kolkata for a meaningful cause this May."
  },
  {
    "eventName": "Rakta Seva Mela - Kolkata",
    "date": "2025-06-02T09:00:00Z",
    "venue": "Howrah Indoor Stadium, Kolkata",
    "city": "Kolkata",
    "description": "Rakta Seva Mela is back with energy and hope – join Kolkata's biggest blood donation drive."
  },
  {
    "eventName": "Kolkata Mayday Blood Drive",
    "date": "2025-05-01T10:00:00Z",
    "venue": "South City Mall, Kolkata",
    "city": "Kolkata",
    "description": "This May Day, be someone’s lifeline. Join the Kolkata Mayday blood camp at South City."
  },
  {
    "eventName": "Dumdum Blood Help Camp",
    "date": "2025-05-01T10:00:00Z",
    "venue": "Dumdum Community Hall, Kolkata",
    "city": "Kolkata",
    "description": "Walk in to donate and walk out a hero. Today’s Dumdum blood camp awaits your support."
  },
  {
    "eventName": "Kolkata February Hope Camp",
    "date": "2025-02-10T09:00:00Z",
    "venue": "Apollo Clinic, Kolkata",
    "city": "Kolkata",
    "description": "Start the year with kindness. Join us in February for a life-saving cause in Kolkata."
  },
  {
    "eventName": "Kolkata Raktdaan Mahotsav",
    "date": "2025-03-12T09:00:00Z",
    "venue": "Deshapriya Park, Kolkata",
    "city": "Kolkata",
    "description": "Join the vibrant celebration of blood donation at Deshapriya Park this March!"
  },

  // Delhi
  {
    "eventName": "Delhi Blood Drive Marathon",
    "date": "2025-05-09T09:00:00Z",
    "venue": "AIIMS Hospital, Delhi",
    "city": "Delhi",
    "description": "Run to donate – join Delhi’s first Blood Drive Marathon and save a life with every step."
  },
  {
    "eventName": "Dil Se Raktdaan - Delhi",
    "date": "2025-05-16T09:00:00Z",
    "venue": "India Gate Grounds, Delhi",
    "city": "Delhi",
    "description": "Dil se dena hai toh raktdaan kariye – be a part of Delhi’s largest donation drive!"
  },
  {
    "eventName": "Red Pulse - Delhi Chapter",
    "date": "2025-06-03T09:00:00Z",
    "venue": "Connaught Place, Delhi",
    "city": "Delhi",
    "description": "Let your blood pulse through others – donate in Delhi’s Red Pulse camp."
  },
  {
    "eventName": "Delhi May Day Camp",
    "date": "2025-05-01T10:00:00Z",
    "venue": "Saket Community Centre, Delhi",
    "city": "Delhi",
    "description": "Celebrate this day of labor by giving the gift of life at Saket."
  },
  {
    "eventName": "Dwarka Blood Spot",
    "date": "2025-05-01T10:00:00Z",
    "venue": "Sector 12 Park, Dwarka, Delhi",
    "city": "Delhi",
    "description": "Your presence today can be someone’s miracle. Join us at the Dwarka blood camp."
  },
  {
    "eventName": "Delhi Hope Camp",
    "date": "2025-03-20T09:00:00Z",
    "venue": "Rajiv Chowk Metro Station, Delhi",
    "city": "Delhi",
    "description": "Donate hope, donate blood. Join our March campaign at Rajiv Chowk."
  },
  {
    "eventName": "Nayi Subah Blood Drive",
    "date": "2025-02-15T09:00:00Z",
    "venue": "Lajpat Nagar Hall, Delhi",
    "city": "Delhi",
    "description": "Nayi subah ka arambh ek acchi karm se – donate blood this February in Delhi."
  },

  // Hyderabad
  {
    "eventName": "Hyderabad Heroes Blood Drive",
    "date": "2025-05-12T09:00:00Z",
    "venue": "Charminar Grounds, Hyderabad",
    "city": "Hyderabad",
    "description": "Become a Hyderabad Hero by donating blood this May!"
  },
  {
    "eventName": "Red Drop Fest - Hyderabad",
    "date": "2025-05-20T09:00:00Z",
    "venue": "Banjara Hills Community Center, Hyderabad",
    "city": "Hyderabad",
    "description": "Join the festive vibe and noble cause – Hyderabad needs your drop!"
  },
  {
    "eventName": "Hyderabad Blood Revolution",
    "date": "2025-06-06T09:00:00Z",
    "venue": "Osmania University Grounds, Hyderabad",
    "city": "Hyderabad",
    "description": "Support the blood revolution in Hyderabad. Every unit counts!"
  },
  {
    "eventName": "Hyderabad May Day Blood Help",
    "date": "2025-05-01T10:00:00Z",
    "venue": "Ameerpet Red Cross, Hyderabad",
    "city": "Hyderabad",
    "description": "Start your day by saving a life. Join the May Day donation event in Ameerpet."
  },
  {
    "eventName": "Hyderabad LifeLink Drive",
    "date": "2025-05-01T10:00:00Z",
    "venue": "Begumpet Camp Centre, Hyderabad",
    "city": "Hyderabad",
    "description": "Be the lifeline someone needs. Donate this morning in Begumpet."
  },
  {
    "eventName": "Hyderabad Rakta Ganga",
    "date": "2025-03-08T09:00:00Z",
    "venue": "Gandipet Lake View, Hyderabad",
    "city": "Hyderabad",
    "description": "Ganga jaisa pavitra – apka khoon kisi ko nayi zindagi de sakta hai."
  },
  {
    "eventName": "Hyderabad Seva Blood Drive",
    "date": "2025-02-19T09:00:00Z",
    "venue": "Koti Women's College, Hyderabad",
    "city": "Hyderabad",
    "description": "Seva ka sabse shresth roop – raktdaan! Join our February campaign in Hyderabad."
  },

  // Bangalore
  {
    "eventName": "Bangalore Blood Bash",
    "date": "2025-05-11T09:00:00Z",
    "venue": "Lalbagh Botanical Garden, Bangalore",
    "city": "Bangalore",
    "description": "Bangalore’s biggest summer blood bash is here – be a part of the revolution."
  },
  {
    "eventName": "South Star Blood Drive - Bangalore",
    "date": "2025-05-19T09:00:00Z",
    "venue": "Forum Mall, Koramangala, Bangalore",
    "city": "Bangalore",
    "description": "Donate blood. Get blessings. Enjoy a joyful donation day at Forum Mall."
  },
  {
    "eventName": "Red Ribbon Event - Bangalore",
    "date": "2025-06-07T09:00:00Z",
    "venue": "Cubbon Park, Bangalore",
    "city": "Bangalore",
    "description": "Red is the color of life – and you can bring it to someone’s world today!"
  },
  {
    "eventName": "Bangalore May Day Camp",
    "date": "2025-05-01T10:00:00Z",
    "venue": "MG Road, Bangalore",
    "city": "Bangalore",
    "description": "Blood donation camp this morning at MG Road – be the reason someone smiles today."
  },
  {
    "eventName": "Koramangala Camp - Bangalore",
    "date": "2025-05-01T10:00:00Z",
    "venue": "Koramangala Club House, Bangalore",
    "city": "Bangalore",
    "description": "Step in at Koramangala Club for a noble cause this morning."
  },
  {
    "eventName": "Bangalore Sankalp Drive",
    "date": "2025-03-10T09:00:00Z",
    "venue": "Indiranagar, Bangalore",
    "city": "Bangalore",
    "description": "Sankalp lekar aaye hain hum – donate blood in March and spread hope."
  },
  {
    "eventName": "Hope Pulse Bangalore",
    "date": "2025-02-25T09:00:00Z",
    "venue": "Whitefield Tech Park, Bangalore",
    "city": "Bangalore",
    "description": "Join techies and students in a heartful campaign to donate blood in February!"
  }
];
