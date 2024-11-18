import { app } from '@/constants';
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { CSSProperties } from 'react';

interface EmailVerificationEmailProps {
  email: string;
  emailVerificationToken: string;
}

// Define styles as a regular object with explicit CSSProperties type
const styles: Record<string, CSSProperties> = {
  body: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#ffffff',
    margin: '0 auto',
  },
  container: {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '580px',
  },
  section: {
    padding: '24px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '24px',
  },
  text: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#333333',
    marginBottom: '16px',
  },
  brandText: {
    fontWeight: '600',
    letterSpacing: '0.025em',
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center',
    padding: '12px 24px',
    display: 'inline-block',
    marginTop: '16px',
    marginBottom: '16px',
  },
  disclaimer: {
    fontSize: '12px',
    color: '#666666',
    marginTop: '24px',
  },
};

export function EmailVerificationEmail({
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>): JSX.Element {
  const previewText = `${app.name} email verification.`;
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/signup/verify-email?token=${emailVerificationToken}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.section}>
            <Text style={styles.text}>Hi,</Text>
            <Text style={styles.text}>
              Your email address, {email}, was recently used to sign up at{' '}
              <span style={styles.brandText}>{app.name}</span>.
            </Text>
            <Text style={styles.text}>
              Please verify this address by clicking the button below:
            </Text>
            <Button href={verificationUrl} style={styles.button}>
              Verify email now
            </Button>
          </Section>

          <Section style={styles.section}>
            <Text style={styles.disclaimer}>
              If you didn&apos;t sign up at {app.name}, just ignore and delete this message.
            </Text>
            <Text style={{ ...styles.text, ...styles.brandText }}>
              Enjoy {app.name} and have a nice day!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
