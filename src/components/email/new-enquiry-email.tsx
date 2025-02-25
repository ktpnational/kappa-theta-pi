import { app } from '@/constants';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

/**
 * Props interface for the NewEnquiryEmail component
 * @interface NewEnquiryEmailProps
 * @property {string} name - The name of the person submitting the enquiry
 * @property {string} email - The email address of the enquirer
 * @property {string} message - The enquiry message content
 */
interface NewEnquiryEmailProps {
  name: string;
  email: string;
  message: string;
}

/**
 * Email template component for new enquiry notifications
 *
 * @component
 * @description
 * Renders a responsive email template used for notifying recipients about new enquiries submitted through the website.
 * The email includes the enquirer's details, their message, and is styled using inline styles.
 * Built using react-email components for consistent rendering across email clients.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the person who submitted the enquiry
 * @param {string} props.email - The email address of the enquirer
 * @param {string} props.message - The content of the enquiry message
 *
 * @returns {React.JSX.Element} A fully formatted email template for new enquiry notifications
 */
export function NewEnquiryEmail({ name, email, message }: NewEnquiryEmailProps): React.JSX.Element {
  const previewText = `${app.name} new enquiry from ${email}!`;

  // Define your styles here
  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      margin: '0 auto',
      padding: '20px',
    },
    container: {
      maxWidth: '600px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    hr: {
      margin: '10px 0',
    },
    text: {
      fontSize: '16px',
      lineHeight: '1.5',
    },
    boldText: {
      fontWeight: 'bold',
    },
  };

  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Heading style={styles.heading}>Exciting times!</Heading>
            <Hr style={styles.hr} />
            <Heading style={styles.heading}>New enquiry from {email}</Heading>
            <Text style={styles.text}>
              {name} has sent you a message from your website. Their email is{' '}
              <span style={styles.boldText}>{email}</span> and this is what they said:
            </Text>
          </Section>
          <Section>
            <Text style={styles.text}>{message}</Text>
          </Section>
          <Section />
        </Container>
      </Body>
    </Html>
  );
}
