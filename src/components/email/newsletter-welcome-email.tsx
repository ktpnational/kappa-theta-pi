/**
 * @module NewsletterWelcomeEmail
 * @description A React Email component that generates a welcome email template for SaaSy Land newsletter subscribers
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { CSSProperties } from 'react';

/**
 * Email template component for welcoming new newsletter subscribers
 *
 * @component
 * @description
 * Renders a responsive welcome email template sent to new newsletter subscribers.
 * The email features a warm welcome message, sets expectations about newsletter frequency,
 * and provides contact information. Built using react-email components with inline styles.
 *
 * @returns {JSX.Element} A fully formatted welcome email template
 */
export function NewsletterWelcomeEmail(): JSX.Element {
  /** Preview text shown in email clients */
  const previewText = 'Hello and welcome to SaaSy Land!';

  // Define your styles here with explicit typing
  const styles: { [key: string]: CSSProperties } = {
    body: {
      margin: '0 auto',
      backgroundColor: '#f8fafc', // zinc-50
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      margin: '40px auto',
      maxWidth: '600px',
      borderRadius: '8px',
      padding: '16px',
    },
    heading: {
      textAlign: 'center' as 'center', // Explicitly type the value
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937', // zinc-950
    },
    subHeading: {
      textAlign: 'center' as 'center', // Explicitly type the value
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#374151', // zinc-800
    },
    text: {
      margin: '24px 0 0',
      textAlign: 'center' as 'center', // Explicitly type the value
      fontSize: '16px',
    },
    link: {
      color: '#3b82f6', // blue-500
      textDecoration: 'underline',
    },
    footerText: {
      margin: '16px 0 0',
      textAlign: 'center' as 'center', // Explicitly type the value
      color: '#9ca3af', // zinc-400
    },
  };

  return (
    <Html>
      <Head>
        <title>SaaSy Land Newsletter</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Heading style={styles.heading}>Kappa Theta Pi</Heading>
            <Hr style={{ margin: '16px 0' }} />
            <Heading style={styles.subHeading}>Welcome to Kappa Theta Pi!</Heading>
            <Text style={styles.text}>
              {`We're`} so glad {`you're`} here. {`We're`} excited to share our passion for online
              startups with you.
            </Text>
            <Text style={styles.text}>
              {`We'll`} be sending you a newsletter every month.
            </Text>
          </Section>

          <Section style={styles.footerText}>
            <Text>
              {`We're`} looking forward to seeing you around! If you have any questions, please{' '}
              {`don't`} hesitate to reach out to us at{' '}
              <Link href={`mailto:${process.env.RESEND_EMAIL_FROM}`} style={styles.link}>
                {process.env.RESEND_EMAIL_FROM}
              </Link>
            </Text>
            <Text style={{ margin: '16px 0 0' }}>
              @ kappathetapi.org {new Date().getFullYear()}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
