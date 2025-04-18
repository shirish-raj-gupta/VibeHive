export default function CTASection() {
  return (
    <section className="py-20 text-center px-4 bg-gradient-to-r from-cyan-700 to-teal-600 text-white">
      <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
      <p className="text-lg mb-6">Create your first event or start exploring what others are hosting.</p>
      <a
        href="/events"
        className="inline-block bg-white text-cyan-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300 shadow-md"
      >
        Explore Events
      </a>
    </section>
  );
}
