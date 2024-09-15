import { Course } from "../../models/courses";

export const MEDITATION_COURSE:Course = { id: '5', title: '9-Day Meditation Challenge', description: 'NEW', image: require('../../assets/MeditationBack8.jpg'), type: 'Meditation', days: '0.5 mil', time: 'Watch At your Own Pace',
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
      author:{
        name: 'Abhi Duggal, your breathwork coach.',
        bio: 'Abhi Duggal, a renowned holistic health expert and certified yoga and meditation teacher, is the founder of popular YouTube channels. Meditate with Abhi and The School of Breath. With over 25 years of experience, Abhi blends ancient yogic wisdom with modern. neuroscience to offer transformative practices in yoga, pranayama breathing, meditation, and sleep mastery, reaching a wide audience with his trusted and insightful teachings.',
        profileImage: require('../../assets/Abhi.jpg'), // replace with actual path to the profile image 
      },
      sections:[
       
        {
          section: 'Day 1 - Awareness',
          lessons: [
            { id: '3', title: 'Learn How to Build Awareness', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Meditation/Day1/output.m3u8' },
            { id: '22232', title: 'Meditation Journal-Download', type:'file',videoUrl: '' , file:'https://d1yei2z3i6k35z.cloudfront.net/3208501/6667c8c309ee8_MeditationJournalFinal.pdf'},
          ]
        },
        {
          section: 'Day 2 - Overcoming Repetitive Thoughts',
          lessons: [
            { id: '4', title: 'Learn How to Overcome Repetitive Thoughts', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Meditation/Day2/output.m3u8' },
          ],
        },
        {
          section: 'Day 3 - Overcoming Repetitive Thoughts',
          lessons: [
            { id: '5', title: 'Breathwork & Meditation - Overcome Repetitive Thoughts', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Meditation/Day3/output.m3u8' },
          ],
        },
        {
          section: 'Day 4 - Observing Feelings and Emotions',
          lessons: [
            { id: '6', title: 'Learn to Observe Feelings and Emotions', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Meditation/Day4/output.m3u8' },
          ],
        },
        {
          section: 'Day 5 - Observing Feelings and Emotions',
          lessons: [
            { id: '7', title: 'Breathwork & Meditation to Observe Feelings and Emotions', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Meditation/Day5/output.m3u8' },
          ],
        },
        {
          section: 'Day 6 - Inner Silence and Letting Go',
          lessons: [
            { id: '8', title: 'Cultivating Inner Silence and Letting Go', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Meditation/Day6/output.m3u8' },
          ],
        },
        {
          section: 'Day 7 - Inner Silence and Letting Go',
          lessons: [
            { id: '9', title: 'Breathwork & Meditation to Cultivate Inner Silence and Let Go', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Meditation/Day7/output.m3u8' },
          ],
        },
        {
          section: 'Day 8 - Letting Go of Possession and Control',
          lessons: [
            { id: '10', title: 'Breathwork & Meditation - Letting go of Feelings of Possession and Control', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Meditation/Day8/output.m3u8' },
          ],
        },
        {
          section: 'Bonus Tools: Healing Sanskrit Mantras',
          lessons: [
            { id: '11', title: 'Om Gan Ganpataye Namo Namah',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=x0frWyAiEts' },
            { id: '12', title: 'Shiva Shiva Mantra',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=OiSPGCVBIYY' },
            { id: '13', title: 'Experience the Healing Power of OM Mani Padme Hum',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=mv3nV_M93ww' },
            { id: '14', title: 'Shanti Mantra for Global Peace', isFromYoutube:true,videoUrl: 'https://www.youtube.com/watch?v=BNd7geB-aD4' },
            { id: '15', title: 'Namami Shamishan',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=BNd7geB-aD4' },
          ],
        },
        {
          section: 'Bonus Tools: More',
          lessons: [
            { id: '16', title: 'Frequently Asked Questions about Meditation', isFromYoutube:true,videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-Day-Meditation/Bonus/output.m3u8' },
            { id: '17', title: 'Humming Bee',isFromYoutube:true, videoUrl: 'https://www.youtube.com/embed/mv3nV_M93ww?si=6ODG3aAsvhDWn-Jr' },
            { id: '18', title: '4-7-8 Breathing', isFromYoutube:true,videoUrl: 'https://www.youtube.com/embed/BNd7geB-aD4?si=1SrjqK2r-SpCv-wF' },
            { id: '19', title: 'Square Breathing',isFromYoutube:true, videoUrl: 'https://youtu.be/XyNTZ_-UuJw' },
            { id: '20', title: 'Alternate Nostril Breathing',isFromYoutube:true, videoUrl: 'https://youtu.be/RqYdgkGjlvk' },
          ],
        }
      ],
      courseTheme:'meditation'
      
}