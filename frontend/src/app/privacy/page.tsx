import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                This Privacy Policy describes how we collect, use, and protect your information when you use our RAG (Retrieval-Augmented Generation) application. We are committed to protecting your privacy and ensuring compliance with applicable data protection laws, including the General Data Protection Regulation (GDPR).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Do NOT Collect</h2>
              <p className="text-gray-700 mb-4">
                We want to be clear about what we do not collect or store:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Personal email addresses</li>
                <li>Names or personal identifiers</li>
                <li>IP addresses</li>
                <li>Physical addresses</li>
                <li>Phone numbers</li>
                <li>Original uploaded files</li>
                <li>Any personally identifiable information (PII)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information We Process</h2>
              <p className="text-gray-700 mb-4">
                We only process the following information to provide our service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Authentication tokens:</strong> Provided by Auth0 for secure login</li>
                <li><strong>Extracted text content:</strong> Clean, processed text from uploaded documents</li>
                <li><strong>Vector embeddings:</strong> Mathematical representations of text for AI processing</li>
                <li><strong>Conversation data:</strong> Chat messages for chatbot functionality</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Important:</strong> We do not store your original files. Only the extracted, cleaned text content is processed and stored to enable the chatbot functionality.
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
                <strong>OpenAI Data Processing:</strong> Our chatbot functionality requires sending data to OpenAI's servers:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Your chat questions and relevant document content are sent to OpenAI</li>
                <li>OpenAI processes this data to generate AI responses</li>
                <li>OpenAI may use this data for service improvement (as per their privacy policy)</li>
                <li>We do not control OpenAI's data retention or usage practices</li>
                <li>OpenAI's servers may be located outside your country of residence</li>
              </ul>
              <p className="text-gray-700 mb-4">
                These services have their own privacy policies and data handling practices. We recommend reviewing their privacy policies for complete information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Retention and Deletion</h2>
              <p className="text-gray-700 mb-4">
                <strong>Data Retention:</strong> Extracted text and conversation data may be retained for as long as necessary to provide our service.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Data Deletion:</strong> You have the right to request deletion of your data at any time. Extracted text may be deleted without notice to maintain service quality and performance.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Right to Erasure:</strong> Under GDPR Article 17, you have the right to request the deletion of your personal data. We will process such requests within 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights Under GDPR</h2>
              <p className="text-gray-700 mb-4">
                As a user, you have the following rights:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Right to Access:</strong> Request information about what data we process</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
                <li><strong>Right to Data Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Right to Object:</strong> Object to processing of your data</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication through Auth0</li>
                <li>Regular security assessments</li>
                <li>Access controls and monitoring</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Processing Legal Basis</h2>
              <p className="text-gray-700 mb-4">
                We process your data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Contract:</strong> Processing necessary to provide our service</li>
                <li><strong>Legitimate Interest:</strong> Improving service quality and functionality</li>
                <li><strong>Consent:</strong> Where explicitly provided for specific purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your data may be processed in countries outside the European Economic Area (EEA). We ensure appropriate safeguards are in place for such transfers, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Adequacy decisions by the European Commission</li>
                <li>Standard contractual clauses</li>
                <li>Other appropriate safeguards</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For any questions about this Privacy Policy or to exercise your rights, please contact us:
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Data Protection Officer:</strong><br />
                Email: sergiuc.stefan@gmail.com<br />
                Response time: Within 30 days
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify users of any material changes through our application or by other means.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                This Privacy Policy is compliant with GDPR requirements and provides transparency about our data handling practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 