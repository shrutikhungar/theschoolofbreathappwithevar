import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';

export default function PrivacyPolicy() {
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  return (
    <ImageBackground 
      source={isTablet ? require('../assets/profileImageBackIpad.jpg') : require('../assets/profileImageBack.png')} 
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Adding an opaque background to the text container */}
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Privacy Policy</Text>
          <Text style={styles.text}>
            At Meditate with Abhi, your privacy is important to us. This privacy policy explains what personal data we collect and how we use it.
          </Text>

          <Text style={styles.subheading}>Definitions</Text>
          <Text style={styles.text}>
            For the purposes of this Privacy Policy, the following definitions apply:
            {'\n'}- **Account**: A unique account created for You to access our Service.
            {'\n'}- **Company**: Refers to PossibilityAI Inc, 6244 Lansdowne Circle Boynton Beach, FL 33472 USA.
            {'\n'}- **Personal Data**: Any information that relates to an identified or identifiable individual.
          </Text>

          <Text style={styles.subheading}>Collecting and Using Your Personal Data</Text>
          <Text style={styles.text}>
            We may collect your name, email, and other contact details for the purpose of providing our services, contacting you, and improving your experience.
          </Text>

          <Text style={styles.subheading}>How We Use Your Data</Text>
          <Text style={styles.text}>
            We use Personal Data to provide and maintain our Service, manage user accounts, provide customer support, and notify users of changes to our services.
          </Text>

          <Text style={styles.subheading}>Security of Your Data</Text>
          <Text style={styles.text}>
            We strive to use commercially acceptable means to protect your Personal Data. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
          </Text>

          <Text style={styles.subheading}>Children's Privacy</Text>
          <Text style={styles.text}>
            Our Service does not address anyone under the age of 13. We do not knowingly collect personal data from anyone under 13.
          </Text>

          <Text style={styles.subheading}>Links to Other Websites</Text>
          <Text style={styles.text}>
            Our Service may contain links to other websites that are not operated by Us. If You click on a third-party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
          </Text>
          <Text style={styles.text}>
            We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.
          </Text>

          <Text style={styles.subheading}>Changes to this Privacy Policy</Text>
          <Text style={styles.text}>
            We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
          </Text>
          <Text style={styles.text}>
            We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
          </Text>
          <Text style={styles.text}>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </Text>

          <Text style={styles.subheading}>Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about this Privacy Policy, You can contact us:
            {'\n'}By email: connect@meditatewithabhi.com
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '120%',
  },
  scrollView: {
    paddingVertical: 30, // Push text a bit further down
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // More transparent white background for better readability
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#72616d',
    marginTop: 130,
    marginBottom: 30,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#72616d',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 22,
  },
});
