import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'NextCart | Contact Us',
  description: 'Have questions? Get in touch with the NextCart team.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto p-6 max-w-lg">
      <ContactForm />
    </div>
  );
}
