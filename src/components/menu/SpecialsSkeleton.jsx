// components/menu/SpecialsSkeleton.tsx
export default function SpecialsSkeleton() {
  return (
    <section className="bg-[#FFF8E7] py-10 px-4 sm:px-8 lg:px-16 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-6"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 space-y-4">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
