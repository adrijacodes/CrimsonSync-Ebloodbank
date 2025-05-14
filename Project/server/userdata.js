// member dummy data
export const userdata = [
  // Pair 1 - A+ | Pune | MON, TUES, THURS
  {
    name: "Rahul Deshmukh",
    email: "rahul1@example.com",
    password: "hashedpassword1",
    bloodType: "A+",
    location: { city: "Pune", state: "Maharashtra" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["MON", "TUES", "THURS"],
  },
  {
    name: "Rakesh Mehta",
    email: "rakesh1@example.com",
    password: "hashedpassword2",
    bloodType: "A+",
    location: { city: "Pune", state: "Maharashtra" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "THURS"],
  },

  // Pair 2 - B+ | Kolkata | THURS, SAT, SUN
  {
    name: "Piku Sen",
    email: "piku@example.com",
    password: "hashedpassword3",
    bloodType: "B+",
    location: { city: "Kolkata", state: "West Bengal" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["THURS", "SAT", "SUN"],
  },
  {
    name: "Nahin Das",
    email: "nahin@example.com",
    password: "hashedpassword4",
    bloodType: "B+",
    location: { city: "Kolkata", state: "West Bengal" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["THURS", "SAT", "SUN"],
  },

  // Pair 3 - AB+ | Delhi | WED, FRI
  {
    name: "Neha Verma",
    email: "neha@example.com",
    password: "hashedpassword5",
    bloodType: "AB+",
    location: { city: "Delhi", state: "Delhi" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["WED", "FRI"],
  },
  {
    name: "Sohan Bhat",
    email: "sohan@example.com",
    password: "hashedpassword6",
    bloodType: "AB+",
    location: { city: "Delhi", state: "Delhi" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["WED", "FRI"],
  },

  // Pair 4 - O- | Chennai | MON, WED, FRI
  {
    name: "Tanvi Rao",
    email: "tanvi@example.com",
    password: "hashedpassword7",
    bloodType: "O-",
    location: { city: "Chennai", state: "Tamil Nadu" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["MON", "WED", "FRI"],
  },
  {
    name: "Arjun Pillai",
    email: "arjun@example.com",
    password: "hashedpassword8",
    bloodType: "O-",
    location: { city: "Chennai", state: "Tamil Nadu" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "WED", "FRI"],
  },

  // Pair 5 - A- | Jaipur | TUES, THURS, SUN
  {
    name: "Megha Singh",
    email: "megha@example.com",
    password: "hashedpassword9",
    bloodType: "A-",
    location: { city: "Jaipur", state: "Rajasthan" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["TUES", "THURS", "SUN"],
  },
  {
    name: "Rajat Yadav",
    email: "rajat@example.com",
    password: "hashedpassword10",
    bloodType: "A-",
    location: { city: "Jaipur", state: "Rajasthan" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["TUES", "THURS", "SUN"],
  },

  // Pair 6 - AB- | Lucknow | MON, TUES, FRI
  {
    name: "Rina Joshi",
    email: "rina@example.com",
    password: "hashedpassword11",
    bloodType: "AB-",
    location: { city: "Lucknow", state: "Uttar Pradesh" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["MON", "TUES", "FRI"],
  },
  {
    name: "Devendra Gupta",
    email: "dev@example.com",
    password: "hashedpassword12",
    bloodType: "AB-",
    location: { city: "Lucknow", state: "Uttar Pradesh" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "FRI"],
  },

  // Pair 7 - O+ | Ahmedabad | MON, THURS
  {
    name: "Amit Shah",
    email: "amit@example.com",
    password: "hashedpassword13",
    bloodType: "O+",
    location: { city: "Ahmedabad", state: "Gujarat" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["MON", "THURS"],
  },
  {
    name: "Simran Patel",
    email: "simran@example.com",
    password: "hashedpassword14",
    bloodType: "O+",
    location: { city: "Ahmedabad", state: "Gujarat" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "THURS"],
  },

  // Pair 8 - B- | Bengaluru | WED, SAT
  {
    name: "Lakshmi Reddy",
    email: "lakshmi@example.com",
    password: "hashedpassword15",
    bloodType: "B-",
    location: { city: "Bengaluru", state: "Karnataka" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["WED", "SAT"],
  },
  {
    name: "Manish Rao",
    email: "manish@example.com",
    password: "hashedpassword16",
    bloodType: "B-",
    location: { city: "Bengaluru", state: "Karnataka" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["WED", "SAT"],
  },

  // Pair 9 - A+ | Surat | MON, TUES
  {
    name: "Reena Bhatt",
    email: "reena@example.com",
    password: "hashedpassword17",
    bloodType: "A+",
    location: { city: "Surat", state: "Gujarat" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["MON", "TUES"],
  },
  {
    name: "Hardik Thakkar",
    email: "hardik@example.com",
    password: "hashedpassword18",
    bloodType: "A+",
    location: { city: "Surat", state: "Gujarat" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES"],
  },

  // Pair 10 - B+ | Bhopal | TUES, THURS
  {
    name: "Anjali Mishra",
    email: "anjali@example.com",
    password: "hashedpassword19",
    bloodType: "B+",
    location: { city: "Bhopal", state: "Madhya Pradesh" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["TUES", "THURS"],
  },
  {
    name: "Ravi Tripathi",
    email: "ravi@example.com",
    password: "hashedpassword20",
    bloodType: "B+",
    location: { city: "Bhopal", state: "Madhya Pradesh" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["TUES", "THURS"],
  },

  // Pair 11 - AB+ | Noida | MON, FRI
  {
    name: "Priya Saxena",
    email: "priya@example.com",
    password: "hashedpassword21",
    bloodType: "AB+",
    location: { city: "Noida", state: "Uttar Pradesh" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["MON", "FRI"],
  },
  {
    name: "Kabir Malhotra",
    email: "kabir@example.com",
    password: "hashedpassword22",
    bloodType: "AB+",
    location: { city: "Noida", state: "Uttar Pradesh" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "FRI"],
  },

  // Pair 12 - O- | Patna | TUES, WED
  {
    name: "Anita Singh",
    email: "anita@example.com",
    password: "hashedpassword23",
    bloodType: "O-",
    location: { city: "Patna", state: "Bihar" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["TUES", "WED"],
  },
  {
    name: "Suraj Kumar",
    email: "suraj@example.com",
    password: "hashedpassword24",
    bloodType: "O-",
    location: { city: "Patna", state: "Bihar" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["TUES", "WED"],
  },

  // Pair 13 - A- | Kochi | MON, THURS
  {
    name: "Sneha Nair",
    email: "sneha@example.com",
    password: "hashedpassword25",
    bloodType: "A-",
    location: { city: "Kochi", state: "Kerala" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["MON", "THURS"],
  },
  {
    name: "Vivek Menon",
    email: "vivek@example.com",
    password: "hashedpassword26",
    bloodType: "A-",
    location: { city: "Kochi", state: "Kerala" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "THURS"],
  },

  // Pair 14 - AB- | Ranchi | FRI, SAT
  {
    name: "Komal Singh",
    email: "komal@example.com",
    password: "hashedpassword27",
    bloodType: "AB-",
    location: { city: "Ranchi", state: "Jharkhand" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["FRI", "SAT"],
  },
  {
    name: "Nikhil Sinha",
    email: "nikhil@example.com",
    password: "hashedpassword28",
    bloodType: "AB-",
    location: { city: "Ranchi", state: "Jharkhand" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["FRI", "SAT"],
  },

  // Pair 15 - B- | Guwahati | MON, TUES, FRI
  {
    name: "Reetika Baruah",
    email: "reetika@example.com",
    password: "hashedpassword29",
    bloodType: "B-",
    location: { city: "Guwahati", state: "Assam" },
    isDonor: true,
    isRecipient: false,
    role: "member",
    availability: ["MON", "TUES", "FRI"],
  },
  {
    name: "Jayanta Gogoi",
    email: "jayanta@example.com",
    password: "hashedpassword30",
    bloodType: "B-",
    location: { city: "Guwahati", state: "Assam" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "FRI"],
  },

  // Meerut
  {
    name: "Lakshmi Narayanan",
    email: "lakshmi.narayanan@example.com",
    password: "hashedpassword1",
    bloodType: "B+",
    location: { city: "Meerut", state: "Uttar Pradesh" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Revathi Suresh",
    email: "revathi.suresh@example.com",
    password: "hashedpassword2",
    bloodType: "B+",
    location: { city: "Meerut", state: "Uttar Pradesh" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Anand Rajasekaran",
    email: "anand.raj@example.com",
    password: "hashedpassword3",
    bloodType: "O+",
    location: { city: "Meerut", state: "Uttar Pradesh" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Divya Shankar",
    email: "divya.shankar@example.com",
    password: "hashedpassword4",
    bloodType: "AB+",
    location: { city: "Meerut", state: "Uttar Pradesh" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Karthik Muralidharan",
    email: "karthik.murali@example.com",
    password: "hashedpassword5",
    bloodType: "B+",
    location: { city: "Meerut", state: "Uttar Pradesh" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },

  // Nashik
  {
    name: "Meenakshi Balaji",
    email: "meenakshi.balaji@example.com",
    password: "hashedpassword6",
    bloodType: "O-",
    location: { city: "Nashik", state: "Maharashtra" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Sathya Venkatesh",
    email: "sathya.venkat@example.com",
    password: "hashedpassword7",
    bloodType: "B+",
    location: { city: "Nashik", state: "Maharashtra" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Pranav Chandrasekar",
    email: "pranav.chandra@example.com",
    password: "hashedpassword8",
    bloodType: "A+",
    location: { city: "Nashik", state: "Maharashtra" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Vidya Arvind",
    email: "vidya.arvind@example.com",
    password: "hashedpassword9",
    bloodType: "AB-",
    location: { city: "Nashik", state: "Maharashtra" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Raghavan Krishnan",
    email: "raghavan.krishnan@example.com",
    password: "hashedpassword10",
    bloodType: "O+",
    location: { city: "Nashik", state: "Maharashtra" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },

  // Vadodara
  {
    name: "Hari Priya",
    email: "hari.priya@example.com",
    password: "hashedpassword11",
    bloodType: "B-",
    location: { city: "Vadodara", state: "Gujarat" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Nithya Kumar",
    email: "nithya.kumar@example.com",
    password: "hashedpassword12",
    bloodType: "AB+",
    location: { city: "Vadodara", state: "Gujarat" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Sundar Rajan",
    email: "sundar.rajan@example.com",
    password: "hashedpassword13",
    bloodType: "A-",
    location: { city: "Vadodara", state: "Gujarat" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Kalaivani Ramesh",
    email: "kalaivani.ramesh@example.com",
    password: "hashedpassword14",
    bloodType: "B+",
    location: { city: "Vadodara", state: "Gujarat" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Jayaprakash Anand",
    email: "jay.anand@example.com",
    password: "hashedpassword15",
    bloodType: "O-",
    location: { city: "Vadodara", state: "Gujarat" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },

  // Gaya
  {
    name: "Devi Arul",
    email: "devi.arul@example.com",
    password: "hashedpassword16",
    bloodType: "A+",
    location: { city: "Gaya", state: "Bihar" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Murugan Selvam",
    email: "murugan.selvam@example.com",
    password: "hashedpassword17",
    bloodType: "B-",
    location: { city: "Gaya", state: "Bihar" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Bhavana Dinesh",
    email: "bhavana.dinesh@example.com",
    password: "hashedpassword18",
    bloodType: "O+",
    location: { city: "Gaya", state: "Bihar" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Ganesh Padmanabhan",
    email: "ganesh.padma@example.com",
    password: "hashedpassword19",
    bloodType: "AB+",
    location: { city: "Gaya", state: "Bihar" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Sindhu Varadhan",
    email: "sindhu.varadhan@example.com",
    password: "hashedpassword20",
    bloodType: "A-",
    location: { city: "Gaya", state: "Bihar" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },

  // Kollam
  {
    name: "Arunachalam Ravi",
    email: "arun.ravi@example.com",
    password: "hashedpassword21",
    bloodType: "O+",
    location: { city: "Kollam", state: "Kerala" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Vaishnavi Mohan",
    email: "vaishnavi.mohan@example.com",
    password: "hashedpassword22",
    bloodType: "B+",
    location: { city: "Kollam", state: "Kerala" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Naveen Elangovan",
    email: "naveen.elango@example.com",
    password: "hashedpassword23",
    bloodType: "O-",
    location: { city: "Kollam", state: "Kerala" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Sharanya Iyer",
    email: "sharanya.iyer@example.com",
    password: "hashedpassword24",
    bloodType: "O-",
    location: { city: "Kollam", state: "Kerala" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
  {
    name: "Vignesh Manoharan",
    email: "vignesh.manoharan@example.com",
    password: "hashedpassword25",
    bloodType: "O-",
    location: { city: "Kollam", state: "Kerala" },
    isDonor: true,
    isRecipient: true,
    role: "member",
    availability: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
  },
];
// for just adding data
//Pair 12 - O+ | Indore | FRI, SAT
// export const userdata=[{
//   name: "Sneha Kulkarni",
//   email: "sneha25@example.com",
//   password: "hashedpassword22",
//   bloodType: "O+",
//   location: { city: "Indore", state: "Madhya Pradesh" },
//   isDonor: true,
//   isRecipient: false,
//   role: "member",
//   availability: ["FRI", "SAT"]
// },
// {
//   name: "Vivek Jain",
//   email: "vivekl@example.com",
//   password: "hashedpassword23",
//   bloodType: "O+",
//   location: { city: "Indore", state: "Madhya Pradesh" },
//   isDonor: true,
//   isRecipient: true,
//   role: "member",
//   availability: ["FRI", "SAT"]
// },{
//   name: "Divya Nair",
//   email: "divyas@example.com",
//   password: "hashedpassword24",
//   bloodType: "A-",
//   location: { city: "Kochi", state: "Kerala" },
//   isDonor: true,
//   isRecipient: false,
//   role: "member",
//   availability: ["WED", "FRI"]
// },
// //Pair 13 - A- | Kochi | WED, FRI
// {
//   name: "Nikhil Menon",
//   email: "nikhilplays@example.com",
//   password: "hashedpassword25",
//   bloodType: "A-",
//   location: { city: "Kochi", state: "Kerala" },
//   isDonor: true,
//   isRecipient: true,
//   role: "member",
//   availability: ["WED", "FRI"]
// }

// ]

// event dummy data
// export const eventData = [
//   // Mumbai
//   {
//     "eventName": "Mumbai Blood Connect Drive",
//     "date": "2025-05-10T09:00:00Z",
//     "venue": "Lokmanya Tilak Hospital, Mumbai",
//     "city": "Mumbai",
//     "description": "Join the Blood Connect Drive in Mumbai to support local hospitals and save lives through your noble donation."
//   },
//   {
//     "eventName": "Youth for Blood - Mumbai",
//     "date": "2025-05-18T09:00:00Z",
//     "venue": "Azad Maidan, Mumbai",
//     "city": "Mumbai",
//     "description": "The youth of Mumbai are gathering for a powerful blood donation rally – your contribution can make a big difference!"
//   },
//   {
//     "eventName": "Mumbai Rakta Utsav",
//     "date": "2025-06-05T09:00:00Z",
//     "venue": "CST Railway Station, Mumbai",
//     "city": "Mumbai",
//     "description": "A city-wide Rakta Utsav at the heart of Mumbai – step in and become someone’s hero today."
//   },
//   {
//     "eventName": "Mumbai Red Drop Day",
//     "date": "2025-05-01T10:00:00Z",
//     "venue": "Bandra Blood Bank, Mumbai",
//     "city": "Mumbai",
//     "description": "This May Day, give the gift of life. Participate in Mumbai’s Red Drop Day and save lives."
//   },
//   {
//     "eventName": "Andheri Camp - Mumbai",
//     "date": "2025-05-01T10:00:00Z",
//     "venue": "Andheri Community Center, Mumbai",
//     "city": "Mumbai",
//     "description": "Walk in and donate! Join us for a local blood camp in Andheri this morning."
//   },
//   {
//     "eventName": "Mumbai Maha Raktdaan Abhiyaan",
//     "date": "2025-03-04T09:00:00Z",
//     "venue": "Tata Memorial Hospital, Mumbai",
//     "city": "Mumbai",
//     "description": "4 March ko Mumbai mein ho raha hai Maha Raktdaan Abhiyaan. Ek boond khoon kisi ki saans ban sakti hai – aaiye aur is mahaabhiyan ka hissa baniye!"
//   },
//   {
//     "eventName": "Mumbai Lifeline Camp",
//     "date": "2025-02-21T09:00:00Z",
//     "venue": "JJ Hospital, Mumbai",
//     "city": "Mumbai",
//     "description": "February mein Mumbai mein hoga Lifeline Blood Donation Camp – ek zaruratmand ke liye aap hi ho sakte hain devdoot."
//   },

//   // Kolkata
//   {
//     "eventName": "Kolkata Blood Warriors Drive",
//     "date": "2025-05-07T09:00:00Z",
//     "venue": "NRS Medical College, Kolkata",
//     "city": "Kolkata",
//     "description": "Support the Blood Warriors Drive in Kolkata and become a lifesaver in just a few minutes."
//   },
//   {
//     "eventName": "Save a Life - Kolkata Camp",
//     "date": "2025-05-15T09:00:00Z",
//     "venue": "Rabindra Sadan, Kolkata",
//     "city": "Kolkata",
//     "description": "Donate blood. Be a hero. Join us in Kolkata for a meaningful cause this May."
//   },
//   {
//     "eventName": "Rakta Seva Mela - Kolkata",
//     "date": "2025-06-02T09:00:00Z",
//     "venue": "Howrah Indoor Stadium, Kolkata",
//     "city": "Kolkata",
//     "description": "Rakta Seva Mela is back with energy and hope – join Kolkata's biggest blood donation drive."
//   },
//   {
//     "eventName": "Kolkata Mayday Blood Drive",
//     "date": "2025-05-01T10:00:00Z",
//     "venue": "South City Mall, Kolkata",
//     "city": "Kolkata",
//     "description": "This May Day, be someone’s lifeline. Join the Kolkata Mayday blood camp at South City."
//   },
//   {
//     "eventName": "Dumdum Blood Help Camp",
//     "date": "2025-05-01T10:00:00Z",
//     "venue": "Dumdum Community Hall, Kolkata",
//     "city": "Kolkata",
//     "description": "Walk in to donate and walk out a hero. Today’s Dumdum blood camp awaits your support."
//   },
//   {
//     "eventName": "Kolkata February Hope Camp",
//     "date": "2025-02-10T09:00:00Z",
//     "venue": "Apollo Clinic, Kolkata",
//     "city": "Kolkata",
//     "description": "Start the year with kindness. Join us in February for a life-saving cause in Kolkata."
//   },
//   {
//     "eventName": "Kolkata Raktdaan Mahotsav",
//     "date": "2025-03-12T09:00:00Z",
//     "venue": "Deshapriya Park, Kolkata",
//     "city": "Kolkata",
//     "description": "Join the vibrant celebration of blood donation at Deshapriya Park this March!"
//   },

//   // Delhi
//   {
//     "eventName": "Delhi Blood Drive Marathon",
//     "date": "2025-05-09T09:00:00Z",
//     "venue": "AIIMS Hospital, Delhi",
//     "city": "Delhi",
//     "description": "Run to donate – join Delhi’s first Blood Drive Marathon and save a life with every step."
//   },
//   {
//     "eventName": "Dil Se Raktdaan - Delhi",
//     "date": "2025-05-16T09:00:00Z",
//     "venue": "India Gate Grounds, Delhi",
//     "city": "Delhi",
//     "description": "Dil se dena hai toh raktdaan kariye – be a part of Delhi’s largest donation drive!"
//   },
//   {
//     "eventName": "Red Pulse - Delhi Chapter",
//     "date": "2025-06-03T09:00:00Z",
//     "venue": "Connaught Place, Delhi",
//     "city": "Delhi",
//     "description": "Let your blood pulse through others – donate in Delhi’s Red Pulse camp."
//   },
//   {
//     "eventName": "Delhi May Day Camp",
//     "date": "2025-05-01T10:00:00Z",
//     "venue": "Saket Community Centre, Delhi",
//     "city": "Delhi",
//     "description": "Celebrate this day of labor by giving the gift of life at Saket."
//   },
//   {
//     "eventName": "Dwarka Blood Spot",
//     "date": "2025-05-01T10:00:00Z",
//     "venue": "Sector 12 Park, Dwarka, Delhi",
//     "city": "Delhi",
//     "description": "Your presence today can be someone’s miracle. Join us at the Dwarka blood camp."
//   },
//   {
//     "eventName": "Delhi Hope Camp",
//     "date": "2025-03-20T09:00:00Z",
//     "venue": "Rajiv Chowk Metro Station, Delhi",
//     "city": "Delhi",
//     "description": "Donate hope, donate blood. Join our March campaign at Rajiv Chowk."
//   },
//   {
//     "eventName": "Nayi Subah Blood Drive",
//     "date": "2025-02-15T09:00:00Z",
//     "venue": "Lajpat Nagar Hall, Delhi",
//     "city": "Delhi",
//     "description": "Nayi subah ka arambh ek acchi karm se – donate blood this February in Delhi."
//   },

//   // Hyderabad
//   {
//     "eventName": "Hyderabad Heroes Blood Drive",
//     "date": "2025-05-12T09:00:00Z",
//     "venue": "Charminar Grounds, Hyderabad",
//     "city": "Hyderabad",
//     "description": "Become a Hyderabad Hero by donating blood this May!"
//   },
//   {
//     "eventName": "Red Drop Fest - Hyderabad",
//     "date": "2025-05-20T09:00:00Z",
//     "venue": "Banjara Hills Community Center, Hyderabad",
//     "city": "Hyderabad",
//     "description": "Join the festive vibe and noble cause – Hyderabad needs your drop!"
//   },
//   {
//     "eventName": "Hyderabad Blood Revolution",
//     "date": "2025-06-06T09:00:00Z",
//     "venue": "Osmania University Grounds, Hyderabad",
//     "city": "Hyderabad",
//     "description": "Support the blood revolution in Hyderabad. Every unit counts!"
//   },
//   {
//     "eventName": "Hyderabad May Day Blood Help",
//     "date": "2025-05-01T10:00:00Z",
//     "venue": "Ameerpet Red Cross, Hyderabad",
//     "city": "Hyderabad",
//     "description": "Start your day by saving a life. Join the May Day donation event in Ameerpet."
//   },
//   {
//     "eventName": "Hyderabad LifeLink Drive",
//     "date": "2025-05-01T10:00:00Z",
//     "venue": "Begumpet Camp Centre, Hyderabad",
//     "city": "Hyderabad",
//     "description": "Be the lifeline someone needs. Donate this morning in Begumpet."
//   },
//   {
//     "eventName": "Hyderabad Rakta Ganga",
//     "date": "2025-03-08T09:00:00Z",
//     "venue": "Gandipet Lake View, Hyderabad",
//     "city": "Hyderabad",
//     "description": "Ganga jaisa pavitra – apka khoon kisi ko nayi zindagi de sakta hai."
//   },
//   {
//     "eventName": "Hyderabad Seva Blood Drive",
//     "date": "2025-02-19T09:00:00Z",
//     "venue": "Koti Women's College, Hyderabad",
//     "city": "Hyderabad",
//     "description": "Seva ka sabse shresth roop – raktdaan! Join our February campaign in Hyderabad."
//   },

//   // Bangalore
//   {
//     "eventName": "Bangalore Blood Bash",
//     "date": "2025-05-11T09:00:00Z",
//     "venue": "Lalbagh Botanical Garden, Bangalore",
//     "city": "Bangalore",
//     "description": "Bangalore’s biggest summer blood bash is here – be a part of the revolution."
//   },
//   {
//     "eventName": "South Star Blood Drive - Bangalore",
//     "date": "2025-05-19T09:00:00Z",
//     "venue": "Forum Mall, Koramangala, Bangalore",
//     "city": "Bangalore",
//     "description": "Donate blood. Get blessings. Enjoy a joyful donation day at Forum Mall."
//   },
//   {
//     "eventName": "Red Ribbon Event - Bangalore",
//     "date": "2025-06-07T09:00:00Z",
//     "venue": "Cubbon Park, Bangalore",
//     "city": "Bangalore",
//     "description": "Red is the color of life – and you can bring it to someone’s world today!"
//   },
//   {
//     "eventName": "Bangalore May Day Camp",
//     "date": "2025-05-01T10:00:00Z",
//     "venue": "MG Road, Bangalore",
//     "city": "Bangalore",
//     "description": "Blood donation camp this morning at MG Road – be the reason someone smiles today."
//   },
//   {
//     "eventName": "Koramangala Camp - Bangalore",
//     "date": "2025-05-01T10:00:00Z",
//     "venue": "Koramangala Club House, Bangalore",
//     "city": "Bangalore",
//     "description": "Step in at Koramangala Club for a noble cause this morning."
//   },
//   {
//     "eventName": "Bangalore Sankalp Drive",
//     "date": "2025-03-10T09:00:00Z",
//     "venue": "Indiranagar, Bangalore",
//     "city": "Bangalore",
//     "description": "Sankalp lekar aaye hain hum – donate blood in March and spread hope."
//   },
//   {
//     "eventName": "Hope Pulse Bangalore",
//     "date": "2025-02-25T09:00:00Z",
//     "venue": "Whitefield Tech Park, Bangalore",
//     "city": "Bangalore",
//     "description": "Join techies and students in a heartful campaign to donate blood in February!"
//   }
// ];
