export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 mt-12 border-t">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} JobSphere. All rights reserved.
      </p>
    </footer>
  );
}
