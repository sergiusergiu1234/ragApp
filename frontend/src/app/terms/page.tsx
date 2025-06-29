import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using this RAG (Retrieval-Augmented Generation) application, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Our service provides an AI-powered chatbot that can answer questions based on uploaded documents. The service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Processes uploaded documents to extract text content</li>
                <li>Creates vector embeddings for AI processing</li>
                <li>Provides conversational AI responses based on document content</li>
                <li>Stores only extracted text, not original files</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Important:</strong> Our chatbot uses OpenAI's external servers to generate responses. This means:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Your questions and document content are sent to OpenAI's servers for processing</li>
                <li>OpenAI may use this data to improve their services (as per their privacy policy)</li>
                <li>We do not control how OpenAI handles or stores your data</li>
                <li>OpenAI's servers are located in various countries worldwide</li>
                <li>Response generation is subject to OpenAI's service availability and policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                As a user of this service, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide accurate and complete information when using the service</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not share your account with others</li>
                <li>Use the service in compliance with applicable laws and regulations</li>
                <li>Not attempt to reverse engineer or hack the service</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Content and Data Responsibility</h2>
              <p className="text-gray-700 mb-4">
                <strong>Important Disclaimer:</strong> You are solely responsible for the content you upload and the information you share through our service.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>No Sensitive Information:</strong> Do not upload documents containing sensitive, confidential, or personally identifiable information</li>
                <li><strong>No Legal Documents:</strong> Do not upload legal documents, contracts, or other sensitive materials</li>
                <li><strong>No Medical Information:</strong> Do not upload medical records or health-related information</li>
                <li><strong>No Financial Data:</strong> Do not upload financial statements, tax documents, or banking information</li>
                <li><strong>No Personal Data:</strong> Do not upload documents containing personal information of others</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>We are not responsible for any sensitive information that may be processed through our service.</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Processing and Storage</h2>
              <p className="text-gray-700 mb-4">
                By using our service, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Original files are not stored - only extracted text content is processed</li>
                <li>Extracted text may be deleted at any time for service optimization</li>
                <li>Data is processed using third-party services (Auth0, Zilliz)</li>
                <li>We do not guarantee data retention or availability</li>
                <li>You should not rely on our service for data backup or storage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Service Availability and Limitations</h2>
              <p className="text-gray-700 mb-4">
                We strive to provide reliable service but cannot guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>100% uptime or availability</li>
                <li>Uninterrupted access to the service</li>
                <li>Error-free operation</li>
                <li>Compatibility with all devices or browsers</li>
                <li>Specific response times or performance levels</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                <strong>To the maximum extent permitted by law, we shall not be liable for:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Any direct, indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages resulting from the use or inability to use the service</li>
                <li>Any errors, omissions, or inaccuracies in AI-generated responses</li>
                <li>Security breaches or unauthorized access to your data</li>
                <li>Any actions taken based on AI-generated content</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding the claim.</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers</h2>
              <p className="text-gray-700 mb-4">
                <strong>The service is provided "as is" without warranties of any kind:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>We do not guarantee the accuracy of AI-generated responses</li>
                <li>We do not guarantee the completeness of processed documents</li>
                <li>We do not guarantee the security of uploaded content</li>
                <li>We do not guarantee compatibility with all file formats</li>
                <li>We do not guarantee the preservation of document formatting</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                <strong>You retain ownership of your content, but you grant us a license to:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Process and extract text from uploaded documents</li>
                <li>Create vector embeddings for AI processing</li>
                <li>Use the processed content to provide chatbot responses</li>
                <li>Store and manage the extracted content for service functionality</li>
              </ul>
              <p className="text-gray-700 mb-4">
                This license is non-exclusive, worldwide, and royalty-free.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</Link> for detailed information about how we handle your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your access to the service at any time, with or without cause, with or without notice. Upon termination:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Your right to use the service will cease immediately</li>
                <li>We may delete your data and account information</li>
                <li>You will not be entitled to any refunds</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms shall be governed by and construed in accordance with the laws of Romania, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material changes through our application or by other means. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> sergiuc.stefan@gmail.com<br />
                <strong>Response time:</strong> Within 30 days
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Auth0:</strong> For secure authentication and user management</li>
                <li><strong>Zilliz:</strong> For storing extracted text and vector embeddings</li>
                <li><strong>OpenAI:</strong> For AI chatbot response generation and processing</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>OpenAI Integration:</strong> Our chatbot functionality relies on OpenAI's API services. When you interact with the chatbot:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Your questions and relevant document content are transmitted to OpenAI's servers</li>
                <li>OpenAI processes this data to generate responses</li>
                <li>OpenAI may retain and use this data according to their privacy policy</li>
                <li>We have no control over OpenAI's data handling practices</li>
                <li>OpenAI's services are subject to their own terms of service and privacy policy</li>
              </ul>
              <p className="text-gray-700 mb-4">
                These services have their own privacy policies and data handling practices. We recommend reviewing their privacy policies for complete information.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                By using our service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 