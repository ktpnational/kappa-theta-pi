import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { app } from '@/constants';

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
 * The email includes the enquirer's details, their message, and is styled using Tailwind CSS.
 * Built using react-email components for consistent rendering across email clients.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the person who submitted the enquiry
 * @param {string} props.email - The email address of the enquirer
 * @param {string} props.message - The content of the enquiry message
 *
 * @example
 * ```tsx
 * <NewEnquiryEmail
 *   name="John Doe"
 *   email="john@example.com"
 *   message="I'm interested in your services"
 * />
 * ```
 *
 * @returns {JSX.Element} A fully formatted email template for new enquiry notifications
 *
 * @structure
 * - HTML container with language set to English
 * - Email preview text showing app name and enquirer's email
 * - Tailwind-styled body containing:
 *   - Exciting times heading
 *   - Horizontal rule separator
 *   - Enquiry details section with sender's information
 *   - Message content section
 *   - Empty section for potential future content/footer
 */
export function NewEnquiryEmail({ name, email, message }: NewEnquiryEmailProps): JSX.Element {
  const previewText = `${app.name} new enquiry from ${email}!`;
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
              <Heading>Exciting times!</Heading>
              <Hr className="my-2" />
              <Heading>New enquiry from {email}</Heading>
              <Text>
                {name} has sent you a message from your website. Their email is{' '}
                <span className="font-bold">{email}</span> and this is what they said:
              </Text>
            </Section>
            <Section>
              <Text>{message}</Text>
            </Section>
            <Section></Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
