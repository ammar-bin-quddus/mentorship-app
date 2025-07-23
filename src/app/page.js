import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to the Mentorship Platform</h1>
        <p className="text-gray-600">
          Book 1:1 sessions with experts or become a mentor and help others grow.
        </p>
      </div>
    </>
  );
}
