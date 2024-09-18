//sleep.ts
import { SectionList } from "react-native";
import { Course } from "../../models/courses";

export const SLEEP_COURSE:Course = { id: '7', title: 'Sleep Your Way to a Better Health', description: '', image: require('../../assets/SleepCourse.jpg'), type: 'Restful Sleep', days: '0.5 mil', time: 'Watch At your Own Pace',
    sections: [
      {
        section: 'Sleep Mastery Course',
        lessons: [
          { id: '1', title: 'Start here', videoUrl: '' },
        
        ],
      },
      {
        
    section: 'Module 1 - Lectures',
    lessons: [
      { id: '5', title: 'Lesson 1 - The Effect of Light on Circadian Rhythms and Sleep', videoUrl: '' },
      { id: '6', title: 'Lesson 2 - The Effect of Sound on Circadian Rhythms and Sleep', videoUrl: '' },
      { id: '7', title: 'Lesson 3 - Nose Breathing: Solution to Sleep Apnea and Snoring', videoUrl: '' },
      { id: '8', title: 'Lesson 4 - Intuitive Breathing Techniques for Effortless Sleep', videoUrl: '' },
    ],
    resources:[
      {
        id:'sdsdwf',
        title:'Lecture 1 : The Effect of Light on Circadian Rhythms and Sleep',
        url:'https://d1yei2z3i6k35z.cloudfront.net/3208501/63f9994b0ecec_Lecture1Goals.pdf'
      },
      {
        id:'sdsdwfe',
        title:'Lecture 2 : The Effect of Sounds on Circadian Rhythms and Sleep',
        url:'https://d1yei2z3i6k35z.cloudfront.net/3208501/63f99a6b94328_Lecture2Goals.pdf'
      },
      {
        id:'sdsdwfeqqq',
        title:'Lecture 3 : Nose Breathing: Solution to Sleep Apnea and Snoring',
        url:'https://d1yei2z3i6k35z.cloudfront.net/3208501/63f99038e0726_Lecture3Goals.pdf'
      },
      {
        id:'sdsdwfeqs',
        title:'Lecture 4 : Intuitive Breathing Techniques for Effortless Sleep!',
        url:'https://d1yei2z3i6k35z.cloudfront.net/3208501/63f99b7b54417_Lecture4Goals.pdf'
      },
      
    ]
  },
  {
    section: 'Module 2 - Lectures',
    lessons: [
      { id: '9', title: 'Lesson 5 - A Journey Through Sleep Stages', videoUrl: '' },
      { id: '10', title: 'Lesson 6 - Transform your Sleep with Humming Bee Breath', videoUrl: '' },
      { id: '11', title: 'Lesson 7 - Maximize Digestion for Cellular Renewal and Better Sleep', videoUrl: '' },
      { id: '12', title: 'Lesson 8 - Elevate Your Bedtime Routine for Effortless Sleep', videoUrl: '' },
    ],
    resources:[
      {
        id:'sdsdwfcc',
        title:'Lecture 5 : A Journey into the Sleep Cycles!',
        url:''
      },
      {
        id:'sdsdwfesds',
        title:'Lecture 6 : Transform your sleep with humming bee breath!',
        url:''
      },
      {
        id:'sdsdwfeqqqsss',
        title:'Lecture 7 : Maximize Digestion for Cellular Renewal and Better Sleep!',
        url:''
      },
      {
        id:'sdsdwfeqs',
        title:'Lecture 8 : Elevate your bedtime routine for effortless sleep!',
        url:''
      },
      
    ]
  },
      {
        section: 'Module 3 - Practice',
        lessons: [
          { id: '9', title: 'Morning Wake Up Meditation', videoUrl: '' },
          { id: '10', title: 'Trataka: Candle Gazing Meditation', videoUrl: '' },
          { id: '11', title: 'Yoga Nidra 1: Sleep Meditation Before Bed', videoUrl: '' },
          { id: '12', title: 'Yoga Nidra 2: Sleep Meditation Before Bed', videoUrl: '' },
          { id: '13', title: 'Black Screen Sleep Music with Healing Solfeggio Frequencies', videoUrl: '' },
          { id: '14', title: 'Yoga Before Bed: Sleep-Promoting Yoga Poses', videoUrl: '' },
        ],
      },
      {
        section: 'Bonus Tools: Healing Sanskrit Mantras',
        lessons: [
          { id: '15', title: 'Om Gan Ganpataye Namo Namah', isFromYoutube:true,videoUrl: 'https://www.youtube.com/watch?v=x0frWyAiEts' },
          { id: '16', title: 'Shiva Shiva Mantra',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=OiSPGCVBIYY' },
          { id: '17', title: 'Experience the Healing Power of OM Mani Padme Hum',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=mv3nV_M93ww' },
          { id: '18', title: 'Shanti Mantra for Global Peace', isFromYoutube:true,videoUrl: 'https://www.youtube.com/watch?v=BNd7geB-aD4' },
          { id: '19', title: 'Namami Shamishan',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=BNd7geB-aD4' },
        ],
      },
      {
        section: 'Bonus Tools: More',
        lessons: [
          { id: '20', title: 'Humming Bee', isFromYoutube:true,videoUrl: 'https://www.youtube.com/embed/mv3nV_M93ww?si=6ODG3aAsvhDWn-Jr' },
          { id: '21', title: '4-7-8 Breathing',isFromYoutube:true, videoUrl: 'https://www.youtube.com/embed/BNd7geB-aD4?si=1SrjqK2r-SpCv-wF' },
          { id: '22', title: 'Square Breathing', isFromYoutube:true,videoUrl: 'https://youtu.be/XyNTZ_-UuJw' },
          { id: '23', title: 'Alternate Nostril Breathing', isFromYoutube:true,videoUrl: 'https://youtu.be/RqYdgkGjlvk' },
        ],
      }
       
        ],
      author:{
        name: 'Abhi Duggal, your breathwork coach.',
        bio: 'Abhi Duggal, a renowned holistic health expert and certified yoga and meditation teacher, is the founder of popular YouTube channels. Meditate with Abhi and The School of Breath. With over 25 years of experience, Abhi blends ancient yogic wisdom with modern neuroscience to offer transformative practices in yoga, pranayama breathing, meditation, and sleep mastery, reaching a wide audience with his trusted and insightful teachings.',
        profileImage: require('../../assets/courses/Abhi.jpg'), // replace with actual path to the profile image
      },
      reviews:[
        {
          id: '1',
          reviewer: 'Phillip Mouton',
          rating: 4,
          text: 'The Knowledge , clarity and more energy ... the instructions was clear and easy to follow.',
        },
        {
          id: '2',
          reviewer: 'Sabina',
          rating: 5,
          text: 'My self awareness has improved, I can meditate better because of improved concentration on my breath',
        },
      
        {
          id: '3',
          reviewer: 'Samo',
          rating: 5,
          text: 'First thing I notice (I am in the 4th day of 3rd lecture) that I sleep like a baby. No waking up few times during the night.',
        },
        {
          id: '4',
          reviewer: 'Elise W',
          rating: 5,
          text: 'First thing I notice (I am in the 4th day of 3rd lecture) that I sleep like a baby. No waking up few times during the night.',
        },
    ],
      courseTheme:'restfulSleep'
}