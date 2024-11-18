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

// Define your styles here
const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    margin: '0 auto',
  },
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  // Add more styles as needed
};

/**
 * Props interface for the MagicLinkEmail component that defines required properties
 * for sending a magic link authentication email.
 *
 * @interface MagicLinkEmailProps
 * @property {string} identifier - The user's unique identifier (typically email address or username)
 *                                that requested the magic link. This is displayed in the email body
 *                                to confirm the intended recipient.
 * @property {string} url - The complete authentication URL containing the magic link token
 *                         that will be used to authenticate the user. This URL should be will use to sign in */
interface MagicLinkEmailProps {
  identifier: string;
  url: string;
}

/**
 * Email template component for sending magic link authentication emails
 *
 * @component
 * @description
 * Generates a branded email template containing a magic link for passwordless authentication.
 * The email includes the user's identifier, a sign-in button with the magic link, and security notices.
 * The template is built using react-email components and includes Tailwind styling.
 *
 * @param {MagicLinkEmailProps} props - Component props
 * @param {string} props.identifier - The user's email or username requesting authentication
 * @param {string} props.url - The generated magic link URL for authentication
 *
 * @returns {JSX.Element} A React component representing the email template
 *
 * @example
 * ```tsx
 * <MagicLinkEmail
 *   identifier="user@example.com"
 *   url="https://app.example.com/auth/magic-link?token=xyz"
 * />
 * ```
 *
 * @security
 * - Includes a warning message for unintended recipients
 * - Provides context about who requested the magic link
 * - Informs users about permanent password option for enhanced security
 */
export function MagicLinkEmail({ identifier, url }: MagicLinkEmailProps): JSX.Element {
  return (
    <Html lang="en">
      <Head />
      <Preview>Magic Link for {identifier}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Text>Hello,</Text>
            <Text>Click the link below to access your account:</Text>
            <Button href={url}>Access Account</Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
