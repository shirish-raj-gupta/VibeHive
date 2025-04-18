import { FaCalendarCheck } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section
      className="py-24 px-6 text-white text-center"
      style={{
        background: 'linear-gradient(to right, rgba(29,70,74,1), rgba(20,40,42,1))',
      }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center items-center mb-6 text-5xl text-teal-300">
          <FaCalendarCheck />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Welcome to VibeHive
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Your complete platform to create, manage, and discover events of any scale or type.
        </p>
      </div>
    </section>
  );
}
