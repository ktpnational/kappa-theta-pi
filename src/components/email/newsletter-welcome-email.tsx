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
  Tailwind,
  Text,
} from '@react-email/components';

/**
 * Email template component for welcoming new newsletter subscribers
 *
 * @component
 * @description
 * Renders a responsive welcome email template sent to new newsletter subscribers.
 * The email features a warm welcome message, sets expectations about newsletter frequency,
 * and provides contact information. Built using react-email components with Tailwind CSS styling.
 *
 * @returns {JSX.Element} A fully formatted welcome email template
 *
 * @structure
 * - HTML container
 * - Email preview text for email clients
 * - Tailwind-styled body containing:
 *   - Brand header with logo text
 *   - Welcome message section
 *   - Newsletter frequency information
 *   - Contact information footer
 *   - Copyright notice
 *
 * @styling
 * - Uses a light zinc background color
 * - Responsive container with max-width
 * - Consistent text styling and spacing
 * - Branded color scheme
 *
 * @example
 * ```tsx
 * <NewsletterWelcomeEmail />
 * ```
 *
 * @environment
 * Requires the following environment variables:
 * - RESEND_EMAIL_FROM: Email address used for contact information
 *
 * @accessibility
 * - Uses semantic HTML elements
 * - Maintains proper heading hierarchy
 * - Includes alt text equivalents where needed
 */
export function NewsletterWelcomeEmail(): JSX.Element {
  /** Preview text shown in email clients */
  const previewText = 'Hello and welcome to SaaSy Land!';

  return (
    <Html>
      <Head>
        <title>SaaSy Land Newsletter</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
            <Section className="mt-4">
              <Heading className="text-center text-2xl font-semibold text-zinc-950">
                SaaSy Land
              </Heading>
              <Hr className="my-4" />
              <Heading className="text-center text-3xl font-semibold text-zinc-800">
                Welcome to SaaSy Land!
              </Heading>
              <Text className="mb-0 mt-6 text-center text-base">
                {`We're`} so glad {`you're`} here. {`We're`} excited to share our passion for online
                startups with you.
              </Text>
              <Text className="m-0 text-center text-base">
                {`We'll`} be sending you a newsletter every month.
              </Text>
            </Section>

            <Section className="mt-4 text-center text-zinc-400">
              <Text className="my-4">
                {`We're`} looking forward to seeing you around! If you have any questions, please{' '}
                {`don't`} hesitate to reach out to us at{' '}
                <Link
                  href={`mailto:${process.env.RESEND_EMAIL_FROM}`}
                  className="text-blue-500 underline"
                >
                  {process.env.RESEND_EMAIL_FROM}
                </Link>
              </Text>
              <Text className="mb-0 mt-4">@ SaaSyLand.com {new Date().getFullYear()}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
