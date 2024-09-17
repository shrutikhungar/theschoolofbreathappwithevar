//breathWork.ts
import { Course } from "../../models/courses";

export const BREATH_WORK_COURSE:Course = {
 id: '4', title: '9-Day Breathwork Challenge for Energy, Health & Vitality', description: '', image: require('../../assets/Breathwork.jpg'), type: 'Breathwork', days: '0.5 mil', time: 'Watch At your Own Pace' ,
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
    sections:[
        {
          section: 'Day 1 - Energy',
          lessons: [
            { id: '1', title: 'Learn - Kapalbhati and Bhramari Pranayama', videoUrl: '' },
            { id: '2', title: 'Practice - Ignite Your Energy', videoUrl: '' },
            { id: '22232', title: 'Breathwork Journal-Download', type:'file',videoUrl: '' , file:''},
          ],
        },
        {
          section: 'Day 2 - Stamina',
          lessons: [
            { id: '3', title: 'Learn - Kumbhaka Pranayama (Breath Retention)', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Breathwork/Day2Video1/output.m3u8' },
            { id: '4', title: 'Practice - Build Your Stamina', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Breathwork/Day2Video2/output.m3u8' },
          ],
        },
        {
          section: 'Day 3 - Strength',
          lessons: [
            { id: '5', title: 'Learn - Bandhas (Energy Locks)', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Breathwork/Day3Video1/output.m3u8' },
            { id: '6', title: 'Practice - Gain Inner Strength', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Breathwork/Day3Video2/output.m3u8' },
          ],
        },
        {
          section: 'Day 4 - Vitality',
          lessons: [
            { id: '7', title: 'Learn - Bhastrika Pranayama (Bellows Breath)', videoUrl: '' },
            { id: '8', title: 'Practice - Boost Your Vitality', videoUrl: '' },
          ],
        },
        {
          section: 'Day 5 - Resilience',
          lessons: [
            { id: '9', title: 'Learn - Tummo Breathing Technique', videoUrl: '' },
            { id: '10', title: 'Practice - Cultivate Resilience', videoUrl: '' },
          ],
        },
        {
          section: 'Day 6 - Clarity',
          lessons: [
            { id: '11', title: 'Learn - Alternate Nostril Breathing', videoUrl: '' },
            { id: '12', title: 'Practice - Achieve Mental Clarity', videoUrl: '' },
          ],
        },
        {
          section: 'Day 7 - Detox',
          lessons: [
            { id: '13', title: 'Learn - Agnisara Kriya (Fire Energy)', videoUrl: '' },
            { id: '14', title: 'Practice - Deep Detox Breathwork', videoUrl: '' },
          ],
        },
        {
          section: 'Day 8 - Bliss',
          lessons: [
            { id: '15', title: 'Learn - Suprashant Pranayama', videoUrl: '' },
            { id: '16', title: 'Practice - Experience Bliss', videoUrl: '' },
          ],
        },
        {
          section: 'Day 9 - Restore',
          lessons: [
            { id: '17', title: 'Learn - Yoga Nidra (Psychic Sleep)', videoUrl: '' },
            { id: '18', title: 'Practice - Complete Restoration', videoUrl: '' },
          ],
        },
        {
          section: 'Bonus Tools: Healing Sanskrit Mantras',
          lessons: [
            { id: '18', title: 'Om Gan Ganpataye Namo Namah',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=x0frWyAiEts' },
            { id: '19', title: 'Shiva Shiva Mantra', isFromYoutube:true,videoUrl: 'https://www.youtube.com/watch?v=OiSPGCVBIYY' },
            { id: '20', title: 'Experience the Healing Power of OM Mani Padme Hum',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=mv3nV_M93ww' },
            { id: '21', title: 'Shanti Mantra for Global Peace',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=BNd7geB-aD4' },
            { id: '22', title: 'Namami Shamishan', isFromYoutube:true,videoUrl: 'https://www.youtube.com/watch?v=BNd7geB-aD4' },
          ],
        },
        {
          section: 'Bonus Tools: More',
          lessons: [
            { id: '19', title: 'Tummo Breathing - Advanced Tibetan Practice', isFromYoutube:true,videoUrl: '' },
            { id: '23', title: 'Humming Bee', isFromYoutube:true,videoUrl: 'https://www.youtube.com/embed/mv3nV_M93ww?si=6ODG3aAsvhDWn-Jr' },
            { id: '24', title: '4-7-8 Breathing', isFromYoutube:true,videoUrl: 'https://www.youtube.com/embed/BNd7geB-aD4?si=1SrjqK2r-SpCv-wF' },
            { id: '25', title: 'Square Breathing',isFromYoutube:true, videoUrl: 'https://youtu.be/XyNTZ_-UuJw' },
            { id: '26', title: 'Alternate Nostril Breathing',isFromYoutube:true, videoUrl: 'https://youtu.be/RqYdgkGjlvk' },
          ],
        }
      ],
      courseTheme:'breathwork'
  
}