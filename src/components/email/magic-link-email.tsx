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

import { app } from '@/constants';

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
  const previewText = `${app.name} magic link sign in.`;
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
              <Text>Hi,</Text>
              <Text>Someone just requested a Sign In magic link for {identifier}</Text>
              <Text>If this was you, you can sign in here:</Text>
              <Button href={url}>Sign in</Button>
            </Section>
            <Section>
              <Text>If you didn&apos;t try to login, you can safely ignore this email.</Text>
            </Section>
            <Section>
              <Text className="text-base font-medium">
                Enjoy <span className="font-semibold tracking-wide">{app.name}</span> and have a
                nice day!
              </Text>
            </Section>
            <Section>
              <Text className="text-xs">
                Hint: You can set a permanent password in Dashboard → Settings
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
