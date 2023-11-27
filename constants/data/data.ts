import { AnimationObject } from 'lottie-react-native';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('../../assets/animations/LottieGift.json'),
    text: 'GIV(Brrrr)R',
    textColor: '#FFEB3B',
    backgroundColor: '#C3B1E1',
  },
  {
    id: 2,
    animation: require('../../assets/animations/LottieCalendar.json'),
    text: 'GIFT INSTANTLY WITH ONE CLICK',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: require('../../assets/animations/LottieSelfie.json'),
    text: 'WATCH HOW YOUR FRIENDS REACT',
    textColor: '#F15937',
    backgroundColor: '#faeb8a',
  },
];

export default data;
