export default function Contact() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded px-4 py-2"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded px-4 py-2"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border rounded px-4 py-2"
          rows="5"
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Send
        </button>
      </form>
    </div>
  );
}
