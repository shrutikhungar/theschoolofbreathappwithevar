export const BLISS_COURSE = { 
    id: '1', title: '9-Day Breathwork for Unconditional Bliss', description: 'COMING IN AUGUST', image: require('../../assets/BlissCourseImage.gif'), type: 'Breathwork', days: '0.5 mil', time: 'Watch At your Own Pace' ,
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
        bio: 'Abhi Duggal, a renowned holistic health expert and certified yoga and meditation teacher, is the founder of popular YouTube channels. Meditate with Abhi and The School of Breath. With over 25 years of experience, Abhi blends ancient yogic wisdom with modern neuroscience to offer transformative practices in yoga, pranayama breathing, meditation, and sleep mastery, reaching a wide audience with his trusted and insightful teachings.',
        profileImage: require('../../assets/Abhi.jpg'), // Replace with the actual path to the profile image
      },
      sections:[
        {
          section: 'Day 1 - Identify Your Emotional Pattern',
          lessons: [
            { id: '1', title: 'Introduction to Emotional Patterns', videoUrl: 'https://storage.googleapis.com/schoolbreathvideos/9-DayBlissCourse/Day1/output.m3u8' },
            { id: '22232', title: 'Bliss Course Journal-Download', type:'file',videoUrl: '' , file:'https://storage.googleapis.com/schoolbreathvideos/sample.pdf'},
          ],
        },
        {
          section: 'Bonus Tools: Healing Sanskrit Mantras',
          lessons: [
            { id: '18', title: 'Om Gan Ganpataye Namo Namah', isFromYoutube:true,videoUrl: 'https://www.youtube.com/watch?v=x0frWyAiEts' },
            { id: '19', title: 'Shiva Shiva Mantra', isFromYoutube:true,videoUrl: 'https://www.youtube.com/watch?v=OiSPGCVBIYY' },
            { id: '20', title: 'Experience the Healing Power of OM Mani Padme Hum',isFromYoutube:true, videoUrl: 'https://www.youtube.com/watch?v=mv3nV_M93ww' },
            { id: '21', title: 'Shanti Mantra for Global Peace', isFromYoutube:true,videoUrl: 'https://www.youtube.com/watch?v=BNd7geB-aD4' },
            { id: '22', title: 'Namami Shamishan', isFromYoutube:true,videoUrl: 'https://www.youtube.com/watch?v=BNd7geB-aD4' },
          ],
        },
        {
          section: 'Bonus Tools: More',
          lessons: [
            { id: '23', title: 'Humming Bee', isFromYoutube:true,videoUrl: 'https://www.youtube.com/embed/mv3nV_M93ww?si=6ODG3aAsvhDWn-Jr' },
            { id: '24', title: '4-7-8 Breathing',isFromYoutube:true, videoUrl: 'https://www.youtube.com/embed/BNd7geB-aD4?si=1SrjqK2r-SpCv-wF' },
            { id: '25', title: 'Square Breathing', isFromYoutube:true,videoUrl: 'https://youtu.be/XyNTZ_-UuJw' },
            { id: '26', title: 'Alternate Nostril Breathing', isFromYoutube:true,videoUrl: 'https://youtu.be/RqYdgkGjlvk' },
          ],
        }
        
       
      ],
      courseTheme:'blissCourse'

}