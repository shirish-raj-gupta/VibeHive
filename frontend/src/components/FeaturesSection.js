export default function FeaturesSection() {
  const features = [
    'Create & host events easily',
    'Manage attendees and RSVPs',
    'Search and explore public events',
    'Send updates and notifications',
  ];

  const notIncluded = [
    'Ticket sales (coming soon)',
    'Built-in video conferencing',
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">Features</h2>
        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div className="p-6 bg-green-50 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-green-800">What it has</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 bg-red-50 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-red-800">What it doesn't have</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {notIncluded.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
