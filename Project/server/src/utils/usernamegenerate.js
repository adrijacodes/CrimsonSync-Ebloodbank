
import {uniqueUsernameGenerator} from "unique-username-generator"
const bloodDonationWords = [
  'Donor',
  'Blood',
  'LifeSaver',
  'Helper',
  'Hope',
  'Gift',
  'Vital',
  'Hero',
  'Care',
  'Supporter',
  'Heart',
  'Courage'
];


const config = {
  dictionaries: [bloodDonationWords],
  separator: '-',
  style: 'capital',
  randomDigits: 3,
};


export const generateUsername = () => {
  return uniqueUsernameGenerator(config);
};

