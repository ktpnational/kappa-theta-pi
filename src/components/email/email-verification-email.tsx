import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { app } from '@/constants'

/**
 * Props interface for the EmailVerificationEmail component
 * @interface EmailVerificationEmailProps
 * @property {string} email - The email address to be verified
 * @property {string} emailVerificationToken - The token used to verify the email address
 */
interface EmailVerificationEmailProps {
  email: string;
  emailVerificationToken: string;
}

/**
 * Email template component for email address verification
 *
 * @component
 * @description
 * Renders a responsive email template used for verifying user email addresses during signup.
 * The email includes a personalized greeting, verification instructions, and a call-to-action button.
 * Built using react-email components with Tailwind CSS styling.
 *
 * @param {Object} props - Component props
 * @param {string} props.email - The user's email address that needs verification
 * @param {string} props.emailVerificationToken - Unique token for email verification
 *
 * @example
 * ```tsx
 * <EmailVerificationEmail
 *   email="user@example.com"
 *   emailVerificationToken="abc123"
 * />
 * ```
 *
 * @returns {JSX.Element} A fully formatted email verification email template
 *
 * @structure
 * - HTML container with language set to English
 * - Email preview text for email clients
 * - Tailwind-styled body containing:
 *   - Greeting section
 *   - Verification instructions
 *   - CTA button with verification link
 *   - Disclaimer for unintended recipients
 *   - Friendly closing message
 */
export function EmailVerificationEmail({
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>): JSX.Element {
  const previewText = `${app.name} email verification.`;
  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Text className="text-xl">Hi,</Text>
              <Text className="text-base">
                Your email address, {email}, was recently used to sign up at{' '}
                <span className="font-semibold tracking-wide">{app.name}</span>.
              </Text>
              <Text className="text-base">
                Please verify this address by clicking the button below
              </Text>
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}/signup/verify-email?token=${emailVerificationToken}`}
              >
                Verify email now
              </Button>
            </Section>

            <Section>
              <Text className="text-xs">
                If you didn&apos;t sign up at {app.name}, just ignore and delete this
                message.
              </Text>
              <Text className="text-base font-medium">
                Enjoy <span className="font-semibold tracking-wide">{app.name}</span> and
                have a nice day!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
